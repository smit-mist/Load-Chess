import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import ViewFEN from "./ViewFEN";


let isCalled = false;
const RoundGames = (props) => {
  const roundId = props.id;

  const [loading, setLoading] = useState(true);
  const [currentRound, setCurrentRound] = useState({});
  const getCurrentRound = async () => {
    if (isCalled) {
      return;
    }
    isCalled = true;
    const apiUrl = `https://lichess.org/api/broadcast/round/${roundId}.pgn`;
    const response = await axios.get(apiUrl);
    console.log("get round", response.data, typeof response.data);
    setCurrentRound(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getCurrentRound();
  }, []);
  if(loading){
    return <Loader/>
  }
  return <div>
    <ViewFEN pgn={currentRound}/>
  </div>;
};

export default RoundGames;
