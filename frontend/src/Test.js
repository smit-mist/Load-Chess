import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import * as React from "react";
import Button from "@mui/material/Button";

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  //   function makeRandomMove() {
  //     const possibleMoves = game.moves();
  //     if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
  //       return; // exit if the game is over
  //     const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //     makeAMove(possibleMoves[randomIndex]);
  //   }
  useEffect(() => {
    console.log(game.history());
    console.log(game.fen());
  }, [game]);

  function undoPreviousMove() {
    console.log(game.history());
    var temp = { ...game };
    temp.undo();
    setGame(temp);
  }
  function moveSelected(s){
      if(!game.get(s)){
          return;
      }
      console.log("Inside");
      
      console.log(game.moves({square:s}));
      
  }
  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;

    // setTimeout(makeRandomMove, 200);
    return true;
  }
  console.log("Before returning", game.history());
  console.log(game.pgn());

  return (
    <>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        animationDuration={500}
        onSquareClick={(s) => {
          moveSelected(s);
        }}
        
      />

<iframe src="https://lichess.org/embed/game/hvwGCDDn?theme=auto&bg=auto" width={600} height={397} frameborder={0}></iframe>

      {game.pgn()}

      <Button onClick={undoPreviousMove}>Text</Button>



      {/* <div>

  <button onClick={game.undo()}> Back</button>

  </div> */}
    </>
  );
}
