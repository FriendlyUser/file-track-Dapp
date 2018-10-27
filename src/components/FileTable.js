import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

import { IPFSURL } from '../util/constants'
import EthAddress from './EthAddress';

import ErrorBoundary from './ErrorBoundary'
// import IpfsTable from './IpfsTable'
// Use bulma loader
// import loader from '../../../images/Pacman-1s-200px.svg'

class FileTable extends Component {
    /**
     * 
     * @param {props} props the standard props object in react
     * @param {context} context the drizzle context object used to manage contract state
     */
    constructor(props, context) {
        super(props,context)
        this.drizzle = this.context.drizzle
        this.web3 = this.props.web3
        this.contracts = this.props.contracts
        this.fileListAddress = this.drizzle.contracts.FileList.methods
        this.fileArray = []
        this.state = {
            lastIds: 0,
            table: [],
            fileOwnerAddress: this.props.fileOwnerAddress
        }
    }
    componentDidMount() {
        // consider using cacheCall to store the actual table, so that it updates
        this.drizzle.contracts.FileList.methods.lastIds(this.state.fileOwnerAddress).call()
        .then((lastIds) => {
          this.setState({
             lastIds: lastIds
          });
        })
        var table = []
        // looks like an struct within an array can't be stored so easily
        // var tags = []
        // improve error handling when zero files are added
        this.drizzle.contracts.FileList.methods.lastIds(this.state.fileOwnerAddress).call()
        .then((lastIds) => {
            // eslint-disable-line no-loop-func
           for (let i = 0; i < lastIds; i++) {
             this.drizzle.contracts.FileList.methods.files(this.state.fileOwnerAddress,i).call()
             .then((fileItem) => {
               // add file item to table, missing tags
               fileItem.filename = this.drizzle.web3.utils.hexToUtf8(fileItem.filename)
               fileItem.timestamp = this.timeConverter(fileItem.timestamp)
               /** Can't return bytes from struct array, maybe split this into into another loop?. */
               this.drizzle.contracts.FileList.methods.getFileTags(this.state.fileOwnerAddress,i).call()
               .then((tags) => {
                  // console.log(tags)
                  // convert all non 0 bytes tag fields to hex
                  for (var j=0; j < 5; j++) {
                    if (tags[j] !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
                      // console.log(tags[j])
                      tags[j] = this.drizzle.web3.utils.hexToUtf8(tags[j])
                    } else {
                      // console.log(tags[j])
                      tags[j] = 'N/A'
                    }
                  }
                  fileItem.tags = tags
                  console.log(tags)
               })
               // console.log(fileItem)
               // add fileItem to table
               table.push(fileItem)
             });
           }
        })
        // consider modification all timestamps (now => unix timestamp)
        // also modify tags to shorter them to string
        // so have another function cleanup table and then set this.fileArray

        this.fileArray = table
        /**this.drizzle.contracts.FileList.methods.files(this.fileOwnerAddress,0).call()
        .then((fileItem) => {
          console.log(fileItem)
          return fileItem
        })
        */
    }
    timeConverter(unixTimeStamp) {
        var a = new Date(unixTimeStamp * 1000)
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var year = a.getFullYear()
        var month = months[a.getMonth()]
        var date = a.getDate()
        var hour = a.getHours()
        var min = a.getMinutes()
        var sec = a.getSeconds()
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
        return time
    }
    /**
     * Get number of file for particular user by calling lastids 
     * If 0 exit 
     * If greater than 0 
     * use a loop to get all the files that exist by making multiple web3 calls 
     * Also get tags in parallel.
     */
     /**
    loadTableData() {
      const tableData = []
      const megaTest = this.drizzle.contracts.FileList.methods.lastIds(this.fileOwnerAddress).call()
        .then((lastIds) => {
          
          }
        })
      console.log(megaTest)
      return megaTest
    }
    */
    loadTableRow(index) {
         this.drizzle.contracts.FileList.methods.files(this.state.fileOwnerAddress,0).call()
        .then((fileItem) => {
          return fileItem
        })
    }

