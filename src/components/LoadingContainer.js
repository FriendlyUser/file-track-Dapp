import { drizzleConnect } from 'drizzle-react'
import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import '@fortawesome/fontawesome-free/css/all.css';

import metamask from '../metamask.png'
/*
 * Create component.
 */

class LoadingContainer extends Component {
  render() {
    if (this.props.web3.status === 'failed')
    {
      if (this.props.errorComp) {
        return this.props.errorComp
      }

      return(
        <main className="container loading-screen">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>
                  <span className="icon has-text-warning">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
              </h1>
              <p>This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
            </div>
          </div>
        </main>
      )
    }

    if (this.props.web3.status === 'initialized' && Object.keys(this.props.accounts).length === 0)
    {
      return(
        <main className="container loading-screen">
          <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src={metamask} alt="Metamask" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  <span class="icon has-text-danger">
                    <i class="fas fa-ban"></i>
                  </span>
                </p>
                <p class="subtitle is-6">We can't find any Ethereum accounts!</p>
              </div>
            </div>
            <div class="content">
              <strong> We can't find any Ethereum accounts! </strong> <p> Please check and make sure Metamask or your browser are pointed at the correct network and your account is unlocked. </p> <a>@bulmaio</a>. Please download an Ethereum Browser such as Metamask.
              {/** <a href="#">#css</a> <a href="#">#responsive</a> */}
              <br />
              <time datetime="2018-9-9">11:09 PM - 1 September 2018</time>
            </div>
          </div>
          <footer class="card-footer">
            <a href="https://metamask.io/" class="card-footer-item">
                  <span class="icon has-text-info">
                    <i class="fab fa-ethereum"></i>
                  </span>
                  Get MetaMask
            </a>
            <a href="https://github.com/FriendlyUser/file-track-Dapp" class="card-footer-item">
                  <span class="icon has-text-info">
                    <i class="fab fa-github"></i>
                  </span>
                  Github
            </a>
            <a href="https://friendlyuser.github.io/file-track-Dapp/" class="card-footer-item">
                  <span class="icon has-text-info">
                    <i class="fas fa-book"></i>
                  </span>
                  Read Docs
            </a>
          </footer>
        </div>
        </main>
      )
    }
    if (this.props.drizzleStatus.initialized)
    {
      return Children.only(this.props.children)
    }
    if (this.props.loadingComp) {
      return this.props.loadingComp
    }
    return(
      <main className="container loading-screen">
        <div className="pure-g">
          <div className="pure-u-1-1"> 
            <p><span className="icon has-text-info">
                <i className="fas fa-info-circle"></i>
              </span>
              Loading dapp...
            </p>
          </div>
        </div>
      </main>
    )
  }
}
LoadingContainer.contextTypes = {
  drizzle: PropTypes.object
}
/*
 * Export connected component.
 */
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3
  }
}
export default drizzleConnect(LoadingContainer, mapStateToProps)
