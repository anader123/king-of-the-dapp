pragma solidity ^0.5.0;
import "@openzeppelin/contracts/math/SafeMath.sol";

contract KingDappContract {
    using SafeMath for uint;

    address payable public King;
    uint256 public kingRansom;

    constructor() public payable {
        King = msg.sender;
        kingRansom = msg.value;
    }

    event Coronation(address indexed _newKing, uint256 _kingRansom);

    function() external payable {
        revert();
    }

    function becomeKing() public payable {
        require(msg.value >= (kingRansom.add(0.1 ether)));
        address payable oldKing = King;
        uint256 oldRansom = kingRansom;
        King = msg.sender;
        kingRansom = msg.value;
        oldKing.transfer(oldRansom);
        emit Coronation(msg.sender, msg.value);
    }
}