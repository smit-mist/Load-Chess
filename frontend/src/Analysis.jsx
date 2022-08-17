import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { GameTree } from "./GameTree";
import Tree from "react-d3-tree";

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

const Analysis = () => {
  const [game, setGame] = useState(new Chess());
  const tree = new GameTree();
  tree.addNode({ move: "" });
  
  console.log(tree.root);
  return (
    <div id="treeWrapper" style={{ width: "500em", height: "500em" }}>
      {" "}
      <Tree data={tree.root} />
    </div>
  );
};

export default Analysis;
