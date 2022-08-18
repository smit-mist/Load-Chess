import React from "react";

const ChessTV = () => {
  return (
    <div className="center" align="center">
      <iframe
      title="LiChess Top Games"
        src="https://lichess.org/tv/frame?theme=brown&bg=dark"
        style={{width: 400, height: 444}}
        allowtransparency="true"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default ChessTV;
