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
        this.state = {
             ipfsHash: null,
             buffer:'',
             ethAddress:'',
             transactionHash:'',
             txReceipt: '',
             imageUploading: false,
             txMSG: ''
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
            this.drizzle.FileList.methods.setHash(this.state.ipfsHash).send({
                from: this.account
            })
            .on('transactionHash', transactionHash => { 
                //console.log('Transaction HASH: ' + transactionHash)
                //this.setState({imageUploading: false });
                this.setState({txMSG: 'IPFS-SM'})
            })
            .on('receipt', receipt => {
                //console.log(receipt) // contains the new contract address
                this.setState({txMSG: 'COMPLETE'})
            })
            .on('confirmation', (confirmationNumber, receipt) => { 
                this.setState({imageUploading: false });
            })
            .on('error', error => { 
                //console.log('Error has Occured: ' + error)
                this.setState({txMSG: 'ERROR'})
            })
        })
    }

    render() {
        //console.log(this.props)
        return(
            <div class="container">
                {/*IPFS PAGE*/}
                <h3> Upload reward picture</h3>
                    <form onSubmit={this.onSubmit}>
                        <input
                        type = "file"
                        onChange = {this.captureFile}
                        />
                        <button className="pure-button button-success"
                            type="submit">
                            Send
                        </button>
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