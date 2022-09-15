import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import UserNameForm from "./UserNameForm";
import ProfileTile from "./ProfileTile";
import WinLoss from "./WinLoss";

const Home = () => {
  const [profile, setProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (profile.id) setIsLoaded(true);
  }, [profile]);
  return (
    <Fragment>
      {" "}
      <Grid container justifyContent="center">
        <Grid item xs={3}>
          <UserNameForm setProfile={setProfile} />
        </Grid>
        {isLoaded && (
          <Grid item xs={4}>
            <ProfileTile profile={profile} />
          </Grid>
        )}
      </Grid>
      {isLoaded && (
        <Grid container>
          <Grid item xs={4}>
            <WinLoss profile={profile} />
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default Home;
