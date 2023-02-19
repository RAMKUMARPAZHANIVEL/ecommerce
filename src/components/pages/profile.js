import { Button } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
// import { clearUserData } from '../../store/actions/user.action';
import { useDispatch } from 'react-redux';
const Profile = () => {
  const profileData = useSelector(store => store.user);
  console.log(profileData);
  const dispatch = useDispatch();
  // const clearData = () => {
  //   dispatch(clearUserData());
  // }
  return (
    <div>
      <img src={profileData.imageUrl} alt="profile image"/>
      <h3> name : {profileData.name}</h3>
      <h3> contactnumber : {profileData.contactNumber}</h3>
      <h3>Address</h3>
        <p>City : {profileData.adress.city}</p>
        <p>State : {profileData.adress.state}</p>
        <p>Country : {profileData.adress.country}</p>
      {/* <Button onClick={() => clearData()}>Clear data from user</Button> */}
    </div>
  )
}

export default Profile