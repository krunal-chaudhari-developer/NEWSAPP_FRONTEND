import React from "react";
import Navbar from "./Navbar";

const Layout = (props) => {
  const { search, setSearch, handleSearch } = props;
  return (
    <div>
      <Navbar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default Layout;
