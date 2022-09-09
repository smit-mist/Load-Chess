import React from "react";
import { Paper } from "@mui/material";
import Tree from "react-d3-tree";
import "./index.css";

const GameState = (props) => {
  const handleNodeClick = (nodeDatum) => {
    console.log("This node is clicked", nodeDatum);
  };

  const renderNodeWithCustomEvents = ({ nodeDatum, handleNodeClick }) => {
    let found = false;
    for(let j=0;j<props.tree.mainLine.length;j++){
      if(props.tree.mainLine[j].nodeId === nodeDatum.nodeId){
        found = true;
      }
    }
    let color = "#00FF00";
    if(found){
      color = "#FF0000";
    }
    return (
      <g>
        <circle
          r="15"
          onClick={() => handleNodeClick(nodeDatum)}
          // stroke="#000000"
          fill={color}
        />
        <text fill="black" x="20" dy="20" strokeWidth="1">
          {nodeDatum.name}
        </text>
        )
      </g>
    );
  };

  return (
    <Paper elevation={5} sx={{ minHeight: 500 }}>
      <div id="treeWrapper" style={{ height: 500 }}>
        <Tree
          data={props.data}
          enableLegacyTransitions={true}
          translate={{ x: 30, y: 270 }}
          // rootNodeClassName="node__root"
          // branchNodeClassName="node__branch"
          // leafNodeClassName="node__leaf"
          // pathClassFunc={getDynamicPathClass}
          renderCustomNodeElement={(rd3tProps) =>
            renderNodeWithCustomEvents({ ...rd3tProps, handleNodeClick })
          }
          // onNodeClick={(e) => {
          //   console.log("This node is clicked", e);
          // }}
        />
      </div>
    </Paper>
  );
};

export default GameState;
