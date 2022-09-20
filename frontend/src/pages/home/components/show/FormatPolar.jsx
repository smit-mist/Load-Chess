import React from "react";
import { Paper } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {getRandomColor, removeCameCase} from "../../utils";
ChartJS.register(ArcElement, Tooltip, Legend);



const FormatPolar = (props) => {
  const { profile } = props;
  const name = [],
    games = [];
  const cols = [];
  let forTot = 0;
  for (const [key, value] of Object.entries(profile.perfs)) {
    if (value.games && key !== "puzzle" && value.games > 50) {
      name.push(removeCameCase(key));
      games.push(value.games);
      cols.push(getRandomColor());
    }
    else if(value.games <= 50 && key !== "puzzle"){
      forTot+= value.games;
    }
  }
  if(forTot > 0){
    games.push(forTot);
    name.push("Other");
    cols.push(getRandomColor());
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
