import Home from "./components/pages/home";
import Cart from "./components/pages/cart";
import Profile from "./components/pages/profile";
import Login from "./components/pages/login";
import SignUp from "./components/pages/signUp";
import ProductDetail from "./components/pages/productDetail";
import DefaultLayout from "./components/layouts/defaultLayout";
import {Routes,Route} from 'react-router-dom'
function App() {
 return(
  <DefaultLayout>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/detail/:id" element={<ProductDetail />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/signup" element={<SignUp />}/>
    </Routes>
  </DefaultLayout>
 )
}

export default App;
