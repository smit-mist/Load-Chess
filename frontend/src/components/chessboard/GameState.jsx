import React from "react";
import { Paper } from "@mui/material";
import Tree from "react-d3-tree";
import "./index.css";
const GameState = (props) => {
  const getDynamicPathClass = ({ source, target }, orientation) => {
    if (!target.children || target.children.length == 0) {
      // Target node has no children -> this link leads to a leaf node.
      return "link__to-leaf";
    }

    // Style it as a link connecting two branch nodes by default.
    return "link__to-branch";
  };
  return (
    <Paper elevation={5} sx={{ minHeight: 500 }}>
      <div id="treeWrapper" style={{ height: 500 }}>
        <Tree
          data={props.data}
          enableLegacyTransitions={true}
          translate={{ x: 30, y: 270 }}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          pathClassFunc={getDynamicPathClass}
        />
      </div>
    </Paper>
  );
};

export default GameState;
