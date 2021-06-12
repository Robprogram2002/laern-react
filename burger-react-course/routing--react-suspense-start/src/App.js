import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

//import Posts from ;
import User from "./containers/User";
import Welcome from "./containers/Welcome";

const Posts = React.lazy(() => {
  return import("./containers/Posts");
});

class App extends Component {
  
  state = {
    show:false
  }

  modeHandler = () => {
    this.setState(prevState => {
      return {show: !prevState.show} 
    })
  }
  
  render() {

    const render = (
      <Suspense fallback = {<div>Loading ...</div>} >
        <Posts />
      </Suspense>
    );

    return (

      <React.Fragment>
        <button onClick = {this.modeHandler} >
          Toggele Menu
        </button>
        {this.state.show ? render : <User />}
      </React.Fragment>

      //<BrowserRouter basename = '/my-app'>
      /*<BrowserRouter>
        <React.Fragment>
          <nav>
            <NavLink to="/user">User Page</NavLink> |&nbsp;
            <NavLink to="/posts">Posts Page</NavLink>
          </nav>
          <Route path="/" component={Welcome} exact />
          <Route path="/user" component={User} />
          <Route path="/posts" render = {() => (
            <Suspense fallback = {<div>Loading ...</div>} >
              <Posts />
            </Suspense>
          )} />
        </React.Fragment>
      </BrowserRouter> */
    );
  }
}

export default App;
