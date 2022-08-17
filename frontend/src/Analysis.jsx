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
  console.log(tree.root);
  return (
    <div>Analysis</div>
  )
}

export default Analysis