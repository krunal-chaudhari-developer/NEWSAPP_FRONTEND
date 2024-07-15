import axios from "axios";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [news, setNews] = useState([]);

  // en-us&US for english
  // hi-in&IN for hindi

  useEffect(() => {
    axios
      .get(
        `https://newsapi90.p.rapidapi.com/topic?topicId=CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB&language=hi-in&region=IN`,
        {
          headers: {
            "x-rapidapi-key":
              "266c055e70mshfb9e1ec5a11bd66p1a5218jsn4884c920ca18",
            "x-rapidapi-host": "newsapi90.p.rapidapi.com",
          },
        }
      )
      .then((res) => {
        setNews(res.data);
      });
  }, []);

  console.log(news);
  return (
    <>
      <div className="">
        <div className="">
          <h1 className="">NewsMonkey</h1>
        </div>

        <div className="">
          <input
            type="text"
            // onChange={(e) => setSearch(e.target)}
            className=""
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
