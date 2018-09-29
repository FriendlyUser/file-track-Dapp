module.exports = { 
    compileCommand: '../node_modules/.bin/truffle compile',
    testCommand: 'node --max-old-space-size=8192 ../node_modules/.bin/truffle test --network coverage',
    copyPackages: ['openzeppelin-solidity']
};
