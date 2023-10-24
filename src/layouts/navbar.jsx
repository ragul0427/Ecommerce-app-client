import React, { useEffect, useState } from "react";
import { Avatar, Drawer, Form, Input, Button } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cookies from "js-cookie";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "lodash";
import { changeUservalues } from "../Redux/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState("");
  const value = useSelector((state) => state.user.user);
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
      <div className="h-12 w-screen bg-[#2874F0] text-white font-bold shadow px-4 md:p-3 flex items-center justify-between lg:px-40">
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
        <div className="hidden md:block cursor-pointer">
          <ShoppingCartIcon />
          Cart
        </div>
        {value!==undefined ? (
          <Avatar onClick={logOut} className="cursor-pointer ">R</Avatar>
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
