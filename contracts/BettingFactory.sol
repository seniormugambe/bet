// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BinaryBettingEvent.sol";
import "./MultipleOutcomeBettingEvent.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BettingFactory
 * @dev Factory contract for deploying and managing betting events
 */
contract BettingFactory is Ownable {
    // State variables
    address[] public allEvents;
    mapping(address => bool) public isValidEvent;
    mapping(string => address[]) public eventsByCategory;
    mapping(address => bool) public isAdmin;

    // Events
    event EventCreated(address indexed eventAddress, string eventType, string category, uint256 endTime);
    event AdminGranted(address indexed admin);
    event AdminRevoked(address indexed admin);

    /**
     * @dev Constructor
     * @param initialAdmin Initial admin address
     */
    constructor(address initialAdmin) Ownable(initialAdmin) {
        isAdmin[initialAdmin] = true;
        emit AdminGranted(initialAdmin);
    }

    /**
     * @dev Modifier to restrict access to admins only
     */
    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can call");
        _;
    }

    /**
     * @dev Create a binary betting event
     * @param title Event title
     * @param description Event description
     * @param category Event category
     * @param duration Duration in seconds
     * @param outcomes Array of exactly 2 outcome labels
     */
    function createBinaryEvent(
        string memory title,
        string memory description,
        string memory category,
        uint256 duration,
        string[2] memory outcomes
    ) external onlyAdmin returns (address) {
        BinaryBettingEvent newEvent = new BinaryBettingEvent(
            title,
            description,
            category,
            duration,
            outcomes,
            msg.sender
        );

        address eventAddress = address(newEvent);
        allEvents.push(eventAddress);
        isValidEvent[eventAddress] = true;
        eventsByCategory[category].push(eventAddress);

        emit EventCreated(eventAddress, "binary", category, block.timestamp + duration);

        return eventAddress;
    }

    /**
     * @dev Create a multiple outcome betting event
     * @param title Event title
     * @param description Event description
     * @param category Event category
     * @param duration Duration in seconds
     * @param outcomes Array of 3-10 outcome labels
     */
    function createMultipleOutcomeEvent(
        string memory title,
        string memory description,
        string memory category,
        uint256 duration,
        string[] memory outcomes
    ) external onlyAdmin returns (address) {
        require(outcomes.length >= 3 && outcomes.length <= 10, "Invalid outcome count");

        MultipleOutcomeBettingEvent newEvent = new MultipleOutcomeBettingEvent(
            title,
            description,
            category,
            duration,
            outcomes,
            msg.sender
        );

        address eventAddress = address(newEvent);
        allEvents.push(eventAddress);
        isValidEvent[eventAddress] = true;
        eventsByCategory[category].push(eventAddress);

        emit EventCreated(eventAddress, "multiple", category, block.timestamp + duration);

        return eventAddress;
    }

    /**
     * @dev Get all active events
     */
    function getAllActiveEvents() external view returns (address[] memory) {
        uint256 activeCount = 0;
        
        // Count active events
        for (uint256 i = 0; i < allEvents.length; i++) {
            BettingEvent eventContract = BettingEvent(allEvents[i]);
            if (!eventContract.concluded() && block.timestamp < eventContract.endTime()) {
                activeCount++;
            }
        }

        // Create array of active events
        address[] memory activeEvents = new address[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allEvents.length; i++) {
            BettingEvent eventContract = BettingEvent(allEvents[i]);
            if (!eventContract.concluded() && block.timestamp < eventContract.endTime()) {
                activeEvents[index] = allEvents[i];
                index++;
            }
        }

        return activeEvents;
    }

    /**
     * @dev Get events by category
     * @param category Category to filter by
     */
    function getEventsByCategory(string memory category) external view returns (address[] memory) {
        return eventsByCategory[category];
    }

    /**
     * @dev Get all events
     */
    function getAllEvents() external view returns (address[] memory) {
        return allEvents;
    }

    /**
     * @dev Get total number of events
     */
    function getEventCount() external view returns (uint256) {
        return allEvents.length;
    }

    /**
     * @dev Grant admin role
     * @param account Address to grant admin role
     */
    function grantAdmin(address account) external onlyOwner {
        require(account != address(0), "Invalid address");
        require(!isAdmin[account], "Already admin");
        isAdmin[account] = true;
        emit AdminGranted(account);
    }

    /**
     * @dev Revoke admin role
     * @param account Address to revoke admin role
     */
    function revokeAdmin(address account) external onlyOwner {
        require(isAdmin[account], "Not an admin");
        isAdmin[account] = false;
        emit AdminRevoked(account);
    }

    /**
     * @dev Check if address is admin
     * @param account Address to check
     */
    function checkIsAdmin(address account) external view returns (bool) {
        return isAdmin[account];
    }
}
