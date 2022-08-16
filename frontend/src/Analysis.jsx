import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const Analysis = () => {
  const [game, setGame] = useState(new Chess());

  return (
    <div>Analysis</div>
  )
}

export default Analysis