import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

let isCalled = false;
const DisplayTournament = () => {
  let id = useParams().id;
  let slug = useParams().slug;
  const [loading, setLoading] = useState(true);
  const [currentTour, setCurrentTour] = useState({});

  const getCurrentTournament = async () => {
    if (isCalled) {
      return;
    }
    isCalled = true;
    console.log("Getting current tournament");
    const apiUrl = `https://lichess.org/broadcast/${slug}/${id}`;
    const response = await axios.get(apiUrl);

    setCurrentTour(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getCurrentTournament();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  return <div>{currentTour.tour.name}</div>;
};

export default DisplayTournament;
