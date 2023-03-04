import { Card,Button } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { addItemToCart } from '../../store/actions/cart.action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = (props) => {
  const[productDetail,setProductDetail] = useState({});
  const dispatch = useDispatch();
  const token = useSelector(store => store.auth.authorization);
  const user = useSelector((store) => store.user.email);
  const cartList = useSelector(store => store.cart);
    const {detail } = props;
    const { id } = useParams();
    console.log(id);
    useEffect( () => {
      (async _ => {
         try { const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if(response.message = 200){
          const data = await response.json();
          console.log(data.title);
          setProductDetail(data);
          console.log(productDetail);
          }
      }
      catch(e) {
          console.log(e);
      }
      })()
    

     
  },[id])

  const addToCart = (product) => {
  if(!token){
    console.log("please login to add");
    toast.error("please login to add product");
   }else{
    toast("Product added successfully");
    // toast.success('item increased', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   });
    dispatch(addItemToCart(product));
    const updatedItem = {item : {...product,quantity : 1}};
    console.log(updatedItem);
    (async _ => {
      
      const response = await fetch("http://localhost:4500/cart",{
      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user" : user
        },
        body: JSON.stringify(updatedItem),
      })
      // console.log(JSON.stringify({item : {...product}}));
      const data =await response.json();
      console.log(data);
      
    })()
  
     
   }
  }

  const disableAddButton = () => {

    const foundItem = cartList.find((item) =>  item.id == productDetail.id)
        
      return foundItem ? true: false;       
     
  }
  return (
    <div>
        <Card >
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
            <div className='detail-card'>
                           
                           <img src={productDetail.image} style={{width:"15rem"}} />
                           <div className='detail-card-rightsection'>
                            <h2>{productDetail.title}</h2>
                            <p>{productDetail.description}</p>
                            <Button type="primary" onClick={() => addToCart(productDetail)} className="add-to-cart-btn" disabled={disableAddButton()}>Add to cart</Button>
                           </div>
                           </div>
          <ToastContainer />
        </Card>
       
    </div>
  )
} 

export default ProductDetail