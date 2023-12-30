/* eslint-disable no-unused-vars */
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import {  signInWithPopup } from "firebase/auth";
import google from "../../src/assets/google.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeUservalues } from "../Redux/userSlice";
import { isEmpty } from "lodash";

function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [data, setData] = useState("");

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!isEmpty(result)) {
        console.log(result);
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/getuser`,
          result.user,
          { withCredentials: true }
        );
        const { token } = response.data;
        localStorage.setItem("token", token);

        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFinish = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/getuser`,
        values,
        {
          withCredentials: true,
        }
      );

      const { token } = response.data;
      console.log(token, "lll");
      localStorage.setItem("token", token);

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");

   try{
    const result=await axios
    .get(`${process.env.REACT_APP_URL}/validateToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch(changeUservalues(result.data));
    if(!isEmpty(result.data)){
      navigate("/")
    }
   }catch(err){
    console.log(err)
   }
     
  };

  useEffect(() => {
    
    if (!isEmpty(data)) {
      navigate("/");
    }
  }, [data, navigate]);


  return (
    <div
      className="h-[100vh] w-[100vw] bg-no-repeat bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(0,0,0,0.7), rgba(1,0,0,0.8)), url("https://i.pinimg.com/originals/82/0c/98/820c981247cc8be38e2bc3c433fc77f4.jpg")',
      }}
    >
      <div className="h-[55vh] w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw] bg-white/10 shadow-md p-5">
        <Form
          className="absolute w-[70%] sm:w-[50%] md:w-[30%] lg:w-[20%]"
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
            label={<p className="text-white">Email</p>}
          >
            <Input type="email" placeholder="Email..." size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            label={<p className="text-white">Password</p>}
          >
            <Input.Password
              type="password"
              placeholder="Password..."
              size="large"
            />
          </Form.Item>

          <div className=" !pt-3 !mt-0 !flex flex-col  gap-1 justify-between px-3 ">
            <p className="text-[12px] lg:text-md text-center text-white font-semibold ">
              New user?
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here
              </span>
            </p>
            <Button
              className="bg-[#2874F0] text-md font-semibold  pb-2 text-white px-5 lg:px-10"
              htmlType="submit"
            >
              SignIn
            </Button>
            <p  onClick={() => {
                  navigate("/forgotpassword");
                }} className="text-white font-bold cursor-pointer">forgot password?</p>
          </div>
          <div className="flex items-center justify-center pt-10">
            <Button
              onClick={signInWithGoogle}
              className="text-black font-semibold lg:h-[5vh] bg-white flex items-center justify-center gap-2 lg:w-[15vw]"
            >
              Continue with google
              <img src={google} className="w-4 h-4 mt-1" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
