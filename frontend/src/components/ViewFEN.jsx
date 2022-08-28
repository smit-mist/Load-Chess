import React from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

const ViewFEN = (props) => {
  const { pgn } = props;
  const game = new Chess();
  const [curr, setCurr] = useState("");
  const loadGame = () => {
    let smit = "";
    for (let i = 0; i < pgn.length; i++) {
      if (i !== 0 && pgn[i] === "[" && pgn[i + 1] === "E" && pgn[i+2] =='v') {
        break;
      } else {
        smit += pgn[i];
      }
    }
    setCurr(smit);
    console.log("Loading game", smit);
    game.load_pgn(smit);
  };
  useEffect(() => {
    loadGame();
  }, []);

  return <Chessboard fen={game.fen} animationDuration={500} />;
};

export default ViewFEN;
