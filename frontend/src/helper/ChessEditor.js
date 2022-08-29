import { Chess } from "chess.js";


export const loadPGN = (fullPgn) => {
    // Extract the moves from full pgn, and return game with loaded pgn.
    let curr = "";
    let ignore = false;
    let noStart = false;
    for (let i = 0; i < fullPgn.length; i++) {
      if (ignore) {
        if (fullPgn[i] === "}") {
          ignore = false;
        } else {
        }
        continue;
      } else if (fullPgn[i] === "{") {
        ignore = true;
      } else if (noStart) {
        if (fullPgn[i] === "]") {
          noStart = false;
        } else {
        }
        continue;
      } else if (fullPgn[i] === "[") {
        noStart = true;
      } else {
        curr += fullPgn[i];
      }
    }
    let toLoad = formatPgn(curr);
    return toLoad;
  };


  export const formatPgn = (curr)=>{
    let inFormat = "";
    let ind = 0;
    while (ind < curr.length) {
      let temp = "";
      while (ind < curr.length && curr[ind] !== " ") {
        temp += curr[ind];
        ind++;
      }
      if (temp.includes("...")) {
        ind++;
      } else {
        inFormat += temp;
        inFormat += " ";
        ind++;
      }

      temp = "";
    }
    return inFormat;
  };