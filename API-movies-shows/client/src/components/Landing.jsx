import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import LandingSwiper from "./Landing/LandingSwiper";
import { useQuery } from "react-query";
const Landing = () => {
  const {
    data: trendingWeek,
    isLoading,
    isError,
  } = useQuery("trendingWeek", async () => {
    const response = await axios.get("http://localhost:8080/api/trending-week");
    return response.data.results;
  });

  return (
    <div className="h-screen relative max-w-6xl mx-auto mt-0 p-2 md:px-5 rounded-md ">
      <LandingSwiper trendingWeek={trendingWeek} />
    </div>
  );
};

export default Landing;
