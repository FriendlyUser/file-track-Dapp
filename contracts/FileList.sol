pragma solidity ^0.4.24;

contract FileList {

   struct File {
      uint256 id;
      string ipfshash;
      bytes32 filename;
      bytes32[5] tags;
      address owner;
      uint256 timestamp;
   }
   uint256 public constant maxAmountOfFiles = 1000;
   mapping(address => File[maxAmountOfFiles]) public files;
   mapping(address => uint256) public lastIds;

   event fileAdded (uint256 fileid, string ipfshash, bytes32 _filename);
   event tagsAdded (bytes32[5] tags);

   function addFile(string ipfshash, bytes32 _filename, bytes32[5] tags) public {
 
      File memory myFile = File(lastIds[msg.sender], ipfshash, _filename, tags,  msg.sender, now);
      myFile.tags = tags;
      emit tagsAdded (myFile.tags);

      files[msg.sender][lastIds[msg.sender]] = myFile;
      emit fileAdded(lastIds[msg.sender],ipfshash,_filename);
      if(lastIds[msg.sender] >= maxAmountOfFiles) lastIds[msg.sender] = 0;
      else lastIds[msg.sender]++;
   }

   function getFileTags(address owner, uint256 _index) external view returns (bytes32[5]) {
       return files[owner][_index].tags;
  }
}