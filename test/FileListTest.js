var FileList = artifacts.require("./FileList.sol");
//const utils = require('./helpers/utils')

contract('FileList', function(accounts) {
    let myUserInstance;
    let owner    = accounts[0];
    let nonOwner = accounts[1];
    const username = "grandfleet"
    const tags = ["blockchain","ENGR001","games","life","anime"]
    //let tryCatch = require("./helpers/exceptions.js").tryCatch;
    //let errTypes = require("./helpers/exceptions.js").errTypes;
    beforeEach(async () => {
        // [accounts[0], accounts[1]], requiredConfirmations, dailyLimit

        myFileListInstance = await FileList.deployed()
        assert.ok(myFileListInstance)
    })
    it("...get the size of the FileList contract", function() {
        return FileList.deployed().then(function(instance) {
             var bytecode = instance.constructor._json.bytecode;
             var deployed = instance.constructor._json.deployedBytecode;
             var sizeOfB  = bytecode.length / 2;
             var sizeOfD  = deployed.length / 2;
             console.log("    size of bytecode in bytes = ", sizeOfB);
             console.log("    size of deployed in bytes = ", sizeOfD);
             console.log("    initialisation and constructor code in bytes = ", sizeOfB - sizeOfD);
        }); 
    });
    describe("...Add File", async() => {
        //console.log('Cool')
        it("......Adding a File Item", async() =>  {
            console.log("      adding File Items")
            const ipfsTags = ["0x00","0x00","0x00","0x00","0x00"]
            console.log(ipfsTags)
            for (var i = 0; i < ipfsTags; i++)
                ipfsTags[i] = web3.fromUtf8(tags[i]);
            console.log(ipfsTags)
            const hash1 = "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"
            const filename1 = web3.fromUtf8("test1")
            // convert filenames to hex later 
            await myFileListInstance.addFile(hash1,filename1,ipfsTags)
            const hash2 = "QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t"
            const filename2 =  web3.fromUtf8("test2")
            await myFileListInstance.addFile(hash2,filename2,ipfsTags)
        });
        it("......Getting Number of Files",async() => {
            console.log("      getting number of Files")
            const lastIds = await myFileListInstance.lastIds(owner)
            assert.strictEqual(2,lastIds.toNumber())
        })
        it("......Getting list of tags", async() => {
            const returnedTags = await myFileListInstance.getFileTags(owner,0)
            console.log(returnedTags)
            for (var j=0; j < 5; j++) {
                if (returnedTags[j] !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
                  console.log(tags[j])
                  returnedTags[j] = web3.toAscii(tags[j])
                } else {
                  console.log(tags[j])
                  returnedTags[j] = 'N/A'
                }
            }
            assert.strictEqual(returnedTags[0],tags[0])
        })
        /*
        it("Getting Data of all todos",async() => {
            let idsToCheck = [0,1] 
            const todoList = await myTodoListInstance.returnAllTodos([0, 1], { from: accounts[0]});
            console.log('      todos =',todoList )
            const todoData2 = await myTodoListInstance.returnAllTodos([1]);
            console.log('      todos =',todoData2 )
            console.log('      neatly printing results')
            // for clarity's sake, let's define some constants so that we can see
            // which field array we're accessing:
      
            const FIELD_IDS  = 0
            const FIELD_CONTENTS = 1
            const FIELD_OWNERS = 2
            const FIELD_ISCOMPLETEDS = 3
            const FIELD_TIMESTAMPS = 4

            let todoListStructs = []
            for (let i = 0; i < 2; i++) {
                const todo = {
                    ids:            todoList[FIELD_IDS][i].toNumber(),
                    contents:       web3.toUtf8(todoList[FIELD_CONTENTS][i]),
                    owners:         todoList[FIELD_OWNERS][i],
                    isCompleteds:   todoList[FIELD_ISCOMPLETEDS][i],
                    timestamps:     todoList[FIELD_TIMESTAMPS][i].toNumber()
                }
                todoListStructs.push(todo)
            }

            console.log('       todoListStructs =', todoListStructs)
        })
        **/
        /** 
        it("Authenticating a User", async() => {
            const usernameTst = await myUserInstance.authenticate()
            const usernameStr = web3.toUtf8(usernameTst)
            assert.strictEqual(username,usernameStr,"username is matchs up")
        });
        it("Getting a username", async() => {
            const usernameTst = await myUserInstance.get(owner)
            const usernameStr = web3.toUtf8(usernameTst)
            assert.strictEqual(username,usernameStr,"username is matchs up")
        });
        it("Destroying a User", async() => {
            const userDestroyedEvent = await myUserInstance.destroy()
            const userDestroyedAddress = utils.getParamFromTxEvent( userDestroyedEvent, '_address', null, 'UserDestroyed')
            assert.strictEqual(userDestroyedAddress,owner,"User is successful destroyed")
        });
        */
    });
});
