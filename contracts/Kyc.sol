// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Kyc is Ownable {
    mapping(address => bool) allowed;

    function setKycCompleted(address _addr) public onlyOwner  { 
        allowed[_addr] = true;
    }

    function setKycRejected(address _addr) public onlyOwner  {
        allowed[_addr] = false;
    }

    function checkKyc(address _addr) public view returns(bool) {
        return allowed[_addr];
    }
}