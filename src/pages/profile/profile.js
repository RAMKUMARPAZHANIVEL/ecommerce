import { Button } from 'antd';
import React , { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
// import { clearUserData } from '../../store/actions/user.action';
import { useDispatch } from 'react-redux';
const Profile = () => {
  // const[profileData,setProfileData] = useState({});
  const token = useSelector( store => store.auth.authorization);
  const emailId = useSelector(store => store.user.email);

  console.log(emailId,token);
  const dispatch = useDispatch();
  // const clearData = () => {
  //   dispatch(clearUserData());
  // }
//  useEffect(() => {
//   (async () => {
//     try {
//       const response = await fetch("http://localhost:4500/profile", {
//              headers : {
//               "authorization" : "123456746no94",
//                "email" : "akashram006@gmail.com"
//               }
        
//       });
//        console.log(response);
//       if (response.status == 200) {
//         const data = await response.json();
//         console.log(data);
//            setProfileData(data);
//            console.log(profileData);
//       }
//        } catch (e) {
//       console.log("Error",e);
//     }
//   })();
//  },[])
       const profileData = useSelector(store => store.user);
      console.log(profileData);

  return (
    <div>
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile image" style={{width : "8rem",height : "8rem",borderRadius : "50px"}}/>
      <h3> name : {profileData?.username}</h3>
      <h3> email : {profileData?.email}</h3>
      <h3> contactnumber : {profileData?.contactNumber}</h3>
      <h3>Address</h3>
        <p>City : {profileData?.city}</p>
        <p>State : {profileData?.state}</p>
        <p>Country : {profileData?.country}</p>
      {/* <Button onClick={() => clearData()}>Clear data from user</Button> */}
    </div>
  )
}

export default Profile