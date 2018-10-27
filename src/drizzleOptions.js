// import ComplexStorage from './../build/contracts/ComplexStorage.json'
// import SimpleStorage from './../build/contracts/SimpleStorage.json'
// import TutorialToken from './../build/contracts/TutorialToken.json'
import FileList from './../build/contracts/FileList.json'
import Authentication from './../build/contracts/Authentication.json'
const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    // ComplexStorage,
    FileList,
    Authentication
    // SimpleStorage,
    // TutorialToken
  ],
  events: {
    Authentication: ['UserCreated', 'UserUpdated', 'UserDeleted'],
    FileList: ['fileAdded']
    // SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions
