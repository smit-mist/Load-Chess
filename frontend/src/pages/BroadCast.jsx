import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const BroadCast = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios("https://lichess.org/api/broadcast")
      // .then((res) => {
      //   console.log(res.data);
      // })
      .then(
        (result) => {
          setLoading(false);
          console.log("API RESULT:- ", result);
          setItems(JSON.parse(result));
          console.log("Items:- ", items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("ERROR:- ", error);
          setLoading(false);
          setError(error);
        }
      );
  }, []);

  return <div>BrodCast</div>;
};

export default BroadCast;
