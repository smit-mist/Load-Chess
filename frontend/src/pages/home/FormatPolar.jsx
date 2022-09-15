import React from "react";
import { Paper } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const FormatPolar = (props) => {
  const { profile } = props;
  const name = [],
    games = [];
  const cols = [];
  for (const [key, value] of Object.entries(profile.perfs)) {
    if (value.games && key !== "puzzle") {
      name.push(key);
      games.push(value.games);
      let red = games.length * 17;
      let blue = 255 - games.length * 15;
      let green = games.length * 10;
      let smit = `rgba(${red}, ${blue}, ${green}, 0.5)`;
      cols.push(smit);
    }
  }

  const data = {
    labels: name,
    datasets: [
      {
        label: "# of Votes",
        data: games,
        backgroundColor: cols,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper sx={{ margin: 2, padding: 3 }} elevation={17}>
      <Doughnut data={data} />
    </Paper>
  );
};
export default FormatPolar;
