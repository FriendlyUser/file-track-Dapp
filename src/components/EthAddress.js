import React from 'react';
import { bool, number, string } from 'prop-types';
import copy from 'copy-to-clipboard';
import CopyIcon from './CopyIcon';
import { NETWORKS } from '../util/constants'
import { isAddress } from '../util/util';

import '../css/ethAddress.css';

class EthAddress extends React.Component {
   // TODO change to more standardized approach to initial variables
  static propTypes = {
    // eth address
    address: string,
    // compact mode shows first 4 and last 4 characters
    compact: bool,
    // number of visible characters for compact mode
    visibleCharacters: number,
    //web3 network ID
    networkId: number,
    // enable or disable the ability to copy to clipboard
    copyToClipboard: bool,
    // make a link to etherscan
    etherscan: bool,
    // extra classes
    className: string,
  };

  static defaultProps = {
    compact: true,
    visibleCharacters: 8,
    ethNetwork: 1,
    networkId: 1,
    copyToClipboard: false,
    etherscan: false,
    className: '',
  };

  constructor(){
    super();
    this.state = {
      showingCopied: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onClick = () => {
    const { copyToClipboard } = this.props;
    if (copyToClipboard) {
      copy(this.props.address);
      this.showCopied();
    }
  }

  showCopied = () => {
    this.setState({
      showingCopied: true,
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.hideCopied.bind(this), 1000)
  }

  hideCopied = () => {
    this.setState({
      showingCopied: false,
    });
  }

  render(){
    const {
      etherscan,
      compact,
      visibleCharacters,
      networkId,
      copyToClipboard,
      className,
    } = this.props;

    const { showingCopied } = this.state;

    const address = this.props.address.startsWith('0x') ? this.props.address : `0x${this.props.address}`;

    const visible = (visibleCharacters > 42) ? 42 :
      (visibleCharacters < 2) ? 2 : visibleCharacters; 
    const visibleFirst = Math.ceil(visible / 2);
    const visibleLast = Math.floor(visible / 2);

    const displayAddress = compact ? (
      `${address.substr(0, (visibleFirst + 2))}${visible < 42 ? '...' : ''}${address.substr(42 - visibleLast, 42)}`
    ) : address;

    if (!isAddress(address)) {
      return (
        <span
          className="eth-address error"
        >
          Invalid address.
        </span>
      );
    }
    const currentNetworkName = NETWORKS[networkId].name.toLowerCase()   
    
    // This is the etherscanURL for a user/contract
    const etherscanURL = networkId === 1 ? "https://etherscan.io/address/" : "https://" + currentNetworkName  + ".etherscan.io/address/"
    
    const classes = `eth-address ${className} ${copyToClipboard ? 'copy-enabled' : ''} ${showingCopied ? 'showing-copied' : ''}`;
    
    return etherscan ? (
      <a
        href={etherscanURL + address}
        target="_blank"
        className={classes}
        title={address}
      >
        { displayAddress }
      </a>
    ) : (
      <span
        className={classes}
        onClick={this.onClick}
        title={address}
      >
        { displayAddress } { copyToClipboard && <CopyIcon /> }
        {
          showingCopied && (
            <div className="sm-message">
              Copied!
            </div>
          )
        }
      </span>
    )
  }
}

export default EthAddress;
