import React, { Component } from 'react'
import ErrorBoundary from '../../components/ErrorBoundary'
import PropTypes from 'prop-types'

class Search extends Component {
  
  constructor(props, context) {
    super(props,context)
    this.drizzle = this.context.drizzle
    this.web3 = this.props.web3
    this.contracts = this.props.contracts
    this.fileArray = []
    this.state = {
        lastIds: 0,
        table: [],
        fileOwnerAddress: this.props.fileOwnerAddress
    } 
  }

  // need to add redux react router
  componentDidMount() {
    //console.log(this.drizzle)
    // don't need to add to store, just link to other FileTables.
    /**
    this.drizzle.contracts.Authentication.methods.allUsers().call()
    .then((allUsers) => {
      this.setState({
         allUsers: allUsers
      });
    })
    */
  }
  render() {
    // add to componentDidMount
    let allUsers = []
    let allUsersKey;
    // Check that the contract is actually initialized
    if(this.drizzle.contracts.Authentication
        && this.props.contracts.Authentication
        && this.props.contracts.Authentication.initialized
    ){
        for(let i=0; i < 10; i++) {
            // Get dataKeys for cache access
            allUsersKey = this.drizzle.contracts.Authentication.methods.allUsers.cacheCall(i)
            // Check that the data is cached
            if(this.props.contracts.Authentication.allUsers[allUsersKey]
            ){
                if(this.props.contracts.Authentication.allUsers[allUsersKey].value !== undefined) {
                    allUsers.push(this.props.contracts.Authentication.allUsers[allUsersKey].value)
                } else {
                    allUsers.push('N/A')
                }
            }
        }
        //console.log(rewards)
    }
    console.log(allUsers)
    const listItems = allUsers.map((number) =>
  <li>{number}</li>
    );

    return (
    <ErrorBoundary>
        <div className="container">
        <ul>{listItems}</ul>
        </div>
    </ErrorBoundary>
    )
  }
}

Search.contextTypes = {
    drizzle: PropTypes.object
}
export default Search
