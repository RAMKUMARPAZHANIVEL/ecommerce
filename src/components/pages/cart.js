import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux';
import { Card, Rate } from 'antd';
import { Button, Space } from 'antd';
import { increaseQuantityInList,decreaseQuantityInList, removeItemFromCart } from '../../store/actions/cart.action';

const Cart = () => {
  // const [cartList,setCartList] = useState([]);
  const cartList = useSelector(store => store.cart);
  const user  = useSelector(store => store.user.name);
  const token = useSelector(store => store.auth.authorization)
   console.log(user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async _ => {
      
      const response = await fetch("http://localhost:4500/cart",{
        method : "GET",
        headers : {
          // "Content-Type": "application/json",
          "user" : "ramkumar"
        },
       
      })
      const data =await response.json();
      console.log(data);
      // setCartList(data.cart);
      // console.log(cartList.length);
    
    })()
  },[])
  const decreaseQuantity = (data) => {
    console.log("decfunc called");
    if(data.quantity > 0)
    dispatch(decreaseQuantityInList(data.id))
  }
  const increaseQuantity = (id) => {
    dispatch(increaseQuantityInList(id))
  }

  const removeItem = (id) => {
    
     dispatch(removeItemFromCart(id));
  }

  const disableDecreaseButton = (quantity) => {
    if(quantity < 1)
      return true
  }

  const calcTotalprice = () => {
    const totalPrice = cartList.reduce((acc,curVal) => {
         return acc+curVal.price*curVal.quantity;
    },(0));
    return Math.floor(totalPrice);
  }

  const onCheckOut = () => {
 
  }
 if(!token){
  return <h2>Please login to see your cart</h2>
 }  

  return (
    <div className='cart-container'>
      
      { cartList.length > 0 ?(cartList.map((data) => {
        return(
          <div className='cart-card' key={data.id}>
            
              <div>
                <h3>{data.title}</h3>
                <p>Price - {data.price}</p>
                <Button type="primary"  onClick={() => {decreaseQuantity(data)}}>
                   Decrease Quantity
                </Button>
                <h3>{data.quantity}</h3>
                <Button type="primary" primary onClick={()=> {increaseQuantity(data.id)}} >
                   Increase Quantity
                </Button>
                <Button type="primary" danger onClick={() => {removeItem(data.id)}}>
                   Remove Item 
                </Button>
              </div>
              
              <img  src={data.image}/>
           
          </div>
        )
      })) :( <h2>Nothing in your cart</h2>)}
       <div className='checkout-container'>
        <h3>Total Items : {cartList.length}</h3>
        <h3>Price : INR {calcTotalprice()}</h3>
        
        <Button onClick={onCheckOut} primary>Check Out</Button>
       </div>
    </div>
  )
}

export default Cart