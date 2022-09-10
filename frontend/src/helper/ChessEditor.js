import { Chess } from "chess.js";
import {removeInverted} from "./StringOps";


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

export const formatPgn = (curr) => {
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

export const loadEssentials = (fullPgn) => {
  const obj = {};
  let curr = "";
  let isRunning = false;
  for (let j = 0; j < fullPgn.length; j++) {
    if (isRunning && fullPgn[j] === "]") {
      let keey = "";
      let toStart = 0;
      for (let k = 0; k < curr.length; k++) {
        if (curr[k] === " ") {
          toStart = k + 1;
          break;
        } else {
          keey += curr[k];
        }
      }
      let value = "";
      for (let k = toStart; k < curr.length; k++) {
        value += curr[k];
      }
      isRunning = false;
      obj[keey] = removeInverted(value);
    } else if (!isRunning && fullPgn[j] === "[") {
      curr = "";
      isRunning = true;
    } else {
      if (!isRunning) {
        continue;
      }
      curr += fullPgn[j];
    }
  }
  return obj;
};
