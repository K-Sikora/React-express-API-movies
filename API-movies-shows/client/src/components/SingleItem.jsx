import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import Similar from "./SingleItem/Similar";
import Keywords from "./SingleItem/Keywords";
import ItemInfo from "./SingleItem/ItemInfo";
import ItemCoverImage from "./SingleItem/ItemCoverImage";
import axios from "axios";
import ItemDetails from "./SingleItem/ItemDetails";

const SingleItem = () => {
  const { itemType, id } = useParams();
  const [itemData, setItemData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState({});
  const [episodesVisible, setEpisodesVisible] = useState(false);
  const [similar, setSimilar] = useState();
  const [isVisibleKeywords, setIsVisibleKeywords] = useState(false);

  //Get current item  data
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/${itemType}/${id}`)
      .then((response) => {
        console.log(response.data);
        setItemData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [itemType, id]);

  //Get keywords of current item
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/${itemType}/keywords/${id}`)
      .then((response) => {
        console.log(response.data);
        setKeyword(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [itemType, id]);

  //Get similar movie/show to current item
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/${itemType}/similar/${id}`)
      .then((response) => {
        console.log(response.data);
        setSimilar(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [itemType, id]);

  if (isLoading) {
    return <NotFound />;
  }

  return (
    <div className="bg-stone-800 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        {itemData && (
          <div className="min-h-screen gap-6 bg-stone-800 flex flex-col   py-5 px-0 justify-start">
            <ItemInfo
              episodesVisible={episodesVisible}
              setEpisodesVisible={setEpisodesVisible}
              itemData={itemData}
            />
            <ItemCoverImage itemData={itemData} />
            <ItemDetails
              itemData={itemData}
              keyword={keyword}
              setIsVisibleKeywords={setIsVisibleKeywords}
              isVisibleKeywords={isVisibleKeywords}
            />

            <Keywords
              isVisibleKeywords={isVisibleKeywords}
              keyword={keyword}
              itemData={itemData}
            />
            <Similar
              similar={similar}
              itemType={itemType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
