import React, { useEffect, useRef, useState } from "react";
import NewsItems from "./NewsItems";
import axios from "axios";
import Navbar from "./Navbar";
import {
  AiOutlineCaretDown,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { countries } from "./data";

const NewsPage = ({ category }) => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({
    name: "India",
    code: "in",
  });
  const [active, setActive] = useState(1);
  const newsPerPage = 8;

  const startIndex = (active - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;

  const currentItems = news.slice(startIndex, endIndex);

  const next = () => {
    if (active === Math.ceil(news.length / newsPerPage)) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.addEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=54230fe21c1e4227bab0c49038897dd3`
      )
      .then((res) => setNews(res.data.articles));
    setLoading(false);
  }, [category]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=54230fe21c1e4227bab0c49038897dd3`
      );
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  const handleCountry = (country) => {
    setLoading(true);
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country.code}&category=${category}&apiKey=54230fe21c1e4227bab0c49038897dd3`
      )
      .then((res) => setNews(res.data.articles));
    setCountry({ name: country.country, code: country.code });
    setOpen(!open);
    setLoading(false);
  };

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <div className={`${loading ? "hidden" : ""}`}>
        <div ref={ref} className="relative w-fit">
          <div className="flex space-x-3 my-2 mx-6 relative">
            <h1 className="font-bold my-0.5">Which Country's News You want?</h1>
            <button
              onClick={() => setOpen(!open)}
              className="flex bg-slate-100 hover:bg-slate-200 rounded-lg px-2"
            >
              <h1 className="">{country.name}</h1>
              <AiOutlineCaretDown size={20} className="my-1 mx-0.5" />
            </button>
          </div>
          <div className="absolute top-6 -right-32">
            {open && (
              <div
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 55 },
                }}
                className="bg-white shadow-lg h-56 overflow-auto "
              >
                {countries.map((e) => (
                  <div key={e.id} className="">
                    <button
                      onClick={() => handleCountry(e)}
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                      className="bg-white py-2 shadow-lg w-56 hover:bg-slate-200 "
                    >
                      {e.country}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-5">
          {currentItems.map((article, id) => (
            <div key={id} className="flex">
              <NewsItems
                description={article.description}
                name={article.source.name}
                title={article.title}
                url={article.url}
                imageUrl={article.urlToImage}
              />
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div role="status" className="flex justify-center my-10">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}

      <div className="flex justify-center space-x-6 mt-5 mb-10">
        <button
          disabled={active === 1 ? true : false}
          onClick={prev}
          className=""
        >
          <AiOutlineDoubleLeft size={25} />
        </button>
        <h1 className="font-semibold text-lg">
          Page {active} of {Math.ceil(news.length / newsPerPage)}
        </h1>
        <button
          disabled={
            active + 1 > Math.ceil(news.length / newsPerPage) ? true : false
          }
          onClick={next}
          className=""
        >
          <AiOutlineDoubleRight size={25} />
        </button>
      </div>
    </>
  );
};

export default NewsPage;
