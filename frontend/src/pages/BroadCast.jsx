import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ndjsonStream from "can-ndjson-stream";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import TournamentCard from "../components/TournamentCard";

const BroadCast = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  fetch("https://lichess.org/api/broadcast", {
    method: "get",
  })
    .then((data) => {
      return ndjsonStream(data.body);
    })
    .then((todoStream) => {
      const allTours = [];
      const streamReader = todoStream.getReader();
      const read = (result) => {
        if (result.done) {
          setItems(allTours);
          setLoading(false);
          console.log("All tours", allTours);
          return;
        }
        allTours.push(result);
        streamReader.read().then(read);
      };

      streamReader.read().then(read);
    })
    .catch((err) => {
      console.error(err);
    });

  if (loading) return <div>Loadingt</div>;

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={3} columnSpacing={3} my={5}>
        {items.forEach((tour) => {
          <Grid xs={4}>
            <TournamentCard />
          </Grid>;
        })}
      </Grid>
    </Box>
  );
};

export default BroadCast;
