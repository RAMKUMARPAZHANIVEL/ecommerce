import "../cart/cart.css"
import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux';
import { Card, Rate } from 'antd';
import { Button, Space } from 'antd';
import { decreaseQuantityInList, removeItemFromCart } from '../../store/actions/cart.action';
import { increaseQuantityInList } from '../../store/actions/cart.action';
import { setCardData } from "../../store/actions/cart.action";

const Cart = () => {
  const [cartItems,setCartItems] = useState([]);
  const cartList = useSelector(store => store.cart);
  console.log(cartList.length)
  const user  = useSelector(store => store.user?.email);
  const token = useSelector(store => store.auth.authorization)
   console.log(user,token)
  const dispatch = useDispatch();

  useEffect(() => {
    (async _ => {
      
      const response = await fetch("http://localhost:4500/cart",{
        method : "GET",
        headers : {
          // "Content-Type": "application/json",
          "user" : user
        },
       
      })
      const data =await response.json();
      console.log(data);
      dispatch(setCardData(data.cart));
      // setCartList(data.cart);
      console.log(cartList);
    
    })()
  },[])
  const decreaseQuantity = (data) => {
    console.log("decfunc called");
    if(data.quantity > 0)
    dispatch(decreaseQuantityInList(data.id))
  }
  const increaseQuantity = (id) => {
    dispatch(increaseQuantityInList(id));
   
  }

  const removeItem = (id) => {
    
     dispatch(removeItemFromCart(id));
  }

  const disableDecreaseButton = (quantity) => {
    if(quantity < 1)
      return true
  }

  const calcTotalprice = () => {
    // const totalPrice = cartList.reduce((acc,curVal) => {
    //      return acc+curVal.price*curVal.quantity;
    // },(0));
    // return Math.floor(totalPrice);
  }

  const onCheckOut = () => {
 
  }
 if(!token){
  return (<div style={{backgroundColor:"red"}}>
           <h2 className="alert-user">Please login to see your cart</h2>

         </div>)
 }  

  return (
    <div className='cart-container'>
      
      { cartList.length > 0 ?(cartList.map((data) => {
        return(
          <div className='cart-card' key={data.id}>
            
              <div className="cart-card-left-section">
                <h3>{data.title}</h3>
                <p>Price - {data.price}</p>
                <div> 
                <Button type="primary"  onClick={() => {decreaseQuantity(data)}}>
                   -
                </Button>
                <span style={{margin:"0px 1rem"}}>{data.quantity}</span>
                <Button type="primary" primary onClick={()=> {increaseQuantity(data.id)}} >
                   +
                </Button>
                </div>
                <Button type="primary" danger onClick={() => {removeItem(data.id)}} className="remove-btn">
                   Remove Item 
                </Button>
              </div>
              
              <img  src={data.image}/>
           
          </div>
        )
      })) :( <div style={{backgroundColor:"red"}}>
               <h2 className="alert-h2">Nothing in your cart</h2>
             </div>)}
       <div className='checkout-container'>
        <h3>Total Items : {cartList.length}</h3>
        <h3>Price : INR {calcTotalprice()}</h3>
        
        <Button onClick={onCheckOut} primary>Check Out</Button>
       </div>
    </div>
  )
}

export default Cart