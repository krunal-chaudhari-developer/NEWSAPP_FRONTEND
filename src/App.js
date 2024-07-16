import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewsPage from "./Components/NewsPage";
import Starred from "./Components/Starred";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NewsPage category="general" />} />
          <Route path="/business" element={<NewsPage category="business" />} />
          <Route
            path="/entertainment"
            element={<NewsPage category="entertainment" />}
          />
          <Route path="/health" element={<NewsPage category="health" />} />
          <Route path="/science" element={<NewsPage category="science" />} />
          <Route path="/sports" element={<NewsPage category="sports" />} />
          <Route
            path="/technology"
            element={<NewsPage category="technology" />}
          />
          <Route path="/:starred" element={<Starred />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
