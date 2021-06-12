import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Posts from '../Posts/Posts';
import NewPost from '../../components/NewPost/NewPost';

import './Blog.css';

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul> 
                            <li><NavLink exact to = '/' activeClassName = 'active' activeStyle = {{textDecoration: 'underline'}} >Posts</NavLink></li>
                            <li><NavLink exact to = {{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }} >New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path = '/posts' component = {Posts}/>
                    <Route path = '/new-post' component = {NewPost} exact/>
                    <Redirect from = '/' to = '/posts'/>
                </Switch>


            </div>
        );
    }
}

export default Blog;