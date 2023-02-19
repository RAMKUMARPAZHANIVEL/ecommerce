const express = require("express");
const cors = require('cors');
const { generate } = require("short-uuid");
const bodyParser = require("body-parser");
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
    message : "signed up successfully"
   })
  }
//   else if(userBioList userInfo.username)
  return res.status(401).json({
    message : "Please enter the correct detail to SignIn"
  })
})

app.post("/login", (req, res) => {
   const { email, password } = req.body;
   
   for(let i=0; i<userBioList.length; i++){
    if(email == userBioList[i][email] && password == userBioList[i][password]){
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
    const { authorization } = req.headers;
    const {email} = req.body;
    if(!authorization){
      
        return res.status(400).json({
            message : "login see your profile"
           })
    }
    for(let i=0; i<userBioList.length; i++){
        if(email == userBioList[i]?.email){
    return res.status(200).json({
        userInfo : userBioList[i],
        imageUrl :"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    });
  }
 }
 return res.status(400).json({
    message : "login see your profile"
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
         message : `posted successfully `,
         cart : cartUserMapping[user]
         
     })
    }
    return res.status(401).json({
     message : "Please enter correct credentails"
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
    message : "Please enter correct credentails"
   })
})


app.listen(4500,() => {
    console.log("server is running at 4500 port")
})