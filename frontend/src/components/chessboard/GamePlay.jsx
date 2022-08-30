import React from "react";
import { Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { GameTree } from "../../helper/GameTree";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Fragment } from "react";

const GamePlay = () => {
  const [game, setGame] = useState(new Chess());
  const [tree, setTree] = useState(new GameTree());

  return (
    <Fragment>
      <Chessboard animationDuration={500} boardWidth={250}/>
      <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
      <Button>{'<'}</Button>
      <Button>{'>'}</Button>
    </ButtonGroup>
    </Fragment>
  );
};

export default GamePlay;
