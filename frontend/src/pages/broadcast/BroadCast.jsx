import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ndjsonStream from "can-ndjson-stream";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import TournamentCard from "../../components/ui/TournamentCard";
import { Skeleton } from "@mui/material";

let isCalled = false;

const BroadCast = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const getAllTours = () => {
    if (isCalled) {
    }
    isCalled = true;
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

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container columnSpacing={3} mx={5}>
          {[1,1,1,1,1,1,1].map((curr) => {
            return (
              <Grid xs={4} sx={{ height: 370 }}>
                <Skeleton height={370} sx={{m:0}}/>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={3} columnSpacing={3} my={5} mx={10}>
        {items.map((curr) => {
          return (
            <Grid xs={4} sx={{ height: 370 }} key={curr.value.tour.name}>
              <TournamentCard tour={curr.value} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BroadCast;
