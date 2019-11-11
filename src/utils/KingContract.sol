// Contract address https://ropsten.etherscan.io/address/0x04d27c6ec43f965bd490935873c9aea6987bdef4
pragma solidity ^0.5.0;

contract KingDappContract {
    address public King;
    uint public kingRansom;

    constructor() public payable {
        King = msg.sender;
        kingRansom = msg.value;
    }

    event Coronation(address indexed _newKing, uint _kingRansom);

    function() external payable {
        revert("Please invoke a funtion when sending Ether to this address");
    }

    function becomeKing() public payable {
        require(msg.value > (kingRansom), "Value included was not enough");
        King = msg.sender;
        kingRansom = msg.value;
        emit Coronation(msg.sender, msg.value);
    }
}