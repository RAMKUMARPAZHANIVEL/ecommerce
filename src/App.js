import Cart from "./pages/cart/cart";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import ProductDetail from "./pages/product_detail/productDetail"
import DefaultLayout from "./layouts/defaultLayout";
import {Routes,Route} from 'react-router-dom'
import SignUp from "./pages/signup/signUp";
import { ToastContainer } from "react-toastify";
function App() {
 return(
   <DefaultLayout>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/detail/:id" element={<ProductDetail />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/signup" element={<SignUp />}/>
    </Routes>
    <ToastContainer />
  </DefaultLayout>
 )
}

export default App;
