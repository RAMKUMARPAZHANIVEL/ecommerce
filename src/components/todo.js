import React from 'react'
import {useState,useRef,useEffect} from 'react';
const Card = ({info}) => {
  
  const[list,setList] = useState([]);
  const[todo,setTodo] = useState("");
  const[indexToEdit,setIndexToEdit] = useState();
  const searchRef = useRef();
  const createTodo = (e) => {
    e.preventDefault();
    console.log(e);
    const todo = searchRef.current.value;
    console.log(todo);
     setTodo(todo);
     e.target[0].value = "";
     console.log(e.target[0].value);
  }
  useEffect(()=> {
    if(todo){
      setList(curList => {
        console.log([...curList,todo]);
          return [...curList,todo];
       })
    }
    },[todo])

  const editTodo = (idx) => {
    setIndexToEdit(idx)
    // const value = e.target.value;
    // const editedList = list.map((elem,i) => {
    //     if(i == idx){
    //       return value;
    //     }
    // })
    // setList(editedList);
    // console.log(editedList);
    console.log("opened editing")
    
    }
   const updateEditedInput = (e) => {
    // e.preventDefault();
     if(e.key == "Enter"){
         const value = e.target.value;
         const updatedList = list.map((elem,i) => {
            if(i == indexToEdit)
              return value;
            else
             return elem;
         })
         console.log(indexToEdit);
         console.log(value);
         console.log(updatedList);
         setList(updatedList);
         setIndexToEdit(null);
     }   
   } 
  const deleteTodo = (idx) => {
    console.log("delete");
    const filteredList = list.filter((elem,id) => {
      return id != idx;
    } );
    setList(filteredList);
         console.log(list)
  }
  return (
    <div className='main-container'>
     <form onSubmit={createTodo}>
     <input type="text" name="search" placeholeder="search" id="search" ref={searchRef}/>
     <button type='submit'>Enter</button>
     </form>
     {list.map((elem,idx) => {
             return(
        <div className='todo-container'>
          <p>{elem}</p>
        <div>
         <button onClick={() => editTodo(idx)}>Edit</button>
          { indexToEdit == idx ? 
          <input type='text' name="todo" defaultValue={elem} onKeyUp={updateEditedInput}/>
          : false}
          <button onClick={() => deleteTodo(idx)}>delete</button>   
          </div>               
        </div>
      )
    })
   }
   
  </div>
  )
}

export default Card