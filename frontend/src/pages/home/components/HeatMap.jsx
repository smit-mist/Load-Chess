import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { MenuItem, Paper, Grid, InputLabel, FormControl, Select } from "@mui/material";

import "react-calendar-heatmap/dist/styles.css";

function makeStringDate(year, month, day) {
  let ans = "";
  ans += year.toString();
  ans += "-";
  if (month < 10) ans += "0";
  ans += month.toString();
  ans += "-";
  if (day < 10) ans += "0";

  ans += day.toString();
  return ans;
}

const HeatMap = (props) => {
  const { stats } = props.profile;
  const [year, setYear] = React.useState(2019);
  const yearOption = [2019, 2020, 2021, 2022];

  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const contributionCounter = {};
  console.log("Inside heat map");
  for (let j = 0; j < Object.keys(stats).length; j++) {
    const toExplore = stats[j].points;
    for (let k = 0; k < toExplore.length; k++) {
      let year = toExplore[k][0],
        month = toExplore[k][1],
        day = toExplore[k][2];
      let date = makeStringDate(year, month, day);
      if (contributionCounter[date]) {
        contributionCounter[date]++;
      } else {
        contributionCounter[date] = 1;
      }
    }
  }
  const dateObj = [];
  for (var key of Object.keys(contributionCounter)) {
    dateObj.push({ date: key, count: contributionCounter[key] });
  }
  return (
    <Paper>
      <Grid container>
        <Grid item>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={year}
              onChange={handleChange}
              label="Year"
            >
              {yearOption.map((currYear) => {
                return <MenuItem value={currYear}>{currYear}</MenuItem>;
              })}

            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <CalendarHeatmap
        values={dateObj}
        gutterSize={2}
        startDate={new Date(`${year}-01-01`)}
        endDate={new Date(`${year}-12-31`)}
        onClick={(val) => {
          console.log("Clicked", val);
        }}
      />
    </Paper>
  );
};

export default HeatMap;
