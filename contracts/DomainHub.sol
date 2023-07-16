// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DomainHub is ERC721{
    address public owner;
    uint256 public totalSupply;
    constructor(string memory _name,string memory _symbol) ERC721(_name,_symbol){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }

    struct Domain{
        string name ;
        uint256 cost;
        bool soldOut;
    }
    mapping (uint256 => Domain ) domains;
    uint256 public id=0;
    function listDomain(string memory _name , uint256 _cost) public onlyOwner{
        //  require(msg.sender==owner,"only owner can list domains");
         domains[id] = Domain(_name,_cost,false);
         id++;
    }
    function mintDomain(uint256 _id) public payable onlyOwner{
        require(_id>=0 && _id<id && domains[_id].soldOut==false && msg.value>=domains[_id].cost);
        domains[_id].soldOut = true;
        totalSupply++;
        _safeMint(msg.sender,_id);
        
    }

    function getDomain(uint256 _id) public view returns(Domain memory){
        return  domains[_id];
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }

    function withdraw() public onlyOwner{
        (bool success,) = owner.call{value : address(this).balance}("");
        require(success);
    }

}
