import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

function ForgotPassword() {
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleOtpSubmit = () => {
    // Basic validation: Check if the entered OTP is a 6-digit number
    const isValidOtp = /^\d{6}$/.test(otp);

    if (isValidOtp) {
      // TODO: Add logic to further validate the OTP if needed
      console.log("Entered OTP:", otp);
      setOpen(false); // Close the modal after successful OTP submission
      setOtpError(""); // Clear any previous OTP validation error
    } else {
      setOtpError("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-40 bg-black h-screen gap-20">
        <div className="flex flex-col gap-5 pt-8">
          <h1 className="text-4xl text-white">Enter Your Register Email</h1>
          <Form
            className="w-[300px] md:w-[400px] rounded-md py-10 bg-white shadow-md flex flex-col items-center justify-center"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true }]}
              className="w-[80%]"
              label={"Enter Your Email"}
            >
              <Input
                type="text"
                placeholder="Enter your email..."
                size="large"
              />
            </Form.Item>
            <Form.Item className="w-[80%]">
              <Button
                onClick={() => {
                  setOpen(!open);
                }}
                className="w-[100%] bg-[--bg-color] text-white h-[40px] hover:!text-white hover:scale-105 duration-700"
              >
                Request Otp
              </Button>
            </Form.Item>
          </Form>
        </div>
      <Modal
        open={open}
        width={400}
        footer={false}
        onCancel={() => {
          setOpen(!open);
          setOtpError("");
        }}
      >
        <div className="py-10">
          <div className="flex items-center justify-center">
            <label
              htmlFor="otp"
              className="font-semibold text-lg pb-2 text-slate-700 text-center pl-2"
            >
              Enter your OTP
            </label>
          </div>
          <div className="pt-4 flex items-center justify-center">
            <OtpInput
              value={otp}
              onChange={(value) => {
                setOtp(value);
              }}
              numInputs={6}
              otpType="number"
              disabled={false}
              autoFocus
              renderInput={(props) => (
                <input {...props} className="border-2 h-8 !w-8 ml-2" />
              )}
            />
          </div>
          {otpError && (
            <div className="text-red-500 text-sm text-center mt-2">
              {otpError}
            </div>
          )}
          <div className="flex items-center justify-center mt-4">
            <Button
              type="primary"
              onClick={handleOtpSubmit}
              className="bg-[--bg-color] w-[80%] text-white h-[40px] hover:!text-white hover:scale-105 duration-700"
            >
              Submit OTP
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
