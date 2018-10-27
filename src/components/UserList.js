import React, { Component } from 'react'
import { AccountData} from 'drizzle-react-components'
import ErrorBoundary from './ErrorBoundary'

class UserList extends Component {
  constructor(props, context) {
    super(props)
    console.log(this.props)
    this.drizzle = this.context.drizzle
    this.web3 = this.props.web3
    this.contracts = this.props.contracts
    this.Authentication = this.props.contracts.Authentication
    this.state = {
        allUsers: []
    }
  }
  // need to add redux react router
  componentDidMount() {
    let allUsers = []
    let currentUserKey;
    // Check that the contract is actually initialized
    if(this.drizzle.contracts.Authentication
        && this.props.contracts.Authentication
        && this.props.contracts.Authentication.initialized
    ){
        for (let i=0; i < 10; i++) {
            // Get dataKeys for cache access
            currentUserKey = this.drizzle.contracts.Authentication.methods.allUsers.cacheCall()
            // Check that the data is cached
            if(this.props.contracts.Authentication.allUsers[currentUserKey]
            ){
                allUsers.push(this.props.contracts.Authentication.allUsers[currentUserKey].value)
                console.log(allUsers)
            }
        }

        //console.log(rewards)
    }
    /**
    this.setState({
        allUsers: this.Authentication.allUsers
    })
    */
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
    return (
    <ErrorBoundary>
      <section className="section">
        <div className="container">
        { allUsers.length !== undefined &&
            allUsers.map(user => {
              <a href={"users/" + user}>{user}</a>
            })
        }
        </div>

      </section>
    </ErrorBoundary>
    )
  }
}

export default UserList
