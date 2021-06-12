import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  state = {
    counter: 0,
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState((prevState) => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState((prevState) => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState((prevState) => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState((prevState) => {
          return { counter: prevState.counter - value };
        });
        break;
    }
  };

  render() {
console.log(this.props.result_array);

    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={this.props.onAddFiveCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubstractFiveCounter}
        />
        <hr />
        <button onClick={this.props.onStoreResult}>Sotore Result !</button>
        <ul>
          {this.props.result_array.map((result) => (
            <li onClick={() => this.props.onDeleteStore(result.id)} key={result.id}>
              {" "}
              {result.value}{" "}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ctr: state.counter,
    result_array: state.results,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    onDecrementCounter: () => dispatch({ type: "DECREMENT" }),
    onAddFiveCounter: () => dispatch({ type: "ADD_COUNTER", value: 5 }),
    onSubstractFiveCounter: () => dispatch({ type: "SUBS_COUNTER", value: 5 }),
    onStoreResult: () => dispatch({ type: "STORE_RESULT" }),
    onDeleteStore: (result_id) => dispatch({ type: "DELETE_RESULT", resultElementId: result_id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
