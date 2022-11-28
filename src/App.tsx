import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Characters from "./pages/characters";
import Header from "./components/header";
import Home from "./pages/home";
import Comics from "./pages/comics";
import Creators from "./pages/creators";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/creators" element={<Creators />} />
      </Routes>
    </Router>
  );
}
