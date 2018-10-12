import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { IPFSURL } from '../util/constants'
//import IpfsTable from './IpfsTable'
// Use bulma loader
// import loader from '../../../images/Pacman-1s-200px.svg'

class FileTable extends Component {
    /**
     * 
     * @param {props} props the standard props object in react
     * @param {context} context the drizzle context object used to manage contract state
     */
    constructor(props, context) {
        super(props)
        this.drizzle = context.drizzle
        this.contracts = this.props.contracts
        this.fileArray = []
        this.state = {
            lastIds: 0,
            table: [],
            fileOwnerAddress: this.props.fileOwnerAddress
        }
    }
    componentDidMount() {
        this.drizzle.contracts.FileList.methods.lastIds(this.state.fileOwnerAddress).call()
        .then((lastIds) => {
          this.setState({
             lastIds: lastIds
          });
        })
        var table = []
        // looks like an struct within an array can't be stored so easily
        // var tags = []
        this.drizzle.contracts.FileList.methods.lastIds(this.state.fileOwnerAddress).call()
        .then((lastIds) => {
           for (var i = 0; i < lastIds; i++) {
             this.drizzle.contracts.FileList.methods.files(this.state.fileOwnerAddress,i).call()
             .then((fileItem) => {
               // add file item to table, missing tags
               fileItem.filename = this.drizzle.web3.utils.hexToUtf8(fileItem.filename)
               fileItem.timestamp = this.timeConverter(fileItem.timestamp)
               table.push(fileItem)
               /** Can't return bytes from struct array.
               this.drizzle.contracts.FileList.methods.getFileTags("0xE2e379daF0E1237612ba870fA730c6B45e553563",2).call()
               .then((tags) => {
                  console.log(tags)
                  // convert all non 0 bytes tag fields to hex
                  for (var j=0; j < 5; j++) {
                    if (tags[j] !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
                      console.log(tags[j])
                      tags[j] = this.drizzle.web3.utils.hexToAscii(tags[j])
                    } else {
                      console.log(tags[j])
                      tags[j] = 'N/A'
                    }
                  }                  
               });
               */
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
            <div class="container">
            <h4> Files Table </h4>
              <table class="table">
                <thead>
                  <tr>
                  <th>FileName</th>
                  <th>Owner </th>
                  <th>Ipfs Hash</th>
                  <th><abbr title="Played">TimeStamp</abbr></th>
                  </tr>
                </thead>
                <tbody>
                {this.fileArray !== undefined &&
                 this.fileArray.map(ipfsRow =>
                    <tr>
                    {/** Tags (bytes32 array) can't be returned from strucuts
                        <td>
                        <div class="tags">
                          <span class="tag is-success">{ipfsRow[0]}</span>
                          <span class="tag is-info">{ipfsRow[1]}</span>
                          <span class="tag is-danger">{ipfsRow[2]}</span>
                          <span class="tag is-link">{ipfsRow[3]}</span>
                          <span class="tag is-primary">{ipfsRow[4]}</span>
                          <span class="tag is-white">{ipfsRow[4]}</span>
                        </div>
                        </td>
                    */}
                    <td>{ipfsRow.filename}</td>
                    <td>{ipfsRow.owner}</td>
                    <td><a href={IPFSURL+ipfsRow.ipfshash} target="_blank">{ipfsRow.ipfshash}</a></td>
                    <td>{ipfsRow.timestamp}</td>
                    </tr>
                )}
                </tbody>
              </table>
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


export default FileTable
