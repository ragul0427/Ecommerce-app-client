import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./navbar";

function RootLayout() {
  const location = useLocation(true);

  return (
    <div>
      <div
        className={`${
          location.pathname.split("/").includes("register") ||
          location.pathname.split("/").includes("login") ||
          location.pathname.split("/").includes("forgotpassword")||
          location.pathname.split("/").includes("password_reset")
            ? "hidden"
            : "block"
        }`}
      >
        <Navbar />
      </div>

      <Outlet />
      <div
        className={`${
          location.pathname.split("/").includes("register") ||
          location.pathname.split("/").includes("login") ||
          location.pathname.split("/").includes("forgotpassword")||
          location.pathname.split("/").includes("password_reset")
            ? "hidden"
            : "block"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
