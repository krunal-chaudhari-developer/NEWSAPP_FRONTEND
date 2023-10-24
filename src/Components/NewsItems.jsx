import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import blank from "../assets/blank.jfif";

const NewsItems = ({
  handleStarred,
  article,
  description,
  name,
  title,
  url,
  imageUrl,
}) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <div className="flex justify-between m-3 lg:m-6 bg-slate-100 rounded-lg w-[95%] h-96 lg:h-48">
        <Link to={url} target="_blank" rel="noreferrer" className="lg:flex">
          <div className="p-3 relative">
            <div className="w-56">
              <img
                src={imageUrl === null ? blank : imageUrl}
                alt="thumbnail"
                className=" shadow-2xl rounded-lg"
              />
            </div>

            <div className="absolute top-0 right-0 bg-red-950 px-2 rounded-md">
              <h1 className="text-white font-semibold">{name}</h1>
            </div>
          </div>

          <div className="p-3">
            <div className="">
              <h1 className="hover:underline text-xl font-bold">{title}</h1>
            </div>

            <div className="hidden lg:block">
              <h1 className="font-semibold">{description}</h1>
            </div>
          </div>
        </Link>

        <div ref={ref} className="pr-4 relative">
          <button onClick={() => setOpen(!open)} className="">
            <BsThreeDotsVertical size={25} className="mt-2.5" />
          </button>

          <div className="absolute top-7 -left-14 ">
            {open && (
              <button
                onClick={() => handleStarred(article)}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                className="bg-white px-6 py-2 rounded-xl shadow-lg hover:bg-slate-200 "
              >
                Starred
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsItems;
