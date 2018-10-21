import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Use bulma loader
// import loader from '../../../images/Pacman-1s-200px.svg'

class LoginForm extends Component {
    /**
     * 
     * @param {props} props the standard props object in react
     * @param {context} context the drizzle context object used to manage contract state
     */
    constructor(props, context) {
        super(props)
        this.drizzle = context.drizzle
        this.account = this.props.accounts[0]
        this.contracts = this.props.contracts
        this.handleChange = this.handleChange.bind(this);
        this.state = {
             username: '',
             isRegistered: false
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        // Convert filename to bytes32
        const usernameHex = this.drizzle.web3.utils.utf8ToHex(this.state.username)
        this.drizzle.contracts.Authentication.methods.signup(usernameHex).send({
            from: this.account
        })
        .on('transactionHash', transactionHash => { 
            //console.log('Transaction HASH: ' + transactionHash)
            //this.setState({imageUploading: false });
            //this.setState({txMSG: 'IPFS-SM'})
            //this.setState({transactionHash: transactionHash})
        })
        .on('receipt', receipt => {
            //console.log(receipt) // contains the new contract address
            //this.setState({txMSG: 'COMPLETE'})
        })
        .on('confirmation', (confirmationNumber, receipt) => { 
            //this.setState({imageUploading: false });
            //this.setState{((transactionHash: transactionHash))}
            console.log(confirmationNumber)
            console.log(receipt)
        })
        .on('error', error => { 
            console.log('Error has Occured: ' + error)
            //this.setState({txMSG: 'ERROR'})
        })
    }
    
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value});
    } 
    
    render() {

        let user   = ''
        // Check that the contract is actually initialized
        if(this.drizzle.contracts.Authentication 
            && this.props.contracts.Authentication.initialized
        ){
            const userKey = this.drizzle.contracts.Authentication.methods.login.cacheCall()
            // Check that the data is cached
            if(this.props.contracts.Authentication.login[userKey]
            ){
                user = this.drizzle.web3.utils.hexToUtf8(this.props.contracts.Authentication.login[userKey].value)
            }
        }
        return(
            <div class="container">
                {/*IPFS PAGE*/}
                { user === '' 
                ? 
                    <div>
                    <h3>Register</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="field">
                            <label className="label">Username</label>
                            <div className="control has-icons-left has-icons-right">
                            <input type="text" className="input is-info" placeholder="Enter desired username" name="username" 
                                onChange={this.handleChange}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-link" onClick= {this.onSubmit}>Submit</button>
                            </div>
                        </div> 
                    </form>
                    <hr/>  
                    </div>
                :
                    <div>
                    <h3>Logged In</h3>
                    <p>{user}</p>
                    </div>
                }
            </div>  
                
        )
    }
}

LoginForm.contextTypes = {
    drizzle: PropTypes.object
}

export default LoginForm