import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Restaurants from './pages/Restaurants';
import Shop from './pages/Shop';
import Product from './pages/Product';
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App
