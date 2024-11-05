import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import AddEventPage from "./pages/AddEventPage";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventPage />} />{" "}
        {/* Dynamic route for EventPage */}
        <Route path="/add-event" element={<AddEventPage />} />
      </Routes>
    </Router>
  );
};

export default App;
