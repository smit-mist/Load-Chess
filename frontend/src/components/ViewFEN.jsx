import React from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const ViewFEN = (props) => {
  const { allGames } = props;
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(new Chess());
  const loadGame = () => {
    console.log(allGames);
    let smit = allGames[0];
    console.log("Loading game", smit);
    let curr = "";
    let ignore = false;
    let noStart = false;
    for (let i = 0; i < smit.length; i++) {
      if (ignore) {
        if (smit[i] === "}") {
          ignore = false;
        } else {
        }
        continue;
      } else if (smit[i] === "{") {
        ignore = true;
      } else if (noStart) {
        if (smit[i] === "]") {
          noStart = false;
        } else {
        }
        continue;
      } else if (smit[i] === "[") {
        noStart = true;
      } else {
        curr += smit[i];
      }
    }

    console.log("after proceccing", curr.trim());
    let inFormat = "";
    let ind = 0;
    while (ind < curr.length) {
      let temp = "";
      while (ind < curr.length && curr[ind] !== " ") {
        temp += curr[ind];
        ind++;
      }
      if (temp.includes("...")) {
        ind++;
      } else {
        inFormat += temp;
        inFormat += " ";
        ind++;
      }

      temp = "";
    }
    console.log(inFormat);
    let newGame = new Chess();
    newGame.load_pgn(inFormat);
    setGame(newGame);
    setLoading(false);
  };
  useEffect(() => {
    loadGame();
  }, []);
  if (loading) {
    return <Loader />;
  }

  console.log("Before UI", game.fen());
  console.log("PGN",  game.pgn());
  return <Chessboard position={game.fen()} animationDuration={500} />;
};

export default ViewFEN;
