import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ndjsonStream from "can-ndjson-stream";

const BroadCast = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  console.log("FEtching");
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
          console.log(allTours);
          return ;
        }

        console.log(result, typeof result);
        allTours.push(result);
        streamReader.read().then(read);
      };

      streamReader.read().then(read);
    })
    .catch((err) => {
      console.error(err);
    });

  console.log("PRINTING ITEMS", items);
  return <div>BrodCast</div>;
};

export default BroadCast;
