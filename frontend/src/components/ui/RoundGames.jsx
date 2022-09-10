import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import ViewFEN from "../chessboard/ViewFEN";
import { Grid } from "@mui/material";

let isCalled = "";
const RoundGames = (props) => {
  const roundId = props.id;
  const [loading, setLoading] = useState(true);
  const [roundGames, setRoundGames] = useState([]);
  const getCurrentRound = async () => {
    if (isCalled === roundId) {
      return;
    }
    setLoading(true);
    isCalled = roundId;
    const apiUrl = `https://lichess.org/api/broadcast/round/${roundId}.pgn`;
    const response = await axios.get(apiUrl);
    let allGames = [];
    let pgnString = response.data;
    let curr = "";
    for (let i = 0; i < pgnString.length; i++) {
      if (
        i !== 0 &&
        i + 2 < pgnString.length &&
        pgnString[i] === "[" &&
        pgnString[i + 1] === "E" &&
        pgnString[i + 2] === "v"
      ) {
        allGames.push(curr);
        curr = "";
        curr += pgnString[i];
      } else {
        curr += pgnString[i];
      }
      if (i === pgnString.length - 1) {
        allGames.push(curr);
        curr = "";
      }
    }
    setRoundGames(allGames);
    setLoading(false);
  };
  useEffect(() => {
    getCurrentRound();
  }, [roundId]);
  if (loading) {
    return <Loader />;
  }
  let till = 20;
  return (
    <Fragment>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {roundGames.map((e, x) => {
          if (till > x) {
            return (
              <Grid item xs={3}>
                <ViewFEN currGame={e} />
              </Grid>
            );
          }
        })}
      </Grid>
    </Fragment>
  );
};

export default RoundGames;
