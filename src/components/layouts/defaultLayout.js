import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Home from "../pages/home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../../store/actions/cart.action";
import { revokeAuth } from "../../store/actions/auth.action";
const { Header, Content, Footer, Sider } = Layout;

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
        name : "Log In",
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
        return item.name != "Log In"
      })
      return [...filteredList,{
        name : "Log out",
        path : "/",
        onClick : () => {
          console.log("clicked")
           dispatch(clearCartItems());
           dispatch(revokeAuth())
        },
       }]
     }
      return pages.filter((item) => item.name != "profile")
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            items= {generatedPages().map((item,key) => ({
              key,
              label:(
                <Link to={item.path}>
                  <Button onClick={item.onClick} >{item.name}</Button>
                </Link>
              ),
            }))}
          />
        </Header>
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
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default DefaultLayout;
