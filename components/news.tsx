import React from "react";
import { New } from "../pages";
import { Archive } from "../pages/archives/[year]";

function News(filterNew: New | Archive) {
  return (
    <>
      <li>
        <h2>{filterNew.localisation.city}</h2>
        <p>{filterNew.localisation.airline}</p>
        <p>{filterNew.localisation.airport}</p>
        <p>{filterNew.localisation.country}</p>
      </li>
    </>
  );
}

export default News;
