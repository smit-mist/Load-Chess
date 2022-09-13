import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { breakPipe } from "../../helper/StringOps";
import { Chip, Grid, TablePagination, Typography } from "@mui/material";
import RoundGames from "../../components/ui/RoundGames";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import { Paper } from "@mui/material";
import Tab from "@mui/material/Tab";

let isCalled = false;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Paper sx={{ margin: 2, minWidth: 500, minHeight: 500 }}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    </Paper>
  );
}
const RoundTabs = ({ rounds }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="full width tabs example"
      >
        {rounds.map((obj, key) => {
          return <Tab label={obj.name} {...a11yProps(key)} key={obj.name} />;
        })}
        {/* <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} /> */}
      </Tabs>

      <SwipeableViews
        // axis="rtl"
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {rounds.map((obj, key) => {
          return (
            <TabPanel value={value} index={key} key={key}>
              <RoundGames id={rounds[value].id} />
            </TabPanel>
          );
        })}
        {/* <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>
    </>
  );
};

const DisplayTournament = () => {
  let id = useParams().id;
  let slug = useParams().slug;
  const [loading, setLoading] = useState(true);
  const [currentTour, setCurrentTour] = useState({});
  const [round, setRound] = useState(0);
  const getCurrentTournament = async () => {
    if (isCalled) {
      return;
    }
    isCalled = true;
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
  return (
    <Fragment>
      <Typography variant="h4" gutterBottom>
        {currentTour.tour.name}
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={2}>
        <RoundTabs rounds={currentTour.rounds} />
      </Grid>

      <RoundGames id={currentTour.rounds[round].id} />
    </Fragment>
  );
};

export default DisplayTournament;
