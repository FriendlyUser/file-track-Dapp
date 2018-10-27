import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import EthAddress from './EthAddress.js';

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
        super(props, context)
        this.drizzle = context.drizzle
        this.account = this.props.accounts[0]
        this.handleChange = this.handleChange.bind(this);
        this.fileListAddress = this.drizzle.contracts.FileList.address
        this.state = {
             ipfsHash: null,
             buffer:'',
             ethAddress:'',
             transactionHash:'',
             txReceipt: '',
             imageUploading: false,
             txMSG: 'No Files Uploaded Yet',
             tags: '',
             filename: '',
             formErrors: {fileName: '', tags: ''},
             fileNameValid: false,
             tagsValid: false,
             formValid: false
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
        event.preventDefault();
        
        const inputtedTags = this.state.tags.split(',')
        const ipfsFileName = this.drizzle.web3.utils.utf8ToHex(this.state.filename)
        
        this.setState({imageUploading: true })
        this.setState({txMSG: 'Uploading Image to IPFS'})
        //save document to IPFS,return its hash#, and set hash# to state
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            //console.log(err,ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash
            this.setState({ ipfsHash:ipfsHash[0].hash });
            // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
            //return the transaction hash from the ethereum contract
            this.setState({txMSG: 'METAMASK'})
            
            // convert inputted tags to string
            let ipfsTags = ["0x00","0x00","0x00","0x00","0x00"]
            for (var i = 0; i < inputtedTags.length; i++)
                ipfsTags[i] = this.drizzle.web3.utils.utf8ToHex(inputtedTags[i]);
            
            // console.log(ipfsTags)
            // Convert filename to bytes32
            this.drizzle.contracts.FileList.methods.addFile(this.state.ipfsHash,ipfsFileName,ipfsTags).send({
                from: this.account
            })
            .on('transactionHash', transactionHash => { 
                //console.log('Transaction HASH: ' + transactionHash)
                //this.setState({imageUploading: false });
                this.setState({txMSG: 'Saving Hash to Smart Contract'})
                this.setState({transactionHash: transactionHash})
            })
            .on('receipt', receipt => {
                //console.log(receipt) // contains the new contract address
                this.setState({txMSG: 'Transation Complete'})
            })
            .on('confirmation', (confirmationNumber, receipt) => { 
                this.setState({txMSG: 'Please Reload'})
                this.setState({imageUploading: false });
                window.location.reload()
                //this.setState{((transactionHash: transactionHash))}
            })
            .on('error', error => { 
                //console.log('Error has Occured: ' + error)
                this.setState({txMSG: 'Transacation failed'})
            })
        })
    }
    
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value}, 
          () => { this.validateField(name, value) });
    } 
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fileNameValid = this.state.fileNameValid;
        let tagsValid = this.state.tagsValid;

        switch(fieldName) {
          case 'filename':
            fileNameValid = value.length >= 2;
            fieldValidationErrors.fileName = fileNameValid ? '' : ' is invalid';
            break;
          case 'tags':
            tagsValid = value.length >= 5;
            fieldValidationErrors.tags = tagsValid ? '': ' is invalid';
            break;
          default:
            break;
        }
       this.setState({formErrors: fieldValidationErrors,
                    fileNameValid: fileNameValid,
                    tagsValid: tagsValid
                  }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.fileValid && this.state.tagsValid});
    }
    
    tagsClassNames() {
      let names = "input";
      if (this.state.tagsValid) {
          names = "input is-success"
      } 
      else {
          names = "input is-danger"
      }

      return names;
    }
    
    fileClassNames() {
      let names = "input";
      if (this.state.fileNameValid) {
          names = "input is-success"
      } 
      else {
          names = "input is-danger"
      }

      return names;
    }
    render() {
        const fileClasses = this.fileClassNames()
        const tagClasses = this.tagsClassNames()
        return(
            <div class="container">
                {/*IPFS PAGE*/}
                <h3><i className="fab fa-ethereum">&nbsp;</i> Upload Document to IPFS &nbsp; 
                
                <span>
                <strong> Contract: </strong> &nbsp;
                <EthAddress 
                   address = {this.fileListAddress}
                   networkId = {this.props.web3.networkId}
                   etherscan
                />
                </span> 
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="field">
                        <label className="label">Filename</label>
                        <div className="control has-icons-left has-icons-right">
                        <input className={fileClasses} type="text" placeholder="Enter name of file" name="filename" 
                            onChange={this.handleChange}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                        </div>
                        {  this.state.fileNameValid === true
                            ?
                                <p className="help is-success">File name valid</p>
                            :
                                <p className="help is-danger">Enter a longer name</p> 
                        }
                    </div>
                    <div className="field">
                        <label className="label">Tags (Enter comma seperated string)</label>
                        <div className="control has-icons-left has-icons-right">
                        <input className={tagClasses} type="text" placeholder="Enter List of Tags" name="tags" 
                            onChange={this.handleChange}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-file"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                            <strong> {this.state.tags} </strong>
                        </div>
                        {  this.state.tagsValid === true
                            ?
                                <p className="help is-success">Tags are valid</p>
                            :
                                <p className="help is-danger">Proper commas and no spaces please.</p> 
                        }
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
                
                { this.state.imageUploading &&
                    <article class="message is-success">
                      <div class="message-header">
                        <p>{this.state.txMSG}</p>   
                      </div>
                      <div class="message-body">
                        <br />
                        <i className="fas fa-spinner fa-3x fa-pulse"></i>                
                      </div>
                    </article>
                }
                { (this.state.imageUploading || this.state.ipfsHash ) &&
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
                                <td className="ethAddress">IPFS Hash stored on Ethereum</td>
                                <td> : </td>
                                <td className="ethAddress">{this.state.ipfsHash}</td>
                            </tr>
                            <tr>
                                <td>Ethereum Contract Address</td>
                                <td> : </td>
                                <td className="ethAddress">{this.state.ethAddress}</td>
                            </tr>
                            <tr>
                                <td className="ethAddress">Tx # </td>
                                <td> : </td>
                                <td className="ethAddress">{this.state.transactionHash}</td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

UploadFileIPFS.contextTypes = {
    drizzle: PropTypes.object
 }


const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    FileList: state.contracts.FileList,
    web3: state.web3
  }
}

export default drizzleConnect(UploadFileIPFS, mapStateToProps);