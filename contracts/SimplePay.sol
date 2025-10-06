// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error NotAnOwner(address addr);
error InvalidPayAmount(uint amount);

event Pay(address addr, uint timestamp, uint amount);
event Withdraw(address addr, address to, uint timestamp, uint amount);
event Receive(address addr, string _str);
event Fallback(address addr, string _str);

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
        emit Pay(msg.sender, block.timestamp, msg.value);

    }

    function showBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    function withdraw(address payable _to) public onlyOwner(msg.sender) {
        _to.transfer(address(this).balance);
        emit Withdraw(msg.sender, _to, block.timestamp, address(this).balance);

    }

    function showPayments(address _addr) public view onlyOwner(msg.sender) returns(Payment[] memory){
        return payments[_addr];
    }

    function showMyPayments() public view returns(Payment[] memory) {
        return payments[msg.sender];
    }

    // --

    receive() external payable {
        emit Receive(msg.sender, "*");
        pay();
    }

    fallback() external payable {
        emit Fallback(msg.sender, "*");
        pay();
    }
}