import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Socket from "./pages/Socket";
import Poll from "./pages/Poll";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/socket" element={<Socket />} />
        <Route path="/poll" element={<Poll />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
