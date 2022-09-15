import React from "react";
import { Paper } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const WinLoss = (props) => {
  const { draw, win, loss } = props.profile.count;

  const data = {
    labels: ["Win", "Loss", "Draw"],
    datasets: [
      {
        label: "Game Results",
        data: [win, loss, draw],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",

          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Paper sx={{ margin: 2, padding: 3 }} elevation={17}>
      <Pie data={data} redraw={true} />
    </Paper>
  );
};

export default WinLoss;
