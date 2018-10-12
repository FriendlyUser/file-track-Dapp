import React, { Component } from 'react'
import { Route } from 'react-router'
import HomeContainer from './layouts/home/HomeContainer'
import NavContainer from './components/NavContainer'

import 'bulma/css/bulma.css'

import FileTable from './components/FileTable'
//import './App.css'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <NavContainer />
        <Route exact path="/" component={HomeContainer}/>
      </div>
    );
  }
}

export default App
