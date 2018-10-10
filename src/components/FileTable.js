import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
        this.tableTest = []
        this.state = {
            lastIds: 0,
            table: [],
            fileOwnerAddress: this.props.fileOwnerAddress
        }
    }
    componentDidMount() {
        this.drizzle.contracts.FileList.methods.lastIds(this.fileOwnerAddress).call()
        .then((lastIds) => {
          this.setState({
             lastIds: lastIds
          });
        })
        console.log(this.state.lastIds)
        var table = []
        this.drizzle.contracts.FileList.methods.lastIds(this.fileOwnerAddress).call()
        .then((lastIds) => {
          var i;
          for (i = 0; i <= lastIds; i++) {
            this.drizzle.contracts.FileList.methods.files(this.fileOwnerAddress,i).call()
            .then((fileItem) => {
              //do other stuff
              table.push(fileItem)
            });
          }
        })
        this.tableTest = table
        console.log(table)
        console.log(this.tableTest)
        /**this.drizzle.contracts.FileList.methods.files(this.fileOwnerAddress,0).call()
        .then((fileItem) => {
          console.log(fileItem)
          return fileItem
        })
        */
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
        console.log(this.tableTest)
        return(
            <div class="container">
            <h4> Files Table </h4>
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
                    this.tableTest.map(fileItem => {
                        <tr>
                      <td>{fileItem}</td>     
                        </tr>
                    })
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
