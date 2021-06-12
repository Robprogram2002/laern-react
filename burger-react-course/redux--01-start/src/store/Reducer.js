const initialState = {
  counter: 0,
  results: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1,
      };
    case "ADD_COUNTER":
      return {
        ...state,
        counter: state.counter + action.value,
      };
    case "SUBS_COUNTER":
      return {
        ...state,
        counter: state.counter - action.value,
      };
    case "STORE_RESULT":
      return {
        ...state,
        results: state.results.concat({ value: state.counter, id: new Date() }),
      };
    case "DELETE_RESULT":
      const updatedArray = state.results.filter(
        (result) => result.id !== action.resultElementId
      );
      return {
        ...state,
        results: updatedArray,
      };
  }

  return state;
};

export default Reducer;
