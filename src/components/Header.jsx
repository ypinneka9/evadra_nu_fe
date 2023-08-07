import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <div className="about-me">
        <Avatar
          alt="Yahswanth Pinneka"
          src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.18169-9/13620845_10208908836909666_1137278237743525511_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=SG-dDackUWIAX8jxkLT&_nc_ht=scontent-sjc3-1.xx&oh=00_AfBDMF8SdtMkovnWMDtpsuVus4nPlN3CYlxdlHZJvruToQ&oe=64F8F1BC"
        />
        <div className="call-me">
          <div>Questions ?</div>
          <div>6312303767</div>
        </div>
      </div>
    </div>
  );
};
