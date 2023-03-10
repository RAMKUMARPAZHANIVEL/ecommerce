import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { json } from "react-router-dom";
import { setUserData } from "../../store/actions/user.action";
import { setAuthorization } from "../../store/actions/auth.action";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
const Login = (props) => {
  const [userDetail, setUserDetail] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);
    setUserDetail(values);
    console.log({...userDetail})
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
//  const fetchProfileData = async (token,email) => {
//   if(!token){
//     console.log("please login to see your profile")
//   }
  
//     const response = await fetch("http://localhost:4500/profile",{
//       method: "GET",
//       headers : {
//                 "authorization" : token,
//                 "email" : email
//                 }
//     });
//     // console.log(response);
//     const data = await response.json();
//       console.log(data);
//     if(response.status == 200){
//       const data = await response.json();
//       console.log(data);
//       dispatch(setUserData(data))

//     }
   
//  }
  useEffect(() => {
    (async (_) => {
      try {
        const response = await fetch("http://localhost:4500/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetail),
        });
         console.log(response);
        if (response.status == 200) {
          const data = await response.json();
          console.log(data);
          console.log(props);
          dispatch(setAuthorization(data.token));
          // fetchProfileData(data.token,data.email);
          dispatch(setUserData(data.userBio));
          navigate("/");
          toast("loged in successfully");
        }
        else{
          console.log("please your correct credential");
          toast("please your correct credential");

        }
      } catch (e) {
        console.log("Error",e);
      }
    })();
  }, [userDetail]);

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
