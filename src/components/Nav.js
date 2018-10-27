import React from 'react'
import PropTypes from 'prop-types'

import { NETWORKS } from '../util/constants'

// Add colours in corresponding to the networks, guess it is like setting the class
const Nav = props => (
  <nav className='navbar is-light' aria-label='main navigation'>
    <div className='navbar-brand'>
      <a className='navbar-item' href='/'>
        <strong><i className='fas fa-coins' /> {props.appName}</strong>
      </a>
      <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarIPFS'>
        <span aria-hidden='true' />
        <span aria-hidden='true' />
        <span aria-hidden='true' />
      </a>
    </div>
    <div id='navbarIPFS' className='navbar-menu'>
      <div className='navbar-start'>
        <a className='navbar-item' href='/users/0xE2e379daF0E1237612ba870fA730c6B45e553563'>
          <strong><i className='fas fa-thumbs-up' /> Example Files</strong>
        </a>
        <a className='navbar-item' href='/search'>
          <strong><i className='fas fa-search' /> Search</strong>
        </a>
      </div>
      <div className='navbar-end'>
        <a className='navbar-item' href='https://github.com/FriendlyUser/file-track-Dapp'>
          <strong><i className='fab fa-github' /> Github</strong>
        </a>
        <a className='navbar-item' href='https://friendlyuser.github.io/file-track-Dapp/'>
          <strong><i className='fas fa-book' /> Docs</strong>
        </a>
        <a className='navbar-item'>
          <div className='tags has-addons'>
            <span className='tag'>
              <i className='fas fa-signal' /> &nbsp; Network
            </span>
            <span className='tag' style={{ backgroundColor: NETWORKS[props.networkId].color }}>
              <strong>{NETWORKS[props.networkId].name || 'UNKNOWN' } </strong>
            </span>
          </div>
        </a>
      </div>
    </div>
    {/**  shown on mobile
        <div class="navbar-menu is-active">
            <a className="navbar-item">
            <div className="tags has-addons">
                <span className="tag">
                    <i className="fas fa-signal"></i> &nbsp; Network
                </span>
                <span className="tag is-danger">{NETWORKS[props.networkId] || props.networkId }</span>
            </div>
            </a>
        </div>
        */}
  </nav>
)

Nav.propTypes = {
  appName: PropTypes.string,
  networkId: PropTypes.number
}
export default Nav
