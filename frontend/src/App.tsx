import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Restaurants from './pages/Restaurants';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Payment from './pages/Payment';
import ConfirmationPage from './components/blocks/ConfirmationPage';
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
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
            <Route path="/checkout" element={<Payment />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/restaurants" element={<Restaurants />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App
