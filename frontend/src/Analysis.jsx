import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import {GameTree} from "./GameTree";

const Analysis = () => {
  const [game, setGame] = useState(new Chess());
  const tree = new GameTree();
  tree.addNode({move:""});
  tree.addNode({move:"e4"}, 1);
  tree.addNode({move:"d4"}, 1);
  tree.addNode({move:"c5"}, 2);
  tree.addNode({move:"d5"}, 2);

  tree.addNode({move:"c6"}, 3);
  tree.addNode({move:"d5"}, 3);
  
  return (
    <div>Analysis</div>
  )
}

export default Analysis