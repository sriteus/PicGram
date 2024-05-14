import React from "react";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import "./styles.css";

const Nav = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  const handleUpload = () => {
    navigate("/upload");
  };

  return (
    <div>
      <button onClick={handleUpload} className="button">
        <LinkedCameraIcon fontSize="large" />
      </button>

      <hr />
      <button onClick={() => navigate("/home")} className="button">
        <CottageRoundedIcon fontSize="large" sx={{ marginTop: "15px" }} />
        Home
      </button>
      <button onClick={handleButtonClick} className="button">
        <PublicRoundedIcon fontSize="large" />
        World
      </button>
      <button onClick={handleButtonClick} className="button">
        <MessageRoundedIcon fontSize="large" />
        DMs
      </button>
      <button
        onClick={() => {
          navigate("/profile");
        }}
        className="button"
      >
        <AccountBoxRoundedIcon fontSize="large" />
        Profile
      </button>
      <button onClick={handleButtonClick} className="button">
        <SettingsRoundedIcon fontSize="large" />
        Settings
      </button>
    </div>
  );
};

export default Nav;
