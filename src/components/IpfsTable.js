import React from 'react'
import PropTypes from 'prop-types'


const IpfsTable = props => (
    <table class="table">
        {props.filearray.map(ipfsRow =>
            <tr>
                <td key ={ipfsRow[0]} >
                <div class="tags">
                  <span class="tag is-success">{ipfsRow[0]}</span>
                  <span class="tag is-info">{ipfsRow[1]}</span>
                  <span class="tag is-danger">{ipfsRow[2]}</span>
                  <span class="tag is-link">{ipfsRow[3]}</span>
                  <span class="tag is-primary">{ipfsRow[4]}</span>
                  <span class="tag is-white">{ipfsRow[4]}</span>
                </div>
                </td>
            <td key={ipfsRow[0]}>{ipfsRow.ipfshash}</td>
            <td key={ipfsRow[1]}>{ipfsRow.now}</td>
            </tr>
        )}
    </table>
)

IpfsTable.propTypes = {
    filearray: PropTypes.array,
}
export default IpfsTable;
