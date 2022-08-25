import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ndjsonStream from "can-ndjson-stream";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import TournamentCard from "../components/TournamentCard";

let isCalled = false;

const BroadCast = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const getAllTours = () => {
    if (isCalled) {
      console.log("ignored repeated call");
    }
    isCalled = true;
    console.log("Get all tour is called");
    fetch("https://lichess.org/api/broadcast", {
      method: "get",
    })
      .then((data) => {
        console.log("Got the json");
        return ndjsonStream(data.body);
      })
      .then((todoStream) => {
        console.log("Stream is fetched");
        const allTours = [];
        const streamReader = todoStream.getReader();
        const read = (result) => {
          if (result.done) {
            setItems(allTours);
            setLoading(false);
            console.log("All tours", allTours);
            console.log("Get tour is completed");

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
  };
  useEffect(() => {
    getAllTours();
  }, []);

  if (loading) return <div>Loadingt</div>;
  console.log(items);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={3} columnSpacing={3} my={5}>
        {items.map((curr) => {
          return (
            <Grid xs={4}>
              <TournamentCard tour={curr.value} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BroadCast;
