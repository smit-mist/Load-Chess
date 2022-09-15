import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Paper } from "@mui/material";

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
        
      </Grid>
      <CalendarHeatmap
        values={dateObj}
        gutterSize={2}
        startDate={new Date('2020-01-01')}
        endDate={new Date('2020-12-31')}
        onClick={(val) => {
          console.log("Clicked", val);
        }}
      />
    </Paper>
  );
};

export default HeatMap;
