import React from "react";
import { Chess } from "chess.js";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { GameTree } from "../../helper/GameTree";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Fragment } from "react";
import { Grid, Paper, Card, Typography, Divider } from "@mui/material";
import Tree from "react-d3-tree";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GameState from "./GameState";

const GamePlay = (props) => {
  const [game, setGame] = useState(new Chess());
  const [tree, setTree] = useState(new GameTree());

  if (!tree.root) {
    tree.addNode({ move: { from: "", to: "" }, name: "" });
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

  function nextMove() {
    tree.makeMove();
    setTree(tree);
    setGame(tree.getCurrentGame());
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

  function makeNodeMainLine(id) {
    console.log("Main function called", id);
    console.log(tree.mainLine);
    tree.changeLine(id);
    console.log(tree.mainLine);
    setTree(tree);
    setGame(tree.getCurrentGame());
  }
  useEffect(() => {
    if(props.game){
      setGame(props.game);
      tree.loadGame(game);
    }
  }, [])
  
  return (
    <Fragment>
      <br></br>
      <Grid container justifyContent="center">
        <Grid item xs={5}>
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            animationDuration={300}
          />
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <Card sx={{ minHeight: 520 }}>
              <Grid container justify="center" rowSpacing={1}>
                {tree.getMainLineHistory().map((e, i) => {
                  let isLastMove = false;

                  if (
                    i + 1 < tree.mainLine.length &&
                    tree.areSameMove(tree.mainLine[i + 1], tree.lastNode())
                  ) {
                    isLastMove = true;
                  }
                  if (i % 2 === 0) {
                    let toPrint = i / 2 + 1;
                    return (
                      <Grid item xs={6}>
                        <Typography
                          variant="h5"
                          color={isLastMove ? "secondary" : "primary"}
                        >{`${toPrint}.  ${e}`}</Typography>
                      </Grid>
                    );
                  }
                  return (
                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        color={isLastMove ? "secondary" : "primary"}
                      >
                        {e}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
            <Divider />
            <br />
            <Card sx={{ minHeight: 50 }}>
              <Grid container justifyContent="space-evenly">
                <Grid item xs={2}>
                  <Button onClick={undoPreviousMove} variant="outlined">
                    <ArrowBackIosNewIcon />
                  </Button>
                </Grid>

                <Grid item xs={2}>
                  <Button variant="outlined" onClick={nextMove}>
                    <ArrowForwardIosIcon />
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Paper>
        </Grid>
      </Grid>
      <GameState
        data={tree.getJSON(tree.root)}
        tree={tree}
        callBackToChangeMainLine={makeNodeMainLine}
      />
    </Fragment>
  );
};

export default GamePlay;
