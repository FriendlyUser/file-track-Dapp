import React, { Component } from 'react'
import { Route } from 'react-router'
import HomeContainer from './layouts/home/HomeContainer'
import NavContainer from './components/NavContainer'

import 'bulma/css/bulma.css'

import FileTableContainer from './components/FileTableContainer'
//import './App.css'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <NavContainer />
        <Route exact path="/" component={HomeContainer}/>
        <Route path="/ipfsFiles/:id" 
             render={({match}) => <FileTableContainer fileOwnerAddress={match.params.id}/>} />
      </div>
    );
  }
}

export default App
