import React from 'react'
import PropTypes from 'prop-types'


const IpfsTable = props => (
    <table class="table">
        <thead>
          <tr>
          <th><abbr title="Tags">Tags</abbr></th>
          <th>Ipfs Hash</th>
          <th><abbr title="Played">TimeStamp</abbr></th>
          </tr>
        </thead>
        <tbody>
        {props.fileArray.map(ipfsRow =>
            <tr>
                <td>
                <div class="tags">
                  <span class="tag is-success">{ipfsRow[0]}</span>
                  <span class="tag is-info">{ipfsRow[1]}</span>
                  <span class="tag is-danger">{ipfsRow[2]}</span>
                  <span class="tag is-link">{ipfsRow[3]}</span>
                  <span class="tag is-primary">{ipfsRow[4]}</span>                
                </div>
                </td>
            <td>{ipfsRow.ipfshash}</td>
            <td>{ipfsRow.now}</td>
            </tr>
        )}
        </tbody>
    </table>
)

IpfsTable.propTypes = {
    fileArray: PropTypes.any,
}
export default IpfsTable;
