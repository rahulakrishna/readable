import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {Route} from 'react-router-dom'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import PostPage from './components/PostPage'
import AppBar from './components/AppBar'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div>
                <AppBar/>
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

export default App
