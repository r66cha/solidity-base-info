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
    
    // uint and int
    uint8 public priceOne = 1 wei;
    uint256 public priceTwo = 1 ether;
    int8 public number = -5;             // 2^7 -128 + 127

    // address
    address public owner;
    address public shopAddress;

    // bool
    bool public isActive = true;
    bool public isNotActive = !isActive; // not

    bool public or = isActive || false;  // or
    bool public and = isActive && false; // and
    

    // string
    string public shopName = "My Solidity Shop";

    // bytes
    bytes32 public shopId = keccak256(abi.encodePacked("shop-001"));

    // array
    uint[] public itemPrices;
    uint[10][3] public itemPricesStatic; // uint[10]
    // Example function to create a memory array
        function createItemsArray() public pure returns (uint[] memory) {
            uint[] memory items = new uint[](7);

            // loops
            for(uint i = 0; i < items.length; i ++) {
                // You can process items[i] here if needed
            }

            return items;
        }

    // dict - mapping
    mapping (address => bool) public buyers;

    // enum
    enum Status { Pending, Paid, Shipped, Completed }
    Status public currentStatus;
    Status public nexStatus;

    function changeStatus() public{
        currentStatus = Status.Completed;
        nexStatus = Status.Paid;
        if (currentStatus != nexStatus) {
            // do some
        }
    }
    

    // struct
    struct Item {
        string name;
        uint256 price;
    }
    Item public sampleItem;

    struct Payment {
        uint amount;
        uint timestamp;
    }

    mapping (address => Payment[]) public payments;

    function addPayments() public payable {
        uint[] memory tempArray = new uint[](10);
        tempArray[0] = 10;
        payments[msg.sender].push(Payment({amount: msg.value, 
                                           timestamp:block.timestamp}));
    
    }

    
}


