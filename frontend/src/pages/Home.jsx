import React from "react";
import {
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getBasicDetails } from "../api/lichessUser";
import { toast, ToastContainer } from "react-toastify";

const Form = () => {
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState({});
  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (userName.length === 0) {
      toast.error("Please enter user name", { autoClose: 1000 });
      return;
    }
    toast("Loading your profile", { autoClose: 1000 });
    try {
      const here = await getBasicDetails(userName);
      toast.dismiss();

      toast.success("Profile Fetched", {
        autoClose: 2000,
      });
      setProfile(here);
    } catch (e) {
      toast.dismiss();
      console.log("Error", e, e.message);

      toast.error(e.message, {
        autoClose: 2000,
      });
    }
  };
  return (
    <Paper sx={{ maxWidth: 250, margin: 2, padding: 5 }} elevation={17}>
      <ToastContainer />

      <TextField
        id="outlined-basic"
        label="LiChess ID"
        variant="outlined"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <br />
      <br />
      <Button variant="contained" onClick={(e) => onSubmit(e)}>
        Visualize
      </Button>
    </Paper>
  );
};
const Home = () => {
  return (
    <Box alignItems="center">
      <Form />
    </Box>
  );
};

export default Home;
