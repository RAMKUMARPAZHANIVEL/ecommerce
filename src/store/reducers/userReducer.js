let initialState = {};

const userReducer = (state = initialState,action) => {
    switch(action.type){
        case "SET_USER_DATA" :
            console.log({...state,...action.payload});
            return {...state,...action.payload};
        case "UPDATE_USER_DATA" :
            return    
        // case "CLEAR_USER_DATA" :
        //     console.log("clear data called")
        //     // return state = {};
        
        default :
         return state
    }
}

export default userReducer;