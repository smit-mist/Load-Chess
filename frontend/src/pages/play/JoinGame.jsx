import React, { Fragment } from "react";
import { TextField, Button, Paper, Grid } from "@mui/material";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useParams} from "react-router-dom";
const socket = require('../../api/socket').socket;
const mySocketId = require('../../api/socket').mySocketId;
const JoinGame = () => {
  const {id} = useParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

  
  const onSubmit = (e) => {
    e.preventDefault();
    if (userName.length === 0) {
      toast.error("Please enter name", { autoClose: 500 });
      return;
    }
    socket.emit("joinGame", {gameId:id, userId:mySocketId});
    console.log("USer name is", userName);
    setFormSubmitted(true);
  };
  if (formSubmitted) {
    return <h1>let the host start the game</h1>;
  }
  return (
    <Fragment>
      <ToastContainer />
      <Grid container justifyContent="space-evenly">
        <Grid item xs={4}>
          <Paper sx={{ margin: 2, padding: 3 }} elevation={17}>
            <TextField
              id="outlined-basic"
              label="Enter your name"
              variant="outlined"
              fullWidth={true}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <br />
            <br />
            <Button variant="contained" onClick={(e) => onSubmit(e)}>
              Join Game
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default JoinGame;
