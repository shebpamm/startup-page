import React, { Component, useState } from "react";
import axios from "axios";

export const UnsplashContext = React.createContext()


export function UnsplashProvider({ children }) {
  const [unsplashData, setUnsplashData] = React.useState();

  React.useEffect(() => {
    const accessKey = import.meta.env.VITE_ACCESS_KEY;
    //const category = 'chicago';//process.env.REACT_APP_UNSPLASH_PHOTO_CATEGORY;
    var categoryArray = ['frog', 'glacier', 'minimal', 'ocean', 'sea', 'forest',]
    var categoryIndex = Math.floor(Math.random() * categoryArray.length);
    var category = categoryArray[categoryIndex];

    // override category
    category = 'minimal'

    // https://unsplash.com/documentation#get-a-random-photo
    axios.get("https://api.unsplash.com//search/photos?random", {
      params: {
        query: category,
        per_page: 100,
      },
      headers: {
        Authorization: "Client-ID " + accessKey,
      },
    })
      .then(res => {

        // console.log(res);

        setUnsplashData(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <UnsplashContext.Provider value={unsplashData}>
      {children}
    </UnsplashContext.Provider>
  );
};

export const Unsplash = () => {
  const unsplashData = React.useContext(UnsplashContext);
  if(!unsplashData) return null
  console.log(unsplashData);

  var totalFound = unsplashData.data.results.length;
  var randNum = Math.floor(Math.random() * totalFound)
  var small = unsplashData.data.results[randNum].urls.small;

  return (
    <div className="select-none	relative rounded-xl overflow-hidden h-full bg-center bg-no-repeat border-0 dark:border-4 dark:border-pale">
      <img className="object-cover min-w-full min-h-full" src={small} />
    </div>
  );
};
