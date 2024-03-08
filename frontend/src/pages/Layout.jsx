import { React, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import axios from "axios";

const Layout = () => {
  const history = useNavigate();
  const location = useLocation();
  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000);
    const endpoint = "http://127.0.0.1:8000/verify-login/";
    const accessToken = Cookies.get("access_token");
    axios
      .get(endpoint, {
        withCredentials: true,

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Kiểm tra kết quả xác minh từ máy chủ
        if (response.data.loggedIn) {
          // Người dùng đã đăng nhập trước đó
          console.log("User is logged in");
          if (location.pathname == "/login" || location.pathname == "/") {
            history("/channel/@me");
          }
        } else {
          // Người dùng chưa đăng nhập
          console.log("User is not logged in");
        }
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, [location]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
