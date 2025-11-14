// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BettingEvent.sol";

/**
 * @title MultipleOutcomeBettingEvent
 * @dev Specialized contract for events with 3-10 possible outcomes
 */
contract MultipleOutcomeBettingEvent is BettingEvent {
    /**
     * @dev Constructor for multiple outcome betting event
     * @param _title Event title
     * @param _description Event description
     * @param _category Event category
     * @param _duration Duration in seconds
     * @param _outcomes Array of 3-10 outcome labels
     * @param _admin Admin address
     */
    constructor(
        string memory _title,
        string memory _description,
        string memory _category,
        uint256 _duration,
        string[] memory _outcomes,
        address _admin
    ) BettingEvent(_title, _description, _category, _duration, _outcomes, _admin) {
        require(_outcomes.length >= 3 && _outcomes.length <= 10, "Multiple outcome event requires 3-10 outcomes");
    }

    /**
     * @dev Validate outcome index for multiple outcome events (0 to outcomes.length-1)
     * @param outcomeIndex Index to validate
     */
    function _validateOutcome(uint8 outcomeIndex) internal view override {
        require(outcomeIndex < outcomes.length, "Invalid outcome index");
    }
}
