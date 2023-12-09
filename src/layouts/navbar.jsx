import React, { useEffect, useState } from "react";
import { Avatar, Drawer, Form, Input, Button } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cookies from "js-cookie";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import isEmpty, { get } from "lodash";
import { changeUservalues } from "../Redux/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState("");
  const value = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const location=useLocation()
  

  const logOut = () => {
    console.log("click")
    localStorage.removeItem("token")
    const res = Cookies.remove("token");
    dispatch(changeUservalues(res));
  };

  useEffect(()=>{
    if(!location.pathname.split("/").includes("subcategories")){
      localStorage.removeItem("selectedPriceRange")
      localStorage.removeItem("selectedBrand")
    }
  })

  console.log(cart?.length,"web")

  return (
    <div className="h-12 lg:h-20 w-screen">
      <div className="fixed z-40">
      <div className="pl-20 hidden h-8 text-[14px] bg-white text-black lg:flex justify-between items-center">
        <div className="flex gap-20 items-center font-bold ">
          <div className="hover:text-[#2874F0] cursor-pointer">About</div>
          <div className="hover:text-[#2874F0] cursor-pointer">Services</div>
          <div className="hover:text-[#2874F0] cursor-pointer">Contact</div>
          <div className="hover:text-[#2874F0] cursor-pointer">Our Blog</div>
        </div>
        <div className="flex gap-10 font-bold pr-20">
          <div className="hover:text-[#2874F0] cursor-pointer">
            {" "}
            Call Us:121019297
          </div>
          <div className="hover:text-[#2874F0] cursor-pointer">
            {" "}
            mail:abcd@gmail.com
          </div>
        </div>
      </div>
      <div className="h-12 w-screen bg-[--bg-color] text-white font-bold shadow px-4 md:p-3 flex items-center justify-between lg:px-40">
        <div>Logo</div>
        <div className="pt-6">
          <Form>
            <Form.Item>
              <Input
                placeholder="Search"
                className="w-[50vw] md:w-[45vw] h-[5vh]"
              />
            </Form.Item>
          </Form>
        </div>
        <div className="hidden md:block cursor-pointer relative" onClick={()=>{navigate("/Cart/12")}}>
          <ShoppingCartIcon />
          Cart
          <div className={`${get(cart,"length")===undefined?"hidden":""}`}>
          <div className={`rounded-full h-4 w-4 absolute top-[-5px] left-[8px] bg-white text-[--bg-color] flex items-center justify-center text-[10px]`}>{get(cart,"length")}</div>
          </div>
        
        </div>
        {value!==undefined ? (
          <Avatar onClick={logOut} className="cursor-pointer shadow-inner shadow-white">R</Avatar>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="cursor-pointer text-white font-medium text-[10px] h-[4vh]   "
          >
            Login
          </Button>
        )}
      </div>
      </div>
    </div>
  );
}

export default Navbar;
