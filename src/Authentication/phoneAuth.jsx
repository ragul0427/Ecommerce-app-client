/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Form, Modal } from "antd";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import Image from "../assets/phone.png";
import { auth } from "../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { get, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { changeUservalues } from "../Redux/userSlice";
import {useDispatch} from "react-redux"

const PhoneAuth = () => {
  const [form] = Form.useForm();
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [expandForm, setExpandForm] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const requestOTP = async () => {
    if (phoneNumber) {
      const number = phoneNumber.split("91")[1];

      try {
        const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
        const confirmation = await signInWithPhoneNumber(
          auth,
          `+91 ${number}`,
          recaptcha
        );
        console.log(confirmation, "looo");
        setUser(confirmation);
        if (confirmation) {
          setExpandForm(!expandForm);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      
      if (get(data, "user.phoneNumber")) {
      
        const phoneNumber=get(data, "user.phoneNumber").split("91")[1]
        const response = await axios.post(
            `${process.env.REACT_APP_URL}/getuser`,
            { phone: phoneNumber },
            {
              withCredentials: true,
            }
          );
          const { token } = response.data;
          localStorage.setItem("token", token);
          dispatch(changeUservalues(token));
          if(!isEmpty(token)){
            navigate("/")
          }
      }
      
    } catch (err) {
      console.log(err);
    }
  };

 

  
  return (
    <div>
      <div className="">
        <div className="lg:w-[70vw] pt-20 m-auto flex items-center justify-center">
          <div className="flex lg:flex-row xsm:flex-col">
            <div className="lg:w-[30vw] xxl:w-[20vw] xsm:w-[100vw] sm:w-[70vw]  xsm: backdrop-blur-sm bg-[--bg-color] rounded-md md:flex-row xsm:flex-col flex lg:flex-col items-center justify-center">
              <h1 className="text-white xsm:text-[14px] lg:text-lg md:pl-[2vw] lg:pt-[2vh] md:text-[15px] xsm:w-[85%] md:w-[60%] lg:w-[70%] text-center">
                Register With Your Mobile Number Via OTP...
              </h1>
              <img
                src={Image}
                alt="logo"
                preview={false}
                className="xsm:!w-[30vw] w-fit sm:!h-[35vh] md:!h-[40vh] lg:!h-[38vh] lg:!w-fit"
              />
            </div>
            <div className="lg:w-[35vw] bg-white sm:w-[70vw]  flex rounded-md !pt-[5vh] flex-col md:items-center lg:justify-between">
              <Form
                style={{ maxWidth: 500 }}
                form={form}
                layout="vertical"
                name="control-hooks"
                className="xsm:pl-[3vw] lg:pl-[12vw] flex flex-col md:gap-8 xl:pl-[6vw] xxl:pl-[2vw]"
              >
                <Form.Item
                  name="number"
                  label={<p className="text-xl">Mobile Number</p>}
                  rules={[
                    { required: true, message: "Please Enter Your Number" },
                  ]}
                  style={{
                    fontSize: "30px",
                    color: "black",
                  }}
                  className="md:!w-[40vw] !text-[8px]"
                >
                  <PhoneInput
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e);
                    }}
                    country={"in"}
                    className="xsm:!w-[90vw] sm:!w-[50vw] md:!w-[50vw] lg:!w-[25vw]"
                  />
                </Form.Item>
                <p className=" xsm:text-[12px] md:text-[12px] w-[80%] sm:text-[10px] ">
                  Secure access to our e-commerce platform by
                  <a className="text-blue-600">
                    &nbsp;Terms of Use
                  </a>{" "}
                  and &nbsp; 
                  <a
                    href="#"
                    className="text-blue-600 "
                  >
                    Our Privacy Policy
                  </a>
                  &nbsp; before Register in.
                </p>
                <Form.Item className="flex items-center justify-center w-[60%]">
                  <Button
                    className={` bg-[--bg-color] xsm:h-[5vh] xsm:w-[40vw] md:w-[30vw] lg:!w-[22vw] lg:h-[6vh] !mt-[15px] lg:text-md  !text-white hover:!border-none hover:!scale-105 duration-1000`}
                    htmlType="submit"
                    style={{ color: "white" }}
                    onClick={requestOTP}
                  >
                    Request Otp
                  </Button>
                  <div className="mt-5 " id="recaptcha"></div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={expandForm}
        footer={false}
        header={false}
        destroyOnClose
        onCancel={() => {
          setExpandForm(!expandForm);
        }}
        className="absolute top-[22vh] xsm:!w-[80vw] sm:!w-[55vw] sm:right-[22vw] md:!w-[40vw] md:!right-[30vw] lg:!w-[26vw] xsm:right-[10vw] lg:!right-[40vw] "
      >
        <div
          className={`
           
          h-[18vh] bg-white rounded-md flex flex-col justify-around items-center relative `}
        >
          <label
            htmlFor="otp"
            className="font-bold text-xl text-slate-700 text-center "
          >
            Enter your OTP
          </label>
          <OtpInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
            }}
            numInputs={6}
            otpType="number"
            renderInput={(props) => (
              <input {...props} className="border-2 h-8 !w-8 ml-2" />
            )}
          ></OtpInput>
          <Button
            onClick={verifyOtp}
            className="!bg-[--bg-color] w-[100%] !h-[40px] !text-white"
          >
            Verify Otp
          </Button>
        </div>
      </Modal>
    
    </div>
  );
};

export default PhoneAuth;
