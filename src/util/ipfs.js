const IPFS = require('ipfs-api');
/** Uses ipfs-api javascript library */
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
export default ipfs;