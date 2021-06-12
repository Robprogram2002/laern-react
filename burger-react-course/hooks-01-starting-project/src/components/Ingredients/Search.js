import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const [query, setQuery] = useState("");
  const { loadedIngs } = props;
  const inputRef = useRef();

  useEffect(() => {
    console.log(query);
    const timer = setTimeout(() => {
      if (query === inputRef.current.value) {
        const params =
          query.length === 0 ? "" : `?orderBy="title"&equalTo="${query}" `;
        console.log(params)
        fetch(
          "https://nice-column-276514.firebaseio.com/ingredients.json" + params
        )
          .then((response) => response.json())
          .then((resData) => {
            const loadedIngredients = [];
            for (const key in resData) {
              loadedIngredients.push({
                id: key,
                title: resData[key].title,
                amount: resData[key].amount,
              });
            }

            loadedIngs(loadedIngredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [query, loadedIngs, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
