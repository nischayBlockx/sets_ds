// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {ISets} from "./ISets.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Sets is ISets, Ownable{

    uint256 public immutable maxElements;
    uint256 public lowestValue;
    address public lowestAddress;

    struct Element {
        address addr;
        uint256 value;
    }

    mapping(address => Element) public sets;
    mapping(address => bool) public inserted;
    address[] keys;

    constructor(uint256 _maxElements) Ownable(msg.sender) {
        maxElements = _maxElements;
        lowestValue =0;
        // lowestAddress = address(0);
    }

    function insert(address addr, uint256 value) public override onlyOwner returns (address newLowestAddress, uint256 newLowestValue) {
        require(keys.length< maxElements,"Set count is out of Index");
        require(!inserted[addr]," address is already exist");

        if (value < lowestValue || lowestValue==0) {
            lowestValue = value;
            lowestAddress = addr;
        }
        sets[addr] = Element(addr,value);
        keys.push(addr);
        inserted[addr]=true;
        return(lowestAddress,lowestValue);
    }

    function update(address addr, uint256 newVal) public override onlyOwner returns (address newLowestAddress, uint256 newLowestValue){
        require(inserted[addr]," element is not exist in the Set");
        if (keys.length ==1) {
            lowestAddress = addr;
            lowestValue = newVal;
        }else if (newVal<lowestValue){
            lowestValue = newVal;
            lowestAddress = addr;
        }
        sets[addr].value = newVal;
        return(lowestAddress,lowestValue);
    }
    function remove(address addr) public override onlyOwner returns (address newLowestAddress, uint256 newLowestValue){
        require(inserted[addr]," element is not in the Set");
        address tempAddr ;
        delete inserted[addr];
        for (uint i=0;i<keys.length;i++) {
            if (keys[i]==addr) {
                keys[i]=keys[keys.length-1];
                keys.pop();
                break;
            }
        }
        delete sets[addr];
        if (keys.length ==0) {
            lowestAddress =address(0);
            lowestValue = 0;
        }else if (addr == lowestAddress){
            tempAddr = checkLowest();
            return (tempAddr, sets[tempAddr].value);
        }
        return (lowestAddress,lowestValue);

    }

    function checkLowest() internal returns(address) {
        uint _value;
        address _addr;
        for (uint i=0;i<keys.length;i++) {
            _value = sets[keys[i]].value;
            _addr = keys[i];
            if (_value < lowestValue){
                lowestValue = _value;
                lowestAddress = _addr;
            }
        }
        return lowestAddress;
    }
    
    function getValue(address addr) public override onlyOwner view returns (uint256){
        require(inserted[addr]," element is not in the Set");
        return sets[addr].value;
    }

    

}