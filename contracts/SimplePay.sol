// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error NotAnOwner(address _addr);
error InvalidPayAmount(uint _amount);

event ReceiverAlert(address _addr, uint timestamp, uint _value);
event FallbackAlert(address _addr, uint timestamp, uint _value);

contract SimplePay {
    constructor() {
        owner = msg.sender;
    }

    address owner;
    struct Payment {
        uint timestamp;
        uint amount;
    }
    mapping (address => Payment[]) payments;

    // --

    modifier onlyOwner(address _addr) {
        require(_addr == owner, NotAnOwner(_addr));
        _;
    }

    modifier payAmount(uint _amount) {
        require(_amount > 0, InvalidPayAmount(_amount));
        _;
    }

    // --
    
    function pay() public payable payAmount(msg.value) {
        payments[msg.sender].push(Payment(block.timestamp, msg.value));
    }

    function showBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    function withdraw(address payable _to) public onlyOwner(msg.sender) {
        _to.transfer(address(this).balance);
    }

    function showPayments(address _addr) public view onlyOwner(msg.sender) returns(Payment[] memory){
        return payments[_addr];
    }

    function showMyPayments() public view returns(Payment[] memory) {
        return payments[msg.sender];
    }

    // --

    receive() external payable {
        emit ReceiverAlert(msg.sender, block.timestamp, msg.value);
        pay();
    }

    fallback() external payable {
        emit FallbackAlert(msg.sender, block.timestamp, msg.value);
        pay();
    }
}