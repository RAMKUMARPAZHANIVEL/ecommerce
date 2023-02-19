export const setUserData = (data) => {
   return {type : "SET_USER_DATA",
    payload : data   
   }
}

export function clearUserData(){
   return {
      type : "CLEAR_USER_DATA",
        }
}