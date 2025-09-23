// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 1 ether = 10^18 wei
// 1 finney = 10^15 wei
// 1 szabo  = 10^12 wei
// 1 gwei   = 10^9 wei
// 1 mwei   = 10^6 wei
// 1 kwei   = 10^3 wei
// 1 wei    = 1 wei

contract Variables {
    
    // int
    uint8 public priceOne = 1 wei;
    uint256 public priceTwo = 1 ether;

    // address
    address public owner;
    address public shopAddress;

    // bool
    bool public isActive = true;

    // string
    string public shopName = "My Solidity Shop";

    // bytes
    bytes32 public shopId = keccak256(abi.encodePacked("shop-001"));

    // array
    uint[] public itemPrices;

    // dict - mapping
    mapping (address => bool) public buyers;

    // enum
    enum Status { Pending, Paid, Shipped, Completed }
    Status public currentStatus;

    // struct
    struct Item {
        string name;
        uint256 price;
    }
    Item public sampleItem;
}