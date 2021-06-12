import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import FullPost from '../../components/FullPost/FullPost';
import Post from "../../components/Post/Post";
import "./Posts.module.css";
import axios from "../../axios";

class Posts extends Component {
  state = {
    posts: [],
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Roberto Martinez Rivera",
          };
        });
        this.setState({ posts: updatedPosts });
        //console.log(response)
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  currentPostHandler = (id) => {
    this.props.history.push({ pathname: "/posts/" + id });
  };

  render() {
    let posts = null;

    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          //<Link to={"/" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.currentPostHandler(post.id)}
          />
          //</Link>
        );
      });
    } else {
      posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path= {this.props.match.url + '/:id'} component={FullPost} exact />
      </div>
    );
  }
}

export default Posts;
