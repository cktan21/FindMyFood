import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

interface AuthContextProps {
  user: any;             // or use the official Supabase `User` type
  isLoggedIn: boolean;   // Derived from `user !== null`
  loading: boolean;      // New: indicate we are fetching session
  userCategory: string | null; // New: user category
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
  loading: true,
  userCategory: null, // Initialize with null
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // loading is true until we know user state
  const [userCategory, setUserCategory] = useState<string | null>(null); // New state for user category

  useEffect(() => {
    // 1) Check if we have an existing session on mount
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching initial session:", error);
        } else {
          setUser(session?.user ?? null);
          // Assume user metadata contains category
          setUserCategory(session?.user?.user_metadata?.category ?? null);
        }
      } catch (err) {
        console.error("Unexpected error fetching initial session:", err);
      } finally {
        setLoading(false); // finished checking
      }
    };
    getInitialSession();

    // 2) Listen for sign in / sign out changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // Update user category on auth state change
      setUserCategory(session?.user?.user_metadata?.category ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    userCategory, // Provide user category in context
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
