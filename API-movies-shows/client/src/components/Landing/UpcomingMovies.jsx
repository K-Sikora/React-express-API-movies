import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
const date = new Date();
const LatestTrailers = (props) => {
  return (
    <div className="max-w-6xl mx-auto px-5 text-white">
      <h2 className=" text-2xl mb-8">New and upcoming movies</h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            "@0.00": {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            "@1.10": {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="mySwiper h-[22rem] md:h-[20rem] lg:h-[21rem]"
        >
          {props.upcomingMovies &&
            props.upcomingMovies.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col relative justify-between  "
              >
                <div className="relative top-0 left-0">
                  <img
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
                <div className="h-15 flex items-center">
                  <h3 className="pointer-events-none text-sm line-clamp ">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="py-1 px-3 bg-stone-700 hover:bg-stone-600 duration-300 rounded-md text-sm font-medium">
                    See details
                  </button>
                  <button className="py-1 group flex items-center justify-center gap-1.5  px-3 bg-stone-800 rounded-md text-sm font-medium">
                    <FontAwesomeIcon
                      className="text-xs group-hover:text-emerald-500 duration-300 "
                      icon={faPlay}
                    ></FontAwesomeIcon>
                    Trailer
                  </button>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestTrailers;
