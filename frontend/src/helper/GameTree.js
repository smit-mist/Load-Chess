import { Chess } from "chess.js";

function Node(data) {
  this.move = data.move;
  this.name = data.name;
  this.nodeId = data.nodeId;
  this.children = [];
}

export class GameTree {
  constructor() {
    this.root = null;
    this.moveState = [];
    this.idState = [];
    this.nodeId = 1;
  }

  addNode(data, parentId) {
    const toPass = data;
    toPass.nodeId = this.nodeId;
    this.nodeId++;
    const parent = parentId ? this.findNode(parentId) : null;
    if (parent) {
      for (const childs in parent.children) {
        let smit = parent.children[childs];

        if (
          smit.move.to === toPass.move.to &&
          smit.move.from === toPass.move.from
        ) {
          this.currentState.push(smit.move);
          this.idState.push(smit.nodeId);
          return;
        }
      }
      const node = new Node(toPass);
      parent.children.push(node);
      this.currentState.push(node.move);
      this.idState.push(node.nodeId);
    } else {
      const node = new Node(toPass);
      this.root = node;
      this.currentState = [node.move];
      this.idState = [node.nodeId];
    }
  }
  makeMove(data) {
    const lastNode = this.idState[this.idState.length - 1];
    this.addNode(data, lastNode);
  }

  findNode(data) {
    const queue = [this.root];
    while (queue.length > 0) {
      const currNode = queue.shift();
      if (currNode.nodeId === data) {
        return currNode;
      }

      for (let i = 0; i < currNode.children.length; i++) {
        queue.push(currNode.children[i]);
      }
    }
    return null;
  }

  undoCurrentMove() {
    this.currentState.pop();
    this.idState.pop();
  }

  changeLine(newNodeId) {
    const queue = [this.root];
    const moveArray = [[]];
    let finalSeq = [];
    while (queue.length > 0) {
      const currNode = queue.shift();
      const currState = moveArray.shift();
      if (currNode.nodeId === newNodeId) {
        finalSeq = currState;
        break;
      }
      for (let j = 0; j < currNode.children.length; j++) {
        const childs = currNode.children[j];
        const temp = currState;
        temp.push(childs.move);
        queue.push(childs);
        moveArray.push(temp);
      }
    }
    let temp = this.root;
    this.currentState = [];
    this.idState = [];
    let ind = 0;
    while (temp.nodeId !== newNodeId) {
      this.currentState.push(temp.move);
      this.currentState.push(temp.nodeId);
      for (let j = 0; j < temp.children.length; j++) {
        const child = temp.children[j];
        if (child.move === finalSeq[ind]) {
          ind++;
          temp = child;
          break;
        }
      }
    }
  }

  getCurrentGame() {
    const chess = new Chess();
    for (const moves in this.currentState) {
      chess.move(moves);
    }
    return chess;
  }

  getJSON(startFrom) {
    const obj = {};
    obj.name = startFrom.name;
    obj.children = [];
    for (let j = 0; j < startFrom.children.length; j++) {
      const child = startFrom.children[j];
      obj.children.push(this.getJSON(child));
    }
    return obj;
  }
}
