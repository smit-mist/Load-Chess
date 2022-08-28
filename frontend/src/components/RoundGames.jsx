import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import ViewFEN from "./ViewFEN";

let isCalled = false;
const RoundGames = (props) => {
  const roundId = props.id;
  console.log("New round is created", roundId);
  const [loading, setLoading] = useState(true);
  const [roundGames, setRoundGames] = useState([]);
  const getCurrentRound = async () => {
    if (isCalled) {
      console.log("Repeated");
      return;
    }
    isCalled = true;
    const apiUrl = `https://lichess.org/api/broadcast/round/${roundId}.pgn`;
    const response = await axios.get(apiUrl);
    console.log("get round", response.data, typeof response.data);
    let allGames = [];
    let pgnString = response.data;
    let curr = "";
    for (let i = 0; i < pgnString.length; i++) {
      if (i !==0&&
        i + 2 < pgnString.length &&
        pgnString[i] == "[" &&
        pgnString[i + 1] == "E" &&
        pgnString[i + 2] == "v"
      ) {
        allGames.push(curr);
        curr = "";
        curr += pgnString[i];
      } else {
        curr += pgnString[i];
      }
      if (i == pgnString.length - 1) {
        allGames.push(curr);
        curr = "";
      }
    }
    setRoundGames(allGames);
    setLoading(false);
  };
  useEffect(() => {
    getCurrentRound();
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ViewFEN allGames={roundGames} />
    </div>
  );
};

export default RoundGames;
