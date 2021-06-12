import React, {useState} from "react";
import Loading from '../UI/LoadingIndicator';

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const [inputData, setInputData] = useState({
    title: "",
    amount: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    props.addHandler(inputData);
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputData.title} onChange = {
              event => {
                const newTitle = event.target.value;
                setInputData((prevInputData) => ({
                  title: newTitle,
                  amount: prevInputData.amount
                }
                ))
              }
            } />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value = {inputData.amount} onChange = {
              event => {
                const newIngredient = event.target.value;
                setInputData(prevInputData => (
                  {
                    title: prevInputData.title,
                    amount: newIngredient
                  }
                ))
              }
            } />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <Loading /> }
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
