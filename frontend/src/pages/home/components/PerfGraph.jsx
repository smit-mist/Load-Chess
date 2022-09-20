import React from "react";
import { removeCameCase } from "../utils";
import { useState } from "react";
import {
  MenuItem,
  Paper,
  Grid,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

const PerfGraph = (props) => {
  const { profile } = props;
  const [format, setFormat] = useState("Select");
  const [val, setVal] = useState({});
  const [loading, setLoading] = useState(false)
  console.log(profile);
  const handleChange = (event) => {
    setFormat(event.target.value);
  };

  const fetchDetails = async()=>{
        const url = `https://lichess.org/api/user/${profile.username}/perf/${format}`;

        const response = await axios.get(url);

        if(response.status === 200){
            console.log(response.data, "Successs");
        }
        else{

        }
  };

  useEffect(() => {
    if(format!=="Select"){
        setLoading(true);
        fetchDetails();
    }
  }, [format])
  
  const formatOptions = Object.keys(profile.perfs);
  formatOptions.unshift("Select");
  return (
    <Paper>
      <Grid item>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Format</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={format}
            onChange={handleChange}
            label="Format"
          >
            {formatOptions.map((curr) => {
              if (curr === "Select" || profile.perfs[curr]?.games > 30)
                return <MenuItem value={curr}>{removeCameCase(curr)}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
    </Paper>
  );
};

export default PerfGraph;
