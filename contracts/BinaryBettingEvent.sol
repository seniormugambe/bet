// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BettingEvent.sol";

/**
 * @title BinaryBettingEvent
 * @dev Specialized contract for binary (yes/no) betting events
 */
contract BinaryBettingEvent is BettingEvent {
    /**
     * @dev Constructor for binary betting event
     * @param _title Event title
     * @param _description Event description
     * @param _category Event category
     * @param _duration Duration in seconds
     * @param _outcomes Array of exactly 2 outcome labels
     * @param _admin Admin address
     */
    constructor(
        string memory _title,
        string memory _description,
        string memory _category,
        uint256 _duration,
        string[2] memory _outcomes,
        address _admin
    ) BettingEvent(_title, _description, _category, _duration, _convertToArray(_outcomes), _admin) {
        require(_outcomes.length == 2, "Binary event requires exactly 2 outcomes");
    }

    /**
     * @dev Validate outcome index for binary events (0 or 1)
     * @param outcomeIndex Index to validate
     */
    function _validateOutcome(uint8 outcomeIndex) internal view override {
        require(outcomeIndex < 2, "Invalid outcome: must be 0 or 1");
    }

    /**
     * @dev Convert fixed array to dynamic array
     * @param fixedArray Fixed size array of 2 elements
     */
    function _convertToArray(string[2] memory fixedArray) private pure returns (string[] memory) {
        string[] memory dynamicArray = new string[](2);
        dynamicArray[0] = fixedArray[0];
        dynamicArray[1] = fixedArray[1];
        return dynamicArray;
    }
}
