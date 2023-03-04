import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
const Categories = () => {
  const { category } = useParams();
  return (
    <div className="bg-stone-800">
      <Navbar />
      <div className="  text-white ">
        <div className="relative py-20 md:py-24 lg:py-28 ">
          <h2 className="text-center absolute left-1/2 top-1/2 -translate-x-1/2 line-clamp  -translate-y-1/2 text-2xl font-medium capitalize z-30 ">
            {category}
          </h2>
          <img
            src="https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="background image"
            className="w-full h-full object-cover absolute top-0 left-0 z-10 "
          />
          <div className="w-full h-full bg-black/30 absolute top-0 left-0 z-20"></div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex h-40 gap-4 bg-stone-600 mx-6 mt-8 pr-2 rounded-lg">
            <div className=" h-32 ">
              <img
                className=" h-40 w-32 object-cover rounded-l-lg"
                src="https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
            </div>
            <div className="flex  justify-around flex-col h-full">
              <div>
                <h4>Mężczyzna imieniem Otto</h4>
                <p>28 grudnia 2022</p>
              </div>
              <p>Reżyser takich filmów jak „Chłopiec z latawcem”;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
