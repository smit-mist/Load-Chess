import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessTV from "./pages/ChessTV";
import BroadCast from "./pages/broadcast/BroadCast";
import DisplayTournament from "./pages/broadcast/DisplayTournament";
import Test from "./helper/Test";
import GamePlay from "./components/chessboard/GamePlay";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import SignIn from "./pages/auth/SignIn";
import UserBasic from "./pages/auth/UserBasic";
import Home from "./pages/home/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#16213E",
    },
    secondary: {
      main: "#0F3460",
    },
    third: {
      main:"#533483"
    },
    error:{
      main:"#E94560"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<UserBasic />}>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/analysis" element={<GamePlay />} />
            <Route path="/tv" element={<ChessTV />} />
            <Route path="/news" element={<h1>This is News</h1>} />
            <Route path="/broadcast" element={<BroadCast />} />
            <Route
              path="/tournament/:slug/:id"
              element={<DisplayTournament />}
            />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<h1>No such route</h1>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
