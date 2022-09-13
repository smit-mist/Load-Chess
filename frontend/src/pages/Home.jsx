import React from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { useState } from "react";

const Form = () => {
  const [userName, setUserName] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("User name is", userName);
  };
  return (
    <Paper sx={{maxWidth:250, margin:2, padding:5}}   alignItems="center"
    >
    
      <TextField
        id="outlined-basic"
        label="LiChess ID"
        variant="outlined"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <br/>
      <br/>
      <Button variant="contained" onClick={(e)=>onSubmit(e)}>
        Visualize
      </Button>
    </Paper>
  );
};
const Home = () => {
  return <Box alignItems="center"><Form /></Box>;
};

export default Home;
