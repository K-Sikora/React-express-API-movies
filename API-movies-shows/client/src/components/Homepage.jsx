import React from "react";
import Landing from "./Homepage/Landing";
import Navbar from "./Navbar";
import UpcomingMovies from "./Homepage/UpcomingMovies";
const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Landing />
      <UpcomingMovies />
    </div>
  );
};

export default Homepage;
