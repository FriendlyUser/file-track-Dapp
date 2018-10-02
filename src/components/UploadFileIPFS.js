import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import { drizzleConnect } from 'drizzle-react'
//import { ContractData } from 'drizzle-react-components'

import ipfs from '../util/ipfs'

// Use bulma loader
// import loader from '../../../images/Pacman-1s-200px.svg'

class UploadFileIPFS extends Component {
    /**
     * 
     * @param {props} props the standard props object in react
     * @param {context} context the drizzle context object used to manage contract state
     */
    constructor(props, context) {
        super(props)
        this.drizzle = context.drizzle
        this.account = this.props.accounts[0]
        this.handleChange = this.handleChange.bind(this);
        this.state = {
             ipfsHash: null,
             buffer:'',
             ethAddress:'',
             transactionHash:'',
             txReceipt: '',
             imageUploading: false,
             txMSG: '',
             tags: '',
             filename: ''
        }
    }
    
    /**
     * @summary IPFS stuff
     */
    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
      }
    //Convert the file to buffer to store on IPFS
    convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
            const buffer = await Buffer.from(reader.result);
        //set this buffer-using es6 syntax
            this.setState({buffer});
    }
    onSubmit = async (event) => {
        console.log(this.drizzle)
        event.preventDefault();
        //bring in user's metamask account address
        //const accounts = await web3.eth.getAccounts();
        //obtain contract address from storehash.js
        //const ethAddress= this.props.rewardAddress//await storehash.options.address;
        this.setState({imageUploading: true });
        this.setState({txMSG: 'IPFS-IMAGE'})
        //save document to IPFS,return its hash#, and set hash# to state
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            //console.log(err,ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash
            this.setState({ ipfsHash:ipfsHash[0].hash });
            // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
            //return the transaction hash from the ethereum contract
            this.setState({txMSG: 'METAMASK'})
            /** @todo send ipfs hash using drizzle
             *
             */
            const DumbShit = ["0x12","0x12","0x12","0x12","0x12"]
            // Convert filename to bytes32
            this.drizzle.contracts.FileList.methods.addFile(this.state.ipfsHash,"0x23",DumbShit).send({
                from: this.account
            })
            .on('transactionHash', transactionHash => { 
                //console.log('Transaction HASH: ' + transactionHash)
                //this.setState({imageUploading: false });
                this.setState({txMSG: 'IPFS-SM'})
                this.setState{((transactionHash: transactionHash))}
            })
            .on('receipt', receipt => {
                //console.log(receipt) // contains the new contract address
                this.setState({txMSG: 'COMPLETE'})
            })
            .on('confirmation', (confirmationNumber, receipt) => { 
                this.setState({imageUploading: false });
                //this.setState{((transactionHash: transactionHash))}
            })
            .on('error', error => { 
                //console.log('Error has Occured: ' + error)
                this.setState({txMSG: 'ERROR'})
            })
        })
    }
    
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    } 




    render() {
        console.log(this.props)
        return(
            <div class="container">
                {/*IPFS PAGE*/}
                <h3> Upload reward picture</h3>
                    <form onSubmit={this.onSubmit}>
                       <div className="field">
                          <label className="label">Filename</label>
                          <div className="control has-icons-left has-icons-right">
                            <input className="input is-success" type="text" placeholder="Enter name of file" name="filename" 
                                onChange={this.handleChange}
                            />
                            <span className="icon is-small is-left">
                              <i className="fas fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                              <i className="fas fa-check"></i>
                            </span>
                          </div>
                          <p className="help is-success">This name is available</p>
                        </div>
                        <div className="field">
                          <label className="label">Tags (Enter comma seperated string)</label>
                          <div className="control has-icons-left has-icons-right">
                            <input className="input is-danger" type="text" placeholder="Enter List of Tags" name="tags" 
                                onChange={this.handleChange}
                            />
                            <span className="icon is-small is-left">
                              <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                              <i className="fas fa-exclamation-triangle"></i>
                            </span>
                                <strong> {this.state.tags} </strong>
                          </div>
                          <p className="help is-success">This email is invalid</p>
                        </div>
                        <div className="file">
                          <label className="file-label">
                            <input className="file-input" type="file" name="resume" onChange = {this.captureFile} />
                            <span className="file-cta">
                              <span className="file-icon">
                                <i className="fas fa-upload"></i>
                              </span>
                              <span className="file-label">
                                Choose a file…
                              </span>
                            </span>
                          </label>
                        </div>
                        <div className="field is-grouped">
                          <div className="control">
                            <button className="button is-link" onClick= {this.onSubmit}>Submit</button>
                          </div>
                          <div className="control">
                            <button className="button is-text">Cancel</button>
                          </div>
                        </div>
                    </form>
                <hr/>
                { /**
                    this.state.imageUploading  &&
                        <figure style={{textAlign: 'center'}} >
                            <img src={loader} alt="loading image" />
                            <figcaption> 
                                {this.state.imageUploading && TXNMSGS[this.state.txMSG]}
                            </figcaption>
                        </figure>
                */}
                <table>
                    <thead>
                    <tr>
                        <th>Tx Receipt Category</th>
                        <th> </th>
                        <th>Values</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td classNameName="ethAddress">IPFS Hash stored on Ethereum</td>
                            <td> : </td>
                            <td classNameName="ethAddress">{this.state.ipfsHash}</td>
                        </tr>
                        <tr>
                            <td>Ethereum Contract Address</td>
                            <td> : </td>
                            <td classNameName="ethAddress">{this.state.ethAddress}</td>
                        </tr>
                        <tr>
                            <td classNameName="ethAddress">Tx # </td>
                            <td> : </td>
                            <td classNameName="ethAddress">{this.state.transactionHash}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

UploadFileIPFS.contextTypes = {
    drizzle: PropTypes.object
  }

UploadFileIPFS.propTypes = {
    rewardAddress: PropTypes.string
}

export default UploadFileIPFS