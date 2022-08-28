import React from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const ViewFEN = (props) => {
  const { pgn } = props;
  const [game, setGame] = useState(new Chess());
  const [loading, setLoading] = useState(true)
  const [curr, setCurr] = useState("");
  const loadGame = () => {
    let smit = "";
    let ignore = false;
    for (let i = 0; i < pgn.length; i++) {
      if (ignore) {
        if (pgn[i] == "}") {
          ignore = false;
        } else {
          continue;
        }
      } else if (pgn[i] === "{") {
        ignore = true;
      }else if(pgn[i+1] === '.' && pgn[i+2] === '.'){
        i += 4;
        continue;
      } 
      else if (
        i !== 0 &&
        pgn[i] === "[" &&
        pgn[i + 1] === "E" &&
        pgn[i + 2] == "v"
      ) {
        break;
      } else {
        smit += pgn[i];
      }
    }
    setCurr(smit);
    console.log("Loading game", smit);
    const temp = new Chess();
    temp.load_pgn(smit);
    setGame(temp);
    game.load_pgn(smit);
    setLoading(false);
  };
  useEffect(() => {
    loadGame();
  }, []);
  if(loading){
    return <Loader/>
  }
  
  console.log("After loading", game.fen(), game.pgn());
  return <Chessboard fen={game.fen()} animationDuration={500} />;
};

export default ViewFEN;
