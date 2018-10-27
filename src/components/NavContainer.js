import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'

import Nav from './Nav'

import '@fortawesome/fontawesome-free/css/all.css'
class NavContainer extends Component {
  render () {
    return (
      <Nav
        appName='IpfsDapp'
        networkId={this.props.web3.networkId}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3
  }
}

export default drizzleConnect(NavContainer, mapStateToProps)
