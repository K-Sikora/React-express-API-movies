import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "./Navbar";
const Categories = () => {
  const { category, page } = useParams();
  const navigate = useNavigate();
  const getCurrentCategory = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/categories/${category}/${page}`
    );
    console.log(response.data);
    return response.data;
  };

  const { data: currentCategory } = useQuery({
    queryKey: ["currentCategory"],
    queryFn: getCurrentCategory,
    refetchOnWindowFocus: false,
  });

  const prevPage = () => {
    if (parseInt(page) === 1) {
      null;
    } else {
      navigate(`/category/${category}/${parseInt(page) - 1}`);
      window.location.reload();
    }
  };
  const nextPage = () => {
    navigate(`/category/${category}/${parseInt(page) + 1}`);
    window.location.reload();
  };
  return (
    <div className="bg-stone-800">
      <Navbar />
      <div className="  text-white ">
        <div className="relative py-20 md:py-24 lg:py-28 ">
          <h2 className="text-center absolute left-1/2 top-1/2 -translate-x-1/2 line-clamp  -translate-y-1/2 text-2xl font-medium capitalize z-30 ">
            {category}
          </h2>

          {currentCategory && (
            <img
              src={
                `https://image.tmdb.org/t/p/w1280` +
                currentCategory.results[0].backdrop_path
              }
              className="w-full h-full object-cover absolute top-0 left-0 z-10 "
            />
          )}

          <div className="w-full h-full bg-black/30 absolute top-0 left-0 z-20"></div>
        </div>
        <div className="flex flex-col max-w-5xl mx-auto min-h-screen pb-6">
          {currentCategory &&
            currentCategory.results.map((item) => (
              <div className="flex h-40  gap-4 bg-stone-900 shadow-xl shadow-stone-900/60 mx-6 mt-6 pr-2 rounded-md">
                <div className=" h-32 flex-shrink-0  ">
                  <img
                    className=" h-40 w-28 object-cover rounded-l-md pointer-events-none "
                    src={`https://image.tmdb.org/t/p/w300` + item.poster_path}
                  />
                </div>
                <div className="flex   justify-around flex-col h-full">
                  <div>
                    <h4 className="text-base md:text-lg">{item.title}</h4>
                    <p className="text-sm text-stone-400">
                      {item.release_date}
                    </p>
                  </div>
                  <p className="line-clamp text-stone-100 text-sm md:text-base">
                    {item.overview}{" "}
                  </p>
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

export default Categories;
