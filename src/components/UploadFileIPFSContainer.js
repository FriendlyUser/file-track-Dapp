import { drizzleConnect } from 'drizzle-react'

import UploadFileIPFS from './UploadFileIPFS'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts,
    FileList: state.contracts.FileList,
    drizzleStatus: state.drizzleStatus
  }
}

export default drizzleConnect(UploadFileIPFS, mapStateToProps);
