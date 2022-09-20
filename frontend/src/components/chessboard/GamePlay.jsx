import React from "react";
import { Chess } from "chess.js";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { GameTree } from "../../helper/GameTree";
import Button from "@mui/material/Button";
import { Fragment } from "react";
import { Grid, Paper, Card, Typography, Divider } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GameState from "./GameState";
import { useLocation } from "react-router-dom";

const GamePlay = () => {
  const location = useLocation();

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
    setGame(gameCopy);
    tree.makeMove({ move, name: game.history()[game.history().length - 1] });
    setTree(tree);
  
    console.log("Make move", tree.mainLine);

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
    tree.changeLine(id);
    setTree(tree);
    setGame(tree.getCurrentGame());
  }
  useEffect(() => {
    if (location.state) {
      const tempGame = new Chess();
      tempGame.load_pgn(location.state);
      setGame(tempGame);
      tree.loadGame(tempGame);
      setTree(tree);
    }
  }, []);


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
            <Card sx={{ minHeight: 500 }}>
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
                          color={isLastMove ? "white" : "error"}
                        >{`${toPrint}.  ${e}`}</Typography>
                      </Grid>
                    );
                  }
                  return (
                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        color={isLastMove ? "white" : "error"}
                      >
                        {e}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
            <Divider />
            {/* <br /> */}
            <Card sx={{ minHeight: 50 }}>
              <Grid container justifyContent="space-evenly" sx={{m:1}}>
                <Grid item xs={2}>
                  <Button onClick={undoPreviousMove} variant="outlined" color="error">
                    <ArrowBackIosNewIcon />
                  </Button>
                </Grid>

                <Grid item xs={2}>
                  <Button variant="outlined" onClick={nextMove} color="error">
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
