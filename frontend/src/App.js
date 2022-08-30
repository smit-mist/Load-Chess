import Analysis from "./pages/Analysis";
import ResponsiveAppBar from "./components/common/ResponsiveAppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChessTV from "./pages/ChessTV";
import BroadCast from "./pages/broadcast/BroadCast";
import DisplayTournament from "./pages/broadcast/DisplayTournament";
import Test from "./helper/Test";


function App() {
  return (
    <div>
      <Router>
        <ResponsiveAppBar
          pages={["Home", "Analysis", "TV", "News", "Broadcast"]}
          link={["/", "/analysis", "/tv", "/news", "/broadcast"]}
          color="primary"
        />

        <Routes>
          <Route path="/" element={<h1>This is home</h1>} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/tv" element={<ChessTV />} />
          <Route path="/news" element={<h1>This is News</h1>} />
          <Route path="/broadcast" element={<BroadCast />} />
          <Route path="/tournament/:slug/:id" element={<DisplayTournament />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<h1>No such route</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
