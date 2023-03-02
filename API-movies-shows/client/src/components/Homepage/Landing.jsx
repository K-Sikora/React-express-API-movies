import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import LandingSwiper from "./LandingSwiper";
import NotFound from "../NotFound";
import TrailerPopup from "./TrailerPopup";
import { useQuery } from "react-query";
import UpcomingMovies from "./UpcomingMovies";
const Landing = () => {
  const getTrendingWeek = async () => {
    const response = await axios.get("http://localhost:8080/api/trending-week");
    return response.data.results;
  };

  const { data: trendingWeek } = useQuery({
    queryKey: ["trendingWeek"],
    queryFn: getTrendingWeek,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="pb-20">
      <div className="h-screen relative max-w-6xl mx-auto mt-0 p-2 md:px-5 rounded-md ">
        <LandingSwiper trendingWeek={trendingWeek} />
      </div>
    </div>
  );
};

export default Landing;
