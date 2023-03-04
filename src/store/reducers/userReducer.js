let initialState = {};

const userReducer = (state = initialState,action) => {
    switch(action.type){
        case "SET_USER_DATA" :
            console.log({...action.payload});
            return {...action.payload};
        case "UPDATE_USER_DATA" :
            return;    
        case "CLEAR_USER_DATA" :
            console.log("cleared all user data")
            return {};
        
        default :
         return state
    }
}

export default userReducer;