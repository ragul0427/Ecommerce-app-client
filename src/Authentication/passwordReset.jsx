import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import React from "react";
import {useNavigate} from "react-router-dom"
import Image from "../assets/forgot.png"

function PasswordReset() {
    const navigate=useNavigate()

  const handleFinish = async (value) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/password_reset`,
        value
      );
      console.log(response.data.message, "res");
      
      if (response.status === 200) {
        notification.success({message:"Password reset successfully"})
        navigate("/login")
      }
    } catch (e) {
        if(e.response.data.message==="Try a different password"){
            notification.error({message:"Try a different password"})
          }
      
    }
  };

  return (
    <div className="flex items-center justify-center bg-[--bg-color] h-[100vh]">
      <div className="flex flex-col gap-5 items-center justify-center bg-white bg-opacity-70 w-[300px] md:w-[400px] rounded-md py-5">
      <div className="rounded-full px-3 bg-white bg-opacity-70 shadow-md">
      <img src={Image} className="w-24" alt="forgot"/>
      </div>
        <Form onFinish={handleFinish} layout="vertical" className="w-[90%] ">
          <Form.Item
            name="email"
            label={"Enter your email"}
            rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
          >
            <Input
              type="email"
              placeholder="Enter Your email..."
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
                { required: true, message: 'Please enter a new password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            label={"Enter New Password"}
          >
            <Input
              type="text"
              placeholder="Enter new password..."
              size="large"
            />
          
          </Form.Item>
          
          <Form.Item
            rules={[
                { required: true,message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Confirm Password do not match with password');
                  },
                }),
              ]}
            label={"Confirm New Password"}
            name="confirmPassword"
          >
            <Input
              type="text"
              placeholder="Confirm new password..."
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-[100%] !bg-[--bg-color] !text-white h-[40px]"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default PasswordReset;
