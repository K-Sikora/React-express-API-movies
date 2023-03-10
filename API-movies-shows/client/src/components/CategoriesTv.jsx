import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "./Navbar";
const CategoriesTv = () => {
  const [currentUrlCategory, setCurrentUrlCategory] = useState();

  const { category, page } = useParams();
  const navigate = useNavigate();

  const prevPage = () => {
    if (parseInt(page) === 1) {
      null;
    } else {
      navigate(`/tv/category/${category}/${parseInt(page) - 1}`);
      window.location.reload();
    }
  };
  const nextPage = () => {
    navigate(`/tv/category/${category}/${parseInt(page) + 1}`);
    window.location.reload();
  };

  const getGenres = async () => {
    const response = await axios.get("http://localhost:8080/api/tvgenres");
    console.log(response.data);
    response.data.genres.map((item) => {
      item.name === category ? setCurrentUrlCategory(item.id) : null;
    });
    return response.data;
  };
  const { data: tvGenres } = useQuery({
    queryKey: "tvGenres",
    queryFn: getGenres,
    refetchOnWindowFocus: false,
  });
  const getCurrentTvCategory = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/tv/categories/${currentUrlCategory}/${page}`
    );
    console.log(response.data);
    return response.data;
  };

  const { data: currentTvCategory } = useQuery({
    queryKey: ["currentTvCategory"],
    queryFn: getCurrentTvCategory,
    refetchOnWindowFocus: false,
    enabled: !!currentUrlCategory,
  });
  return (
    <div className="bg-stone-800">
      <Navbar />
      <div className="  text-white ">
        <div className="relative py-20 md:py-24 lg:py-28 ">
          <h2 className="text-center absolute left-1/2 top-1/2 -translate-x-1/2 line-clamp  -translate-y-1/2 text-2xl font-medium capitalize z-30 ">
            {tvGenres &&
              tvGenres.genres.map((item) =>
                item.name === category ? <p>{item.name}</p> : null
              )}
          </h2>

          {currentTvCategory && (
            <img
              src={
                `https://image.tmdb.org/t/p/w1280` +
                currentTvCategory.results[0].backdrop_path
              }
              className="w-full h-full object-cover absolute top-0 left-0 z-10 "
            />
          )}

          <div className="w-full h-full bg-black/30 absolute top-0 left-0 z-20"></div>
        </div>

        <div className="flex flex-col max-w-5xl mx-auto min-h-screen pb-6">
          {currentTvCategory &&
            currentTvCategory.results.map((item) => (
              <div className="flex h-40 gap-4 relative bg-stone-900 shadow-xl shadow-stone-900/60 mx-6 mt-6 pr-2 rounded-md">
                <div className=" h-32 flex-shrink-0  ">
                  <Link to={`/tv/${item.id}`}>
                    <img
                      className=" h-40 w-28 object-cover rounded-l-md pointer-events-none "
                      src={`https://image.tmdb.org/t/p/w300` + item.poster_path}
                    />
                  </Link>
                </div>
                <div className="flex   justify-around flex-col h-full">
                  <div>
                    <Link to={`/tv/${item.id}`}>
                      <h4 className="text-base md:text-lg">{item.name}</h4>
                    </Link>

                    <p className="text-sm text-stone-400">
                      {item.first_air_date}
                    </p>
                  </div>
                  <p className="line-clamp text-stone-100 text-sm md:text-base">
                    {item.overview}{" "}
                  </p>
                </div>
                <div className="absolute left-1 bg-stone-900/80 rounded-full bottom-2">
                  <CircularProgressbar
                    styles={buildStyles({
                      textSize: "28px",
                      textColor: "white",
                      trailColor: "#065f46",
                      pathColor: `
              ${
                item.vote_average * 10 <= 30
                  ? `#ef4444`
                  : item.vote_average * 10 > 30 && item.vote_average * 10 <= 50
                  ? `#f97316`
                  : item.vote_average * 10 > 50 && item.vote_average * 10 <= 70
                  ? `#facc15`
                  : item.vote_average * 10 > 70 && item.vote_average * 10 <= 84
                  ? `#059669`
                  : `#10b981`
              }
              
              `,
                    })}
                    className="h-10 w-10 "
                    value={item.vote_average * 10}
                    text={`${item.vote_average.toFixed(1) * 10 + "%"}`}
                  ></CircularProgressbar>
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 justify-center py-4">
          <button
            onClick={() => prevPage()}
            className="py-2 px-3 bg-stone-600 hover:bg-emerald-700 duration-200 rounded-md flex justify-center items-center"
          >
            <FontAwesomeIcon
              className="text-sm"
              icon={faChevronLeft}
            ></FontAwesomeIcon>
          </button>
          <p>{page}</p>
          <button
            onClick={() => nextPage()}
            className="py-2 px-3 bg-stone-600 hover:bg-emerald-700 duration-200 rounded-md flex justify-center items-center"
          >
            <FontAwesomeIcon
              className="text-sm"
              icon={faChevronRight}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTv;
