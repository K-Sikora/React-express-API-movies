import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import axios from "axios";
import { motion, useCycle } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import TrailerPopup from "./TrailerPopup";
const date = new Date();

const LatestTrailers = () => {
  const getUpcomingMovies = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/movie/upcoming"
    );
    console.log(response.data.results);

    return response.data.results;
  };
  const [opacity, cycleOpacity] = useCycle(0, 1);

  const { data: upcomingMovies, isLoading } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
    refetchOnWindowFocus: false,
  });

  const [movieId, setMovieId] = useState();
  const [trailerVisible, setTrailerVisible] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-5 text-white">
      <h2 className=" text-2xl">New and upcoming movies</h2>
      <div className="relative">
        {isLoading && (
          <div className="flex gap-4 absolute top-1/2 left-1/2  items-center justify-center">
            <motion.div
              animate={{ opacity }}
              transition={{ duration: 0.15, delay: 0.1, ease: "easeIn" }}
              className="bg-emerald-500 w-6 h-6 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ opacity }}
              transition={{ duration: 0.15, delay: 0.2, ease: "easeIn" }}
              className="bg-emerald-500 w-6 h-6 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ opacity }}
              transition={{ duration: 0.15, delay: 0.3, ease: "easeIn" }}
              className="bg-emerald-500 w-6 h-6 rounded-full"
            ></motion.div>
          </div>
        )}
        <Swiper
          spaceBetween={5}
          slidesPerView={1}
          pagination={{ clickable: true }}
          grabCursor={true}
          breakpoints={{
            "@0.00": {
              slidesPerView: 3,
            },
            "@0.75": {
              slidesPerView: 4,
            },
            "@1.00": {
              slidesPerView: 5,
            },
            "@1.40": {
              slidesPerView: 6,
            },
            "@1.50": {
              slidesPerView: 7,
            },
          }}
          modules={[Pagination]}
          className="mySwiper upcoming h-[26rem] md:h-[24rem] py-6 lg:h-[24rem]  cursor-grab relative  "
        >
          {upcomingMovies &&
            upcomingMovies.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col relative justify-between p-1  "
              >
                <div className="relative top-0 left-0">
                  <img
                    className=" h-60 md:h-52 object-cover rounded-sm"
                    src={`https://image.tmdb.org/t/p/w300` + item.poster_path}
                  />

                  <div className="flex mt-2 absolute bottom-0 left-0 bg-stone-900/50 w-full text-sm font-medium  h-1/5 items-center">
                    {new Date(item.release_date) < date && (
                      <CircularProgressbar
                        styles={buildStyles({
                          textSize: "28px",
                          textColor: "white",
                          trailColor: "#065f46",
                          pathColor: `
                                ${
                                  item.vote_average * 10 <= 30
                                    ? `#ef4444`
                                    : item.vote_average * 10 > 30 &&
                                      item.vote_average * 10 <= 50
                                    ? `#f97316`
                                    : item.vote_average * 10 > 50 &&
                                      item.vote_average * 10 < 70
                                    ? `#facc15`
                                    : item.vote_average * 10 >= 70 &&
                                      item.vote_average * 10 <= 84
                                    ? `#059669`
                                    : `#10b981`
                                }
                                
                                `,
                        })}
                        className="h-10 w-10 bg-stone-800 rounded-full font-semibold "
                        value={item.vote_average * 10}
                        text={`${item.vote_average.toFixed(1) * 10 + "%"}`}
                      ></CircularProgressbar>
                    )}

                    {new Date(item.release_date) > date
                      ? `${item.release_date}`
                      : null}
                  </div>
                </div>
                <h3 className="pointer-events-none  text-sm line-clamp ">
                  {item.title}
                </h3>

                <div className="flex flex-col gap-2">
                  <a href={`/movie/${item.id}`}>
                    <button className="py-1 w-full px-1 bg-stone-700 hover:bg-stone-600 duration-300 rounded-md text-sm font-medium">
                      See details
                    </button>
                  </a>
                  <button
                    onClick={() => {
                      setMovieId(item.id);
                      setTrailerVisible(true);
                    }}
                    className="py-1 group flex items-center justify-center gap-1.5  px-1 bg-stone-800 rounded-md text-sm font-medium"
                  >
                    <FontAwesomeIcon
                      className="text-xs group-hover:text-emerald-500 duration-300 "
                      icon={faPlay}
                    ></FontAwesomeIcon>
                    Trailer
                  </button>
                </div>
              </SwiperSlide>
            ))}
          <div className="h-full w-10 from-stone-900/60 to-black/0 bg-gradient-to-r z-10 left-0 top-0 absolute pointer-events-none "></div>
          <div className="h-full w-10 from-stone-900/60 to-black/0 bg-gradient-to-l z-10 right-0 top-0 absolute pointer-events-none "></div>
        </Swiper>
      </div>
      {trailerVisible && (
        <TrailerPopup
          trailerVisible={trailerVisible}
          setTrailerVisible={setTrailerVisible}
          movieId={movieId}
        />
      )}
    </div>
  );
};

export default LatestTrailers;
