import React, { Component } from 'react';
import './App.css'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green500,white} from 'material-ui/styles/colors'
import {Route} from 'react-router-dom'

import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import PostPage from './components/PostPage'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import {Link} from 'react-router-dom'



class App extends Component {
  render() {
  console.log(this.props)
    return (
      <MuiThemeProvider>
          <div>
              <AppBar
                  title={<Link to="/" style={{color:white}}>Readable</Link>}
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                  style={{background:green500}}
              />
                <Route
                    exact path="/"
                    component={Home}
                />
                <Route
                    exact path="/:category/posts"
                    component={CategoryPage}
                />
                <Route
                    exact path="/:category/posts/:post_id"
                    component={PostPage}
                />
          </div>
      </MuiThemeProvider>
    );
  }
}


export default (App);
