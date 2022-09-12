import ResponsiveAppBar from "./components/common/ResponsiveAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessTV from "./pages/ChessTV";
import BroadCast from "./pages/broadcast/BroadCast";
import DisplayTournament from "./pages/broadcast/DisplayTournament";
import Test from "./helper/Test";
import GamePlay from "./components/chessboard/GamePlay";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const darkTheme = createTheme({
  // primary:red,
  palette: {
    mode: "dark",
   
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <ResponsiveAppBar
          pages={["Home", "Analysis", "TV", "News", "Broadcast"]}
          link={["/", "/analysis", "/tv", "/news", "/broadcast"]}
          // color="primary"
        />

        <Routes>
          <Route path="/" element={<h1>This is home</h1>} />
          <Route path="/analysis" element={<GamePlay />} />
          <Route path="/tv" element={<ChessTV />} />
          <Route path="/news" element={<h1>This is News</h1>} />
          <Route path="/broadcast" element={<BroadCast />} />
          <Route path="/tournament/:slug/:id" element={<DisplayTournament />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<h1>No such route</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
