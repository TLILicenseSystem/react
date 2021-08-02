import React, { useState } from "react";
import "./App.css";

const App = () => {
  const lists = [
    {
      name: {
        first: "Alexandre",
        last: "Sanchez",
      },
      gender: "male",
      age: 31,
    },
    {
      name: {
        first: "Layla",
        last: "Anderson",
      },
      gender: "female",
      age: 42,
    },
    {
      name: {
        first: "Elisabeth",
        last: "Stensrud",
      },
      gender: "female",
      age: 43,
    },
    {
      name: {
        first: "Robin",
        last: "Lindelauf",
      },
      gender: "female",
      age: 57,
    },
    {
      name: {
        first: "Isaac",
        last: "Robinson",
      },
      gender: "male",
      age: 61,
    },
  ];

  const filterLists = lists.filter(({age}) => age > 50);

  return (
    <div>
      <h1>List Example</h1>
      {filterLists.map(({gender, age, name: {first, last}}, index) => {
        return (
          <div key={index}>
            <h2>{`Khun ${first} ${last}`}</h2>
            <p>{gender}</p>
            <p>{age}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
