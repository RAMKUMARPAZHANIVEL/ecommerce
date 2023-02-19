let initialState = [];

const cartReducer = (state = initialState,action) => {
    switch(action.type){
        case "SET_CART_DATA" :
            return []
        case "ADD_ITEMS_TO_CART" :
            const mergedItem = {...action.payload,quantity : 1}
             console.log([...state,mergedItem]);
            return [...state,mergedItem];
        case "REMOVE_ITEMS_FROM_CART" :
            const filteredList = state.filter((elem) => {return elem.id != action.payload});
            console.log(filteredList);
            return filteredList;
        case "INCREASE_QUANTITY" :
            console.log("increase quantity called")
           const updatedList = state.map((elem,id) => {
            if(elem.id == action.payload){
                console.log(elem.quantity);
                return {...elem,quantity : elem.quantity+1}
            }
            return elem;
           })
           console.log(updatedList);
           return [...updatedList];
        case "DECREASE_QUANTITY" :
            console.log("decrease called");
            const decreaseList = state.map((elem) => {
                if(elem.id == action.payload ){
                    return {...elem,quantity : elem.quantity - 1}
                }
                return elem;
               })
               console.log(decreaseList);
            return [...decreaseList];

        case "CLEAR_CART" :
            return initialState;
        default :
         return state
    }
}

export default cartReducer;