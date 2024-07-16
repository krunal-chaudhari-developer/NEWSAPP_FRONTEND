import React from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { category } from "./data";

const Navbar = ({ search, setSearch, handleSearch }) => {
  const { starred } = useParams();

  return (
    <>
      <div className="bg-slate-200 w-full py-3 px-10 md:flex justify-between">
        <div className="">
          <h1 className="font-bold text-xl text-slate-700">NewMonkey</h1>
        </div>

        <div className="grid grid-cols-2 my-2 sm:my-0 lg:flex lg:space-x-3">
          {category.map((e) => (
            <Link to={`/${e.name}`} key={e.id} className="">
              <h1 className="capitalize font-semibold">{e.name}</h1>
            </Link>
          ))}
        </div>

        {starred === "starred" ? (
          ""
        ) : (
          <div className="lg:flex justify-center">
            <h1 className="px-2 font-bold hidden md:block">Search : </h1>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="lg:w-60 rounded-l-md outline-none py-0.5 px-1 text-sm "
            />
            <button
              onClick={handleSearch}
              className="py-1 px-2 md:px-2 rounded-r-md bg-black"
            >
              <BsSearch className="text-white" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
