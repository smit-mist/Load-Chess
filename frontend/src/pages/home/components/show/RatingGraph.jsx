import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getRandomColor, makeStringDate } from "../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Rating Stats",
    },
  },
};
const RatingGraph = (props) => {
  const { stats } = props;

  const plotRating = {};
  const commonDates = {};

  for (let keys in Object.entries(stats)) {
    const currVal = stats[keys];
    if (currVal.points) {
      plotRating[currVal.name] = {};
      currVal.points.map((dataPoint) => {
        const eventDate = makeStringDate(
          dataPoint[0],
          dataPoint[1],
          dataPoint[2]
        );
        plotRating[currVal.name][eventDate] = dataPoint[3];
        commonDates[eventDate] = 1;
      });
    }
  }
  
  const labels = Object.keys(commonDates);
  const dataSet = [];

  const playingFormat = Object.keys(plotRating);
  playingFormat.map((name)=>{
    const theData = [];
    let lastKnown = 1500;
    labels.map((e)=>{
        if(plotRating[name][e]){
            lastKnown= plotRating[name][e];
        }
        theData.push(lastKnown);
    })
    const toReturn = {
      label: name,
      data: theData,
      borderColor: getRandomColor(),
      backgroundColor: "#999999",
    };

    dataSet.push(toReturn);
  });


    const data = {
      labels,
      datasets: dataSet,
    };
//   return <></>;
    return <Line options={options} data={data} />;
};

export default RatingGraph;