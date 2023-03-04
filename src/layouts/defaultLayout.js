import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Home from "../pages/home/home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../store/actions/cart.action";
import { revokeAuth } from "../store/actions/auth.action";
import { clearUserData } from "../store/actions/user.action";

import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const pages =[
    {
        name : "home",
        path : "/",
        onclick : () => {},
    },
    {
        name : "cart",
        path : "/cart",
        onclick : () => {},
    },
    {
        name : "profile",
        path : "/profile",
        onclick : () => {},
    },
    {
        name : "Login",
        path : "/login",
        onclick : () => {},
    },
   {
    name : "sign up",
    path : "/signup",
    onclick : () => {}
   }
]


const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const DefaultLayout = (props) => {
  const {authorization : token} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  console.log(token);
  const generatedPages = () => {
     if(token){
      const filteredList = pages.filter((item) => {
        return (item.name != "sign up" && item.name != "Login")
      })
      return [...filteredList,{
        name : "Log out",
        path : "/",
        onClick : () => {
          console.log("clicked")
           dispatch(clearCartItems());
           dispatch(revokeAuth());
           dispatch(clearUserData());
        },
       }]
     }
      return pages.filter((item) => item.name != "profile")
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => {
    console.log(value);
   
  }
  return (
    <div>
      <Layout>
        {/* <Header className="header app-header">
        
        </Header> */}
        <div className="header">
          <div className="app-title">
          <img src="https://cdn-icons-png.flaticon.com/128/871/871376.png" />
            {/* <span>DoShop</span> */}
            <h2>DoShop</h2>
          </div>
        <div>
         <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            style={{width : "45rem"}}
            items= {generatedPages().map((item,key) => ({
              key,
              label:(
                <Link to={item.path}>
                  <Button onClick={item.onClick} >{item.name}</Button>
                </Link>
              ),
            }))}
             
          />
         </div>
          <div>
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
   
          </div>
        </div>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
        
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
            }}
          >
            {/* <Sider
              style={{
                background: colorBgContainer,
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                }}
                items={items2}
              />
            </Sider> */}
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Do Shop ©2023 Created by Ram & team
        </Footer>
      </Layout>
    </div>
  );
};

export default DefaultLayout;
