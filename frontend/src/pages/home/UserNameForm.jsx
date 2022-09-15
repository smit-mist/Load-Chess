import React, { Fragment } from "react";
import { TextField, Button, Paper } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getBasicDetails } from "../../api/lichessUser";
import { toast, ToastContainer } from "react-toastify";

const UserNameForm = (props) => {
  const [userName, setUserName] = useState("smit_37_mistry");
  const onSubmit = async (e) => {
    // props.setProfile({});
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
      props.setProfile(here);
    } catch (e) {
      toast.dismiss();
      console.log("Error", e, e.message);

      toast.error(e.message, {
        autoClose: 2000,
      });
    }
  };
  return (
    <Fragment>
      <ToastContainer />

      <Paper sx={{ height: 120, margin: 2, padding: 3 }} elevation={17}>
        <TextField
          id="outlined-basic"
          label="Lichess Id"
          variant="outlined"
          fullWidth={true}
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
    </Fragment>
  );
};

export default UserNameForm;
