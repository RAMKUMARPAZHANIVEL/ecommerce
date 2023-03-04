import React from 'react';
import { useEffect, useState } from 'react';
import Card from 'antd/es/card/Card';
import { useDispatch } from 'react-redux';
import { Button, Rate } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const Home = () => {
    const[list,setList] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authorization : token} = useSelector(store => store.auth);
    console.log(token)
    useEffect( () => {
        (async _ => {
           try { const response = await fetch('https://fakestoreapi.com/products');
            if(response.message = 200){
            const data = await response.json();
            console.log(data);
            setList(data)
        }
      }catch(e) {
            console.log(e);
        }
        })()
      

       
    },[])

 const addToCart = (product) => {
  
  navigate(`/detail/${product.id}`)
  console.log(product);
  
 }


  return (
    <div className='home-container'>
       {list.map((elem)=> {
        return(
         <div className='product-car' key={elem.id}> 
           <Card
          hoverable
          style={{ width: 280, minHeight : "15rem" } } className="product-card"
            > 
          <div className='display-center'>
          <img src={elem.image} />
          </div>
          <h3>{elem?.title}</h3>
          <p>{"price :" + " " + elem?.price}</p>
          {/* <Meta title={elem?.title} description= {"price :" + " " + elem?.price} /> */}
          <Rate disabled defaultValue={elem.rating.rate} />
          <Button type="link" onClick={() => addToCart(elem)} className="add-to-cart-btn" >View more Detail</Button>
        </Card>
         </div>
        )
       })} 
    </div>
  )
}

export default Home