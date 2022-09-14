import React, { Fragment } from "react";
import {
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  Avatar,
  Divider,
  Link,
  Chip,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getBasicDetails } from "../api/lichessUser";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";

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
function convertHMS(value) {
  let sec = parseInt(value, 10); // convert value to number if it's string
  let days = Math.floor(sec / (3600 * 24));
  sec = sec - days * (3600 * 24);
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return days + "d " + hours + "h " + minutes + "m "; // Return is HH : MM : SS
}
const ProfileTile = (props) => {
  const { profile } = props;
  const toDisplay = [];
  const dateFormat = new Date(profile.createdAt);
  toDisplay.push(`Joined ${dateFormat.toLocaleString().split(",")[0]}`);
  console.log(profile);
  let curr = 0;
  let formatName = "",
    rating = 0;

  for (const [key, value] of Object.entries(profile.perfs)) {
    curr++;
    if (rating < value.rating) {
      (formatName = key); (rating = value.rating);
    }
  }
  toDisplay.push(`Played ${curr} formats`);
  const winRate = profile.count.win / profile.count.all;
  toDisplay.push(`Win ${(winRate * 100).toFixed(2)}%`);
  toDisplay.push(`Time spent ${convertHMS(profile.playTime.total)}`);
  toDisplay.push(`${rating} in ${formatName}`);

  console.log(toDisplay);
  return (
    <Fragment>
      <Paper sx={{ height: 120, margin: 2, padding: 3 }} elevation={17}>
        <Grid container>
          <Grid item>
            {profile && profile.profile && profile.profile.country && (
              <Avatar sx={{ width: 30, height: 30, mr: 1, mb: 1 }}>
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
            )}
          </Grid>
          <Grid item>
            <Link
              href={profile.url}
              target="__blank"
              underline="none"
              color="white"
            >
              <Typography variant="h6">{profile.id}</Typography>
            </Link>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Divider />
        {toDisplay.map((str) => {
          return (
            <Chip
              sx={{ mt: 1, ml: 1 }}
              label={str}
              color="success"
              key={str}
              variant="outlined"
            />
          );
        })}
      </Paper>
    </Fragment>
  );
};

const Home = () => {
  const [profile, setProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (profile.id) setIsLoaded(true);
  }, [profile]);
  return (
    <Grid container justifyContent="center">
      <Grid item xs={3}>
        <Form setProfile={setProfile} />
      </Grid>
      {isLoaded && (
        <Grid item xs={4}>
          <ProfileTile profile={profile} />
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
