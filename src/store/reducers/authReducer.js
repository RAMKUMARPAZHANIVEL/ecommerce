const initialState = {
    authorization : null,
};

const AuthReducer = (state = initialState,action) => {
   switch(action.type){
    case "SET_AUTHORIZATION" :
        console.log("set auth called")
        return {...state, authorization : action.payload};
   case "REVOKE_AUTHORIZATION" :
    console.log("logged out")
       return {
        authorization : null
       }
   default:
   return state;
   }
}

export default AuthReducer;