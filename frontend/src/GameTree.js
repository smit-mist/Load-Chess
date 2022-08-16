import { Chess } from "chess.js";

function Node(data) {
  this.move = data.move;
  this.nodeId = data.nodeId;
  this.children = [];
}

export class GameTree {
  constructor() {
    this.root = null;
    this.currentState = [];
    this.nodeId = 1;
  }

  addNode(data, parentId) {
    const toPass = {move:data};
    toPass.nodeId = this.nodeId;
    this.nodeId++;
    const parent = parentId ? this.findNode(parentId) : null;
    
    if (parent) {
      for (const childs in parent.children) {
        if (childs.move === toPass.move) {
          this.currentState.push(childs.move);
          return;
        }
      }
      const node = new Node(toPass);
      parent.children.push(node);
      this.currentState.push(node.move);
    } else {
      const node = new Node(toPass);
      this.root = node;
      this.currentState.push(node.move);
    }
    console.log("THIS IS ROOT", this.root);
  }

  findNode(data) {
    const queue = [this.root];
    while (queue.length > 0) {
      const currNode = queue.shift();
      if (currNode.nodeId === data) {
        return currNode;
      }
      for (const childs in currNode.children) {
        queue.push(childs);
      }
    }
    return null;
  }

  undoCurrentMove() {
    this.currentState.pop();
  }

  changeLine(newNodeId) {
    const queue = [this.root];
    const moveArray = [[]];
    while (queue.length > 0) {
      const currNode = queue.shift();
      const currState = moveArray.shift();
      if (currNode.nodeId === newNodeId) {
        return currState;
      }
      for (const childs in currNode.children) {
        const temp = currState;
        temp.push(childs.move);
        queue.push(childs);
        moveArray.push(temp);
      }
    }
    return [];
  }

  getCurrentGame(){
    const chess = new Chess();
    for(const moves in this.currentState){
        chess.move(moves);
    }
    return chess;
  }

  
}
