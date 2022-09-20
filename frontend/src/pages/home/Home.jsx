import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import UserNameForm from "./components/UserNameForm";
import ProfileTile from "./components/show/ProfileTile";
import WinLoss from "./components/show/WinLoss";
import FormatPolar from "./components/show/FormatPolar";
import HeatMap from "./components/show/HeatMap";
import FormatPerfomance from "./components/FormatPerfomance";
import RatingGraph from "./components/show/RatingGraph";

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
        <Grid item xs={12} md={4}>
          <UserNameForm setProfile={setProfile} />
        </Grid>
        {isLoaded && (
          <Grid item xs={12} md={4}>
            <ProfileTile profile={profile} />
          </Grid>
        )}
      </Grid>
      {isLoaded && (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={4}>
              <WinLoss profile={profile} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormatPolar profile={profile} />
            </Grid>
          </Grid>

          <HeatMap profile={profile} />
          <RatingGraph stats={profile.stats}/>
          <FormatPerfomance profile={profile} />
        </>
      )}
    </Fragment>
  );
};

export default Home;
