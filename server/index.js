const express = require("express");
const cors = require('cors');
const { generate } = require("short-uuid");
const bodyParser = require("body-parser");
const shortUUID = require("short-uuid");
const app = express();
app.use(bodyParser.json());

app.use(cors());

const cartUserMapping = {};
const userBioList = [];

app.post("/signup",(req,res) => {
   const { userInfo } = req.body;
   if(userInfo){
    userBioList.push(userInfo);
   return res.status(200).json({
    message : "signed up successfully",
    token : generate(),
    detail : userInfo
   })
  }
//   else if(userBioList userInfo.username)
  return res.status(401).json({
    message : "Please enter the correct details to SignIn"
  })
})

app.post("/login", (req, res) => {
   const { email, password } = req.body;
   
   for(let i=0; i<userBioList.length; i++){
    const userDetail = userBioList[i];
    if(email == userDetail["email"] && password == userDetail["password"]){
      console.log(userDetail["email"])
      return res.status(200).json({
        message : "logged In successfully",
        token : generate(),
        userBio : userBioList[i]
    })
   }
   }
   return res.status(401).json({
    message : "Please enter correct credentails to login",
    
   })
});

app.get("/profile", (req, res) => {
    const { authorization,email } = req.headers;
  
    if(!authorization){
        return res.status(400).json({
            message : "please login to see your profile"
           })
    }
    for(let i=0; i<userBioList.length; i++){
        if(email == userBioList[i]["email"]){
    return res.status(200).json({
        message : "profile fetched successfully",
        userInfo : userBioList[i],
      });
  }
 }
 return res.status(400).json({
    message : "there was some problem in profile page"
   })
})


app.post("/cart", (req, res) => {
    const { item } = req.body;
    const { user } = req.headers;
    if(item != null){
    
           if(!cartUserMapping[user]){
              cartUserMapping[user] = [];
           }
           cartUserMapping[user].push(item);
     return res.status(200).json({
         message : `product posted to cart successfully `,
         cart : cartUserMapping[user]
         
     })
    }
    return res.status(401).json({
     message : "posting to cart failed"
    })
 });

app.get("/cart", (req, res) => {
   const {user} = req.headers;
  if(user != ""){
    return res.status(200).json({
        message : "cart items fetched successfully",
         cart : cartUserMapping[user]
       })
  }
  return res.status(401).json({
    message : "Please login view your cart"
   })
})


app.listen(4500,() => {
    console.log("server is running at 4500 port")
})