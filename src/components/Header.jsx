import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "./Header.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "6px",
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

export const Header = ({ adminObj }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="header">
      <div>
        <Fab variant="extended" color="secondary" onClick={handleOpen}>
          <SupervisorAccountIcon sx={{ mr: 1 }} />
          Admin ?
        </Fab>
      </div>
      <div className="about-me">
        <Avatar
          alt="Yashwanth Pinneka"
          src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.18169-9/13620845_10208908836909666_1137278237743525511_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=SG-dDackUWIAX8jxkLT&_nc_ht=scontent-sjc3-1.xx&oh=00_AfBDMF8SdtMkovnWMDtpsuVus4nPlN3CYlxdlHZJvruToQ&oe=64F8F1BC"
        />
        <div className="call-me">
          <div>Questions ?</div>
          <div>6312303767</div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Password
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            error={touched && password !== "admin"}
            helperText={
              touched && password !== "admin" ? (
                <span>Incorrect Password</span>
              ) : undefined
            }
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                setTouched(true);
                if (password === "admin") {
                  adminObj.setAdmin(true);
                  handleClose();
                }
              }}
              variant="contained"
            >
              Lets Verify !
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
