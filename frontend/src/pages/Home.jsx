import React, { Fragment } from "react";
import {
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getBasicDetails } from "../api/lichessUser";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

const Form = (props) => {
  const [userName, setUserName] = useState("smit_37_mistry");
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

const ProfileTile = (props) => {
  const { profile } = props;
  return (
    <Fragment>
      <Paper sx={{ height: 120, margin: 2, padding: 3 }} elevation={17}>
        <Grid container>
          <Grid item>
            <Avatar  sx={{ width: 32, height: 32, mr:2 }}>
              <ReactCountryFlag
                countryCode={profile.profile.country}
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
                title={profile.profile.country}
              />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5">{profile.id}</Typography>
          </Grid>
        </Grid>
        <Divider/>

      </Paper>
    </Fragment>
  );
};

const Home = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    console.log("profile changed", profile);
  }, [profile]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={3}>
        <Form setProfile={setProfile} />
      </Grid>
      <Grid item xs={6}>
        <ProfileTile profile={profile} />
      </Grid>
    </Grid>
  );
};

export default Home;
