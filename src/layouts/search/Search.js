import React, { Component } from 'react'
import { AccountData} from 'drizzle-react-components'
import ErrorBoundary from '../../components/ErrorBoundary'

class Search extends Component {
  constructor(props, context) {
    super(props)
    console.log(this.props)
    this.web3 = this.props.web3
    this.contracts = this.props.contracts
    this.Authentication = this.props.contracts.Authentication
    this.state = {
        allUsers: []
    }
  }
  // need to add redux react router
  componentDidMount() {
    console.log(this.drizzle)
    this.setState({
        allUsers: this.Authentication.allUsers
    })
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
    let allUsers = this.Authentication.allUsers
    return (
    <ErrorBoundary>
      <section className="section">
        <div className="container">
        { allUsers.length !== undefined &&
            allUsers.map(user => {
              <a href={"users/" + user}></a>
            })
        }
        </div>

      </section>
    </ErrorBoundary>
    )
  }
}

export default Search
