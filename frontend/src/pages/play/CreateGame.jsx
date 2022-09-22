import React, { Fragment } from "react";
import { TextField, Button, Paper, Grid } from "@mui/material";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const ShareGame = (props) => {
  const gameId = uuidv4();
  const { userName } = props;
  const url = `http://localhost:3000/game/${gameId}`;

  return (
    <Fragment>
      <ToastContainer />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            You are one step away
          </Typography>
          <Typography variant="h5" component="div">
            {userName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Share the below url with a friend
          </Typography>
          <Typography variant="body2">{url}</Typography>
        </CardContent>
        <CardActions>
          <CopyToClipboard
            text={gameId}
            onCopy={() => {
              toast("Copied", { autoClose: 500 });
            }}
          >
            <Button variant="contained">Copy</Button>
          </CopyToClipboard>
          <Button variant="contained">Start</Button>
        </CardActions>
      </Card>
      {/* <Grid container justifyContent="center">
          <Grid item xs={12}>{`Hey, ${userName} share this url with your friend`}</Grid>
          <Grid item xs={12}>{url}</Grid>
          <Grid item>
            <CopyToClipboard
              text={gameId}
              onCopy={() => {
                toast("Copied", { autoClose: 500 });
              }}
            >
              <Button variant="contained">Copy</Button>
            </CopyToClipboard>
          </Grid>
        </Grid> */}
    </Fragment>
  );
};

const CreateGame = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (userName.length === 0) {
      toast.error("Please enter name", { autoClose: 500 });
      return;
    }
    console.log("USer name is", userName);
    setFormSubmitted(true);
  };
  if (formSubmitted) {
    return <ShareGame userName={userName} />;
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
              Start Game
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CreateGame;
