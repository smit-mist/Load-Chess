import { Chess } from "chess.js";

function Node(data) {
  // *move and name stores the same thing.
  this.move = data.move;
  this.name = data.name;
  this.nodeId = data.nodeId;
  this.children = [];
}

export class GameTree {
  constructor() {
    this.root = null; // ? Root node of the game tree.
    this.moveState = []; // ? Stores an array of move notation till the current position. Similar to game.history().
    this.idState = []; // ? Stores the id of each node corresponding to 'moveState[i]'.
    this.nodeId = 1; // ? Which 'nodeId' is to be given to next node.
    this.mainLine = [];
  }

  // ?Manipulating tree.....

  // ! Function to add a children to given parentId. If parentId not found will make the current node root.
  addNode(data, parentId) {
    const toPass = data;
    toPass.nodeId = this.nodeId;
    this.nodeId++;
    // *Store given data into 'toPass' and also, give unique node id.
    const parent = parentId ? this.findNode(parentId) : null;
    // *Find the parent
    if (parent) {
      for (const childs in parent.children) {
        let smit = parent.children[childs];
        if (
          smit.move.to === toPass.move.to &&
          smit.move.from === toPass.move.from
        ) {
          // *If move already found visit it.
          this.currentState.push(smit.move);
          this.idState.push(smit.nodeId);
          return;
        }
      }
      const node = new Node(toPass);
      if (this.areSameMove(this.mainLine[this.mainLine.length - 1], parent)) {
        this.mainLine.push({ move: node.move, nodeId: node.nodeId });
      }
      // *Or else create the node..
      parent.children.push(node);
      this.currentState.push(node.move);
      this.idState.push(node.nodeId);
    } else {
      // *If no parent is available make the current node root node.
      const node = new Node(toPass);
      this.root = node;
      this.mainLine = [{ move: node.move, nodeId: node.nodeId }];
      this.currentState = [node.move];
      this.idState = [node.nodeId];
    }
  }

  // ! makeMove will call 'addNode(data, lastMove)'. We get last move from 'idState'.
  makeMove(data) {
    const lastNode = this.idState[this.idState.length - 1];
    for (let j = 0; j < this.mainLine.length - 1; j++) {
      if (this.mainLine[j].nodeId === lastNode) {
        if (!data || this.areSameMove(this.mainLine[j + 1], data)) {
          this.currentState.push(this.mainLine[j + 1].move);
          this.idState.push(this.mainLine[j + 1].nodeId);
          return;
        }
      }
    }
    if (!data) return;
    this.addNode(data, lastNode);
  }

  // ! Undo current move, just remove from 'currentState' and 'idState'.
  undoCurrentMove() {
    this.currentState.pop();
    this.idState.pop();
  }

  // ! Update the mainline of the game.
  changeLine(newNodeId) {
    const queue = [this.root];
    const moveArray = [[this.root.move]];
    let finalSeq = [];
    console.log("Inside change line", newNodeId);
    // ?Using bfs to find the whole sequence of move to the given node.
    while (queue.length > 0) {
      const currNode = queue.shift();
      const currState = moveArray.shift();
      console.log(currNode, currState);
      if (currNode.nodeId === newNodeId) {
        finalSeq = currState;
        break;
      }
      for (let j = 0; j < currNode.children.length; j++) {
        const childs = currNode.children[j];
        const temp = [...currState];
        temp.push(childs.move);
        queue.push(childs);
        moveArray.push(temp);
      }
    }
    console.log("Final seq", finalSeq);
    let temp = this.root;
    this.currentState = [];
    this.idState = [];
    let ind = 0;
    while (temp.nodeId !== newNodeId) {
      this.currentState.push(temp.move);
      this.idState.push(temp.nodeId);
      for (let j = 0; j < temp.children.length; j++) {
        const child = temp.children[j];
        if (child.move === finalSeq[ind]) {
          ind++;
          temp = child;
          break;
        }
      }
    }

    console.log("after completing");
    console.log(this.currentState, this.idState);

    // *Updating main line...
    this.mainLine = [];
    for (let i = 0; i < this.currentState.length; i++) {
      this.mainLine.push({
        move: this.currentState[i],
        nodeId: this.idState[i],
      });
    }
    console.log(this.mainLine);
  }

  // ? Read something

  // ! Returns a chess game with moves made based on current state.
  getCurrentGame() {
    const chess = new Chess();
    for (const moves in this.currentState) {
      chess.move(this.currentState[moves]);
    }
    return chess;
  }

  // ! This will give list of moves for main line.
  getMainLineHistory() {
    const chess = new Chess();
    for (let j = 1; j < this.mainLine.length; j++) {
      chess.move(this.mainLine[j].move);
    }
    return chess.history();
  }

  // ! Gives JSON of whole tree, used in displaying.
  getJSON(startFrom) {
    // ?Tree is not updating after last commit.
    const obj = {};
    obj.name = startFrom.name;
    obj.nodeId = startFrom.nodeId;
    obj.children = [];
    for (let j = 0; j < startFrom.children.length; j++) {
      const child = startFrom.children[j];
      obj.children.push(this.getJSON(child));
    }
    return obj;
  }

  lastNode() {
    let siz = this.currentState.length - 1;
    const newNode = new Node({
      move: this.currentState[siz],
      nodeId: this.idState[siz],
    });
    return newNode;
  }

  // ?Utils

  // ! Given a 'nodeId' find the node with that id. BFS is used.
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
  areSameMove(a, b) {
    if (a.move?.to === b.move?.to && a.move?.from === b.move?.from) return true;
    return false;
  }
}
