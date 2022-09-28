import "./App.scss";
import UserRegistration from "./components/UserRegistration";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Poke from "./components/Poke";
import Review from "./components/Review";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div className="app-wrap">
      <Router>
        <Routes>
          <Route path="/" element={<UserRegistration />}>
            <Route index element={<UserDetails />} />
            <Route path="/poke" element={<Poke />} />
            <Route path="/review" element={<Review />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
