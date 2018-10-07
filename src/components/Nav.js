import React from 'react'
import PropTypes from 'prop-types'

import { NETWORKS } from '../util/constants'

// Add colours in corresponding to the networks, guess it is like setting the class
const Nav = props => (
    <nav className="navbar is-link"  aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
                <strong><i className="fas fa-coins"></i> {props.appName}</strong>
            </a>
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div className="navbar-menu">
            <div className="navbar-end">
               <a className="navbar-item" href="https://github.com/FriendlyUser/file-track-Dapp">
                 <strong>Github</strong>
               </a>
               <a className="navbar-item" href="https://friendlyuser.github.io/file-track-Dapp/">
                 <strong>Docs</strong>
               </a>
                <a className="navbar-item">
                    <div className="tags has-addons">
                        <span className="tag">
                            <i className="fas fa-signal"></i> &nbsp; Network
                        </span>
                        <span className="tag is-danger">{NETWORKS[props.networkId] || props.networkId }</span>
                    </div>
                </a>
            </div>
        </div>
    </nav>
)

Nav.propTypes = {
    appName: PropTypes.string,
    networkId: PropTypes.number,
}
export default Nav;
