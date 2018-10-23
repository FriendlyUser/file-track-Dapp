import React, { Component } from 'react'
import NavContainer from './components/NavContainer'
import 'bulma/css/bulma.css'

class App extends Component {
  
  render() {
    return (
      <div className="App">
      <NavContainer />
      {this.props.children}
      </div>
    );
  }
}

export default App
