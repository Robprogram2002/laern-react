import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  /*
  useEffect(() => {
    fetch("https://nice-column-276514.firebaseio.com/ingredients.json")
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

        setIngredients(loadedIngredients);
      });
  }, []);
  */
  
  const addIngredient = (ing) => {
    setLoading(true);
    fetch("https://nice-column-276514.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ing),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json().then((resData) => {
        setLoading(false);
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: resData.name, ...ing },
        ]);
      });
    });
  };

  const removeIngredient = (ingId) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((elem) => elem.id !== ingId)
    );
  };

  const filteredIngredients = useCallback((filtersIngs) => {
    setIngredients(filtersIngs);
  }, []);

  return (
    <div className="App">
      <IngredientForm addHandler={addIngredient} loading = {loading} />

      <section>
        <Search loadedIngs={filteredIngredients} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredient}
        />
      </section>
    </div>
  );
};

export default Ingredients;
