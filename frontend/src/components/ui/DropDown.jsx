import React from "react";
import {
    MenuItem,
    Paper,
    Grid,
    InputLabel,
    FormControl,
    Select,
  } from "@mui/material";
const DropDown = (props) => {
    const {value, onChange, label, option} = props;
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={onChange}
        label={label}
      >
        {option?.map((curr) => {
          return <MenuItem value={curr}>{curr}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default DropDown;
