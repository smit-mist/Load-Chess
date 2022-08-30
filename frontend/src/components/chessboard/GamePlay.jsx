import React from "react";
import { Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { GameTree } from "../../helper/GameTree";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Fragment } from "react";
import { Grid, Paper, Card } from "@mui/material";

const GamePlay = () => {
  const [game, setGame] = useState(new Chess());
  const [tree, setTree] = useState(new GameTree());
 
  if (!tree.root) {
    tree.addNode({ move: "", name: "" });
    setTree(tree);
  }
  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    if (!result) return result;
    setTree(tree);
    setGame(gameCopy);
    tree.makeMove({ move, name: game.history()[game.history().length - 1] });
    return result;
  }

  function undoPreviousMove() {
    var temp = { ...game };
    temp.undo();
    tree.undoCurrentMove();
    setTree(tree);
    setGame(temp);
  }
  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    if (move === null) return false;
    return true;
  }
  return (
    <Fragment>
      <br></br>
      <Grid container justifyContent="space-around">
        <Grid item xs={5}>
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            animationDuration={500}
          />
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3}>
            <Card sx={{minHeight:500}}>
              {game.pgn()}
            </Card>
            <ButtonGroup variant="contained">
              <Button onClick={undoPreviousMove}>{"<"}</Button>
              <Button>{">"}</Button>
            </ButtonGroup>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default GamePlay;
