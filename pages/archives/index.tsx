import Link from "next/link";
import React from "react";
import { nanoid } from "nanoid";

const yearsOfArchive = ["2022", "2021", "2020", "2019", "2018"];

function Archives() {
  return (
    <div>
      <button key={nanoid()}>
        <Link href="/">Back to home</Link>
      </button>
      Archives
      {yearsOfArchive.map((year) => {
        return (
          <button key={nanoid()}>
            <Link href={`/archives/${year}`}>{year}</Link>
          </button>
        );
      })}
    </div>
  );
}

export default Archives;
