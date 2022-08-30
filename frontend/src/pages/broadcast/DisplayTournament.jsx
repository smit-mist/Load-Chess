import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { breakPipe } from "../../helper/StringOps";
import { Chip, Grid, Typography } from "@mui/material";
import RoundGames from "../../components/ui/RoundGames";

let isCalled = false;




const DisplayTournament = () => {
  let id = useParams().id;
  let slug = useParams().slug;
  const [loading, setLoading] = useState(true);
  const [currentTour, setCurrentTour] = useState({});
  const [round, setRound] = useState(0);
  const getCurrentTournament = async () => {
    if (isCalled) {
      return;
    }
    isCalled = true;
    const apiUrl = `https://lichess.org/broadcast/${slug}/${id}`;
    const response = await axios.get(apiUrl);
  
    setCurrentTour(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getCurrentTournament();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <Fragment>
      <Typography variant="h4" gutterBottom>
        {currentTour.tour.name}
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={2}>
        {currentTour.rounds.map((obj, key) => {
          if (round === key) {
            return (
              <Grid item>
                <Chip label={obj.name} color="info" />
              </Grid>
            );
          } else {
            return (
              <Grid item>
                <Chip label={obj.name} variant="outlined" onClick={() => {
                  setRound(key);
                }} />
              </Grid>
            );
          }
        })}
      </Grid>

        <RoundGames id={currentTour.rounds[round].id}/>
    </Fragment>
  );
};

export default DisplayTournament;
