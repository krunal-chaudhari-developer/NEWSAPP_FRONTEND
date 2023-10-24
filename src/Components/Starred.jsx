import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import blank from "../assets/blank.jfif";
import { BsArrowLeft, BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import Layout from "./Layout";

const Starred = () => {
  const ref = useRef();
  const [starred, setStarred] = useState([]);
  const [openStates, setOpenStates] = useState({});

  const handleStarred = (article) => {
    setStarred((prevStarred) => {
      const updatedStarred = prevStarred.filter(
        (starredArticle) => starredArticle !== article
      );
      localStorage.setItem("starred_News", JSON.stringify(updatedStarred));
      return updatedStarred;
    });
    article !== null
      ? toast.success("Unstarred Successfully")
      : toast.error("Try Again");
  };

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("starred_News"));
    setStarred(res);
  }, []);

  return (
    <>
      <Layout />

      <div className="mx-6 my-5">
        <button onClick={() => window.history.back()} className="flex">
          <BsArrowLeft size={23} className="mt-1 mx-2" />
          <h1 className="text-lg font-bold">Back</h1>
        </button>
      </div>

      {starred.length === 0 ? (
        <div className="flex justify-center my-44 opacity-25">
          <h1 className="text-slate-400 text-6xl font-semibold">
            No Starred News...
          </h1>
        </div>
      ) : (
        starred.map((article, id) => (
          <div
            key={id}
            className="flex justify-between m-3 lg:m-6 bg-slate-100 rounded-lg w-[95%] h-96 lg:h-48"
          >
            <Link
              to={article.url}
              target="_blank"
              rel="noreferrer"
              className="lg:flex"
            >
              <div className="p-3 relative">
                <div className="w-56">
                  <img
                    src={
                      article.urlToImage === null ? blank : article.urlToImage
                    }
                    alt="thumbnail"
                    className=" shadow-2xl rounded-lg"
                  />
                </div>

                <div className="absolute top-0 right-0 bg-red-950 px-2 rounded-md">
                  <h1 className="text-white font-semibold">
                    {article.source.name}
                  </h1>
                </div>
              </div>

              <div className="p-3">
                <div className="">
                  <h1 className="hover:underline text-xl font-bold">
                    {article.title}
                  </h1>
                </div>

                <div className="hidden lg:block">
                  <h1 className="font-semibold">{article.content}</h1>
                </div>
              </div>
            </Link>

            <div ref={ref} className="pr-4 relative">
              <button
                onClick={() =>
                  setOpenStates((prevState) => ({
                    ...prevState,
                    [id]: !prevState[id],
                  }))
                }
                className=""
              >
                <BsThreeDotsVertical size={25} className="mt-2.5" />
              </button>

              <div className="absolute top-7 -left-14 ">
                {openStates[id] && (
                  <button
                    onClick={() => handleStarred(article)}
                    className="bg-white px-6 py-2 rounded-xl shadow-lg hover:bg-slate-200"
                  >
                    Unstarred
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Starred;