    render() {
        // See https://menubar.io/reactjs-tables
        return(
            <div className ="container">
            <ErrorBoundary>
            <h2> Files Table </h2>
              <table className ="table">
                <thead>
                  <tr>
                  <th><i className="fas fa-file"></i> FileName</th>
                  <th><i className="fas fa-user"></i> Owner Eth Address</th>
                  <th><abbr title="Unique Identifier on the interplanetery file system"> <i className="fas fa-hashtag"></i> Ipfs Hash </abbr> </th>
                  <th><abbr title="Unix Timestamp"> <i className="fas fa-clock"></i>  TimeStamp</abbr></th>
                  <th><i className="fas fa-tag"></i> Tags</th>
                  </tr>
                </thead>
                <tbody>
                {this.fileArray !== undefined &&
                 this.fileArray.map(ipfsRow =>
                    <tr>
                    <td key={ipfsRow.filename}>{ipfsRow.filename}</td>
                    <td>
                        <EthAddress
                            address = {ipfsRow.owner}
                            visibleCharacters={12}
                            networkId = {this.props.web3.networkId === undefined ? 1 : this.props.web3.networkId}
                            etherscan
                        />
                        
                    </td>
                    <td><a href={IPFSURL+ipfsRow.ipfshash} target="_blank">
                        View File </a>
                    </td>
                    <td>{ipfsRow.timestamp}</td>
                    {/** Return inputted Tags */
                     (ipfsRow.tags !== undefined && ipfsRow.tags.length > 3) &&
                        <td>
                        <div className="tags">
                          <span className="tag is-success">{ipfsRow.tags[0]}</span>
                          <span className="tag is-info">{ipfsRow.tags[1]}</span>
                          <span className="tag is-danger">{ipfsRow.tags[2]}</span>
                          <span className="tag is-link">{ipfsRow.tags[3]}</span>
                          <span className="tag is-primary">{ipfsRow.tags[4]}</span>
                        </div>
                        </td>
                    }
                    </tr>
                )}
                </tbody>
              </table>
            {/**
            <h3> Anime </h3>
            <table class="table">
              <thead>
                <tr>
                  <th><abbr title="Position">Pos</abbr></th>
                  <th>Team</th>
                  <th><abbr title="Played">Pld</abbr></th>
                  <th><abbr title="Won">W</abbr></th>
                  <th><abbr title="Drawn">D</abbr></th>
                  <th><abbr title="Lost">L</abbr></th>
                  <th><abbr title="Goals for">GF</abbr></th>
                  <th><abbr title="Goals against">GA</abbr></th>
                  <th><abbr title="Goal difference">GD</abbr></th>
                  <th><abbr title="Points">Pts</abbr></th>
                  <th>Qualification or relegation</th>
                </tr>
              </thead>
               <tfoot>
                <tr>
                  <th><abbr title="Position">Pos</abbr></th>
                  <th>Team</th>
                  <th><abbr title="Played">Pld</abbr></th>
                  <th><abbr title="Won">W</abbr></th>
                  <th><abbr title="Drawn">D</abbr></th>
                  <th><abbr title="Lost">L</abbr></th>
                  <th><abbr title="Goals for">GF</abbr></th>
                  <th><abbr title="Goals against">GA</abbr></th>
                  <th><abbr title="Goal difference">GD</abbr></th>
                  <th><abbr title="Points">Pts</abbr></th>
                  <th>Qualification or relegation</th>
                </tr>
              </tfoot>
                <tbody>
                { 
                    <tr>
                        <td>COol</td>
                        <td>Test</td>
                        <td><abbr title="Played">Pld</abbr></td>
                        <td><abbr title="Won">W</abbr></td>
                        <td><abbr title="Drawn">D</abbr></td>
                        <td><abbr title="Lost">L</abbr></td>
                        <td><abbr title="Goals for">GF</abbr></td>
                        <td><abbr title="Goals against">GA</abbr></td>
                        <td><abbr title="Goal difference">GD</abbr></td>
                        <td><abbr title="Points">Pts</abbr></td>
                        <td>Qualification or relegation</td>
                    </tr>
                }
                </tbody>
             </table>
            */}
            </ErrorBoundary>
            </div>  
                
        )
    }
}

FileTable.contextTypes = {
    drizzle: PropTypes.object
}

FileTable.propTypes = {
    fileOwnerAddress: PropTypes.string
}

// Container model makes web3 not load properly.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts,
    drizzleStatus: state.drizzleStatus,
    FileList: state.contracts.FileList,
    web3: state.web3
  }
}

export default drizzleConnect(FileTable, mapStateToProps);
