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
    return result; 
    // null if the move was illegal, the move object if the move was legal
  }


  function undoPreviousMove() {
    var temp = { ...game };
    temp.undo();
    setGame(temp);
  }
  function moveSelected(s){
      if(!game.get(s)){
          return;
      }
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
