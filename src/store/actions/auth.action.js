export function setAuthorization(token) {
   return {
    type : "SET_AUTHORIZATION",
    payload : token,
   }
}

export function revokeAuth() {
  return {type: "REVOKE_AUTHORIZATION"}
}