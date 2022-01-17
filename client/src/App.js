import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/users/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./components/users/Register";
import Home from "./components/dashboard/Home";
import Profile from "./components/myaccount/Profile";
import ForgotPassword from "./components/users/ForgotPassword";
import ChangeForgotPassword from "./components/users/ChangeForgotPassword";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/ProductDetails";
import Header1 from "./components/common/Header1";
import Footer1 from "./components/common/Footer1";
import ChangePassword from "./components/myaccount/ChangePassword";
import Address from "./components/myaccount/Address";
import Cart from "./components/dashboard/Cart";
import Checkout from "./components/dashboard/Checkout";
import Orders from "./components/dashboard/Orders";
import Invoice from "./components/dashboard/Invoice";

function App() {
    return (
        <div>
            <Router>
                <Header1 />
                <br />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/forgotpassword"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/changeforgotpassword"
                        element={<ChangeForgotPassword />}
                    />
                    <Route path="/products" element={<Products />} />
                    <Route
                        path="/productdetails/:id"
                        element={<ProductDetails />}
                    />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route
                        path="/changepassword"
                        element={<ChangePassword />}
                    />
                    <Route path="/address" element={<Address />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/invoice/:id" element={<Invoice />} />
                </Routes>
                <br />
                <Footer1 />
            </Router>
        </div>
    );
}

export default App;
