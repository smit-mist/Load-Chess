import React, { Fragment } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { loadEssentials, loadPGN } from "../../helper/ChessEditor";
import { Skeleton, Typography, Card, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewFEN = (props) => {
  const { currGame, ...rest } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(new Chess());
  const [gameData, setGameData] = useState({});
  const loadGame = () => {
    let temp = loadPGN(currGame);
    let ess = loadEssentials(currGame);
    let myGame = new Chess();
    myGame.load_pgn(temp);
    setGame(myGame);
    setGameData(ess);
    setLoading(false);
  };
  useEffect(() => {
    loadGame();
  }, []);
  if (loading) {
    return (
      <Card sx={{ maxWidth: 260 }} raised={true}>
        <Skeleton variant="rectangular" width={200} height={50} />

        <Skeleton variant="rectangular" width={200} height={200} />
        <Skeleton variant="rectangular" width={200} height={50} />
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 260 }} raised={true} {...rest} onClick={()=>{
      navigate("/analysis", {state:game.pgn()});
    }}>
      <Typography gutterBottom={true}>{gameData["Black"]}</Typography>
      <Chessboard
        position={game.fen()}
        animationDuration={500}
        boardWidth={250}
        arePiecesDraggable={false}
      />
      <Typography gutterBottom={true}>{gameData["White"]}</Typography>
    </Card>
  );
};

export default ViewFEN;
