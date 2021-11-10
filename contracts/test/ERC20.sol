pragma solidity >=0.5.16;

import '../VeniceERC20.sol';

contract ERC20 is VeniceERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
