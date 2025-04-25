import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast'; // Adjust the import path based on your project structure [[8]]
import { listenForNotifications, getNotifications } from '../../services/api';
import { supabase } from "@/supabaseClient";
import { ToastAction } from "@/components/ui/toast";

export default function RealTimeNotifications() {
    const { toast } = useToast();

    useEffect(() => {
        // Fetch the current user's ID from Supabase
        const getCurrentUserId = async () => {
            try {
                const { data: authData } = await supabase.auth.getUser();
                const user = authData?.user;
                return user?.id; // Return the user ID
            } catch (error) {
                console.error("Error fetching user ID:", error);
                return null;
            }
        };

        // Request notification permission
        if ("Notification" in window) {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                } else if (permission === "denied") {
                    console.log("Notification permission denied.");
                } else {
                    console.log("Notification permission default.");
                }
            });
        } else {
            console.log("This browser does not support desktop notification");
        }

        // Start listening for notifications
        const setupNotifications = async () => {
            const currentUserId = await getCurrentUserId();

            if (!currentUserId) {
                console.error("User ID not found. Notifications cannot be set up.");
                return;
            }

            listenForNotifications();

            // Subscribe to the notification stream
            const subscription = getNotifications().subscribe(notification => {
                const notificationUserId = notification?.user_id; // Extract the userId from the payload
                console.log(notificationUserId);
                console.log(currentUserId);

                // Check if the notification is for the current user
                if (notificationUserId && notificationUserId === currentUserId) {
                    console.log(notification);

                    // Display a toast notification
                    toast({
                        title: "You Got a New Notification!",
                        description: notification.message || "No details available.",
                        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                    });

                    // Optionally, display a desktop notification
                    if (Notification.permission === "granted") {
                        const PushNotif = new Notification("You Got a New Notification!", {
                            body: notification.message || "No details available.",
                        });
                        PushNotif.addEventListener('click', () => {
                            console.log('clicky')
                        })
                    }
                }
            });

            // Cleanup subscription on unmount
            return () => subscription.unsubscribe();
        };
        setupNotifications();
    }, [toast]); // Dependency array includes toast to ensure it re-runs if toast changes

    return null; // Component does not render anything
}

