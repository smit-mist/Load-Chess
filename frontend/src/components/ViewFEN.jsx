import React from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const ViewFEN = (props) => {
  const { allGames } = props;
  const [game, setGame] = useState(new Chess());
  const [loading, setLoading] = useState(true);
  const loadGame = () => {
    console.log(allGames);
    let smit = allGames[0];
    console.log("Loading game", smit);
  };
  useEffect(() => {
    loadGame();
  }, []);
  if (loading) {
    return <Loader />;
  }

  console.log("After loading", game.fen(), game.pgn());
  return <Chessboard fen={game.fen()} animationDuration={500} />;
};

export default ViewFEN;
