import React, { Component } from 'react'

import ErrorBoundary from '../../components/ErrorBoundary'
class Dashboard extends Component {
  constructor (props, { authData }) {
    super(props)
    this.fileOwnerAddress = this.props.fileOwnerAddress
  }

  render () {
    return (
      <ErrorBoundary>
        <main className='container'>
          <div className='pure-g'>
            <div className='pure-u-1-1'>
              <h1>Dashboard</h1>
              <p><strong>Congratulations!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
            </div>
          </div>
        </main>
      </ErrorBoundary>
    )
  }
}

export default Dashboard
