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
import DropDown from "../../../../components/ui/DropDown";
import { useState, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState("Bullet");
  const plotRating = {};

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
      });
    }
  }

  const playingFormat = Object.keys(plotRating);
  const dateLabel = {},
    ratingLabel = {};
  playingFormat.map((name) => {
    const theData = [];
    let lastKnown = 1500;
    Object.keys(plotRating[name]).map((e) => {
      if (plotRating[name][e]) {
        lastKnown = plotRating[name][e];
      }
      theData.push(lastKnown);
    });
    const toReturn = {
      label: name,
      data: theData,
      borderColor: getRandomColor(),
      backgroundColor: "#999999",
    };
    ratingLabel[name] = toReturn;
    dateLabel[name] = Object.keys(plotRating[name]);
  });

    
    return (
    <>
      <DropDown
        label="Format"
        value={isVisible}
        onChange={(newValue) => {
          setIsVisible(newValue.target.value);
        }}
        option={playingFormat}
      />
      {Object.keys(dateLabel[isVisible]).length < 1 ? (
        <h1>Please play games of this format</h1>
      ) : (
        <Line
          options={options}
          data={{
            labels: dateLabel[isVisible],
            datasets: [ratingLabel[isVisible]],
          }}
        />
      )}
    </>
  );
};

export default RatingGraph;
