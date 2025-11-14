// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title BettingEvent
 * @dev Base contract for betting events on Celo blockchain
 * Handles bet placement, event conclusion, and payout distribution
 */
abstract contract BettingEvent is ReentrancyGuard {
    // Structs
    struct Bet {
        address bettor;
        uint8 outcome;
        uint256 amount;
        uint256 timestamp;
        bool paid;
    }

    struct Outcome {
        string label;
        uint256 totalBets;
        uint256 bettorCount;
    }

    // State variables
    string public title;
    string public description;
    string public category;
    uint256 public endTime;
    uint256 public totalPool;
    bool public concluded;
    uint8 public winningOutcome;
    address public admin;
    address public factory;

    Outcome[] public outcomes;
    Bet[] public bets;
    mapping(address => uint256[]) public userBetIndices;
    mapping(address => uint256) public failedPayouts;

    uint256 public constant MINIMUM_BET = 0.01 ether; // 0.01 CELO

    // Events
    event BetPlaced(address indexed bettor, uint8 outcome, uint256 amount, uint256 timestamp);
    event EventConcluded(uint8 winningOutcome, uint256 totalPool, uint256 timestamp);
    event PayoutDistributed(address indexed winner, uint256 amount);
    event PayoutFailed(address indexed winner, uint256 amount);

    // Modifiers
    modifier onlyBeforeEnd() {
        require(block.timestamp < endTime, "Event has ended");
        _;
    }

    modifier onlyAfterEnd() {
        require(block.timestamp >= endTime, "Event not ended yet");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call");
        _;
    }

    modifier notConcluded() {
        require(!concluded, "Event already concluded");
        _;
    }

    /**
     * @dev Constructor to initialize betting event
     */
    constructor(
        string memory _title,
        string memory _description,
        string memory _category,
        uint256 _duration,
        string[] memory _outcomes,
        address _admin
    ) {
        require(_duration > 0, "Invalid duration");
        require(_outcomes.length >= 2, "At least 2 outcomes required");
        require(_admin != address(0), "Invalid admin address");

        title = _title;
        description = _description;
        category = _category;
        endTime = block.timestamp + _duration;
        admin = _admin;
        factory = msg.sender;

        for (uint256 i = 0; i < _outcomes.length; i++) {
            outcomes.push(Outcome({label: _outcomes[i], totalBets: 0, bettorCount: 0}));
        }
    }

    /**
     * @dev Place a bet on an outcome
     */
    function placeBet(uint8 outcomeIndex) external payable onlyBeforeEnd notConcluded nonReentrant {
        require(msg.value >= MINIMUM_BET, "Bet amount too low");
        _validateOutcome(outcomeIndex);

        bets.push(Bet({bettor: msg.sender, outcome: outcomeIndex, amount: msg.value, timestamp: block.timestamp, paid: false}));
        userBetIndices[msg.sender].push(bets.length - 1);
        outcomes[outcomeIndex].totalBets += msg.value;
        outcomes[outcomeIndex].bettorCount += 1;
        totalPool += msg.value;

        emit BetPlaced(msg.sender, outcomeIndex, msg.value, block.timestamp);
    }

    /**
     * @dev Conclude event and distribute payouts
     */
    function concludeEvent(uint8 _winningOutcome) external onlyAdmin onlyAfterEnd notConcluded nonReentrant {
        _validateOutcome(_winningOutcome);
        concluded = true;
        winningOutcome = _winningOutcome;
        emit EventConcluded(_winningOutcome, totalPool, block.timestamp);
        _distributePayouts();
    }

    /**
     * @dev Distribute payouts to winners
     */
    function _distributePayouts() internal {
        uint256 winningBets = outcomes[winningOutcome].totalBets;
        if (winningBets == 0) return;

        for (uint256 i = 0; i < bets.length; i++) {
            Bet storage bet = bets[i];
            if (bet.outcome == winningOutcome && !bet.paid) {
                uint256 payout = (bet.amount * totalPool) / winningBets;
                bet.paid = true;
                _sendPayout(bet.bettor, payout);
            }
        }
    }

    /**
     * @dev Send payout with failure handling
     */
    function _sendPayout(address winner, uint256 amount) internal {
        (bool success, ) = winner.call{value: amount}("");
        if (!success) {
            failedPayouts[winner] += amount;
            emit PayoutFailed(winner, amount);
        } else {
            emit PayoutDistributed(winner, amount);
        }
    }

    /**
     * @dev Claim failed payout
     */
    function claimFailedPayout() external nonReentrant {
        uint256 amount = failedPayouts[msg.sender];
        require(amount > 0, "No failed payout");
        failedPayouts[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Claim failed");
        emit PayoutDistributed(msg.sender, amount);
    }

    /**
     * @dev Calculate payout for a bettor
     */
    function calculatePayout(address bettor) public view returns (uint256) {
        if (!concluded) return 0;
        uint256 winningBets = outcomes[winningOutcome].totalBets;
        if (winningBets == 0) return 0;

        uint256 userWinningBets = 0;
        uint256[] memory betIndices = userBetIndices[bettor];
        for (uint256 i = 0; i < betIndices.length; i++) {
            Bet memory bet = bets[betIndices[i]];
            if (bet.outcome == winningOutcome) {
                userWinningBets += bet.amount;
            }
        }
        return userWinningBets == 0 ? 0 : (userWinningBets * totalPool) / winningBets;
    }

    // View functions
    function getEventDetails() external view returns (string memory, string memory, uint256, uint256, bool, uint8) {
        return (title, description, endTime, totalPool, concluded, winningOutcome);
    }

    function getOutcomeDetails(uint8 outcomeIndex) external view returns (string memory, uint256, uint256) {
        require(outcomeIndex < outcomes.length, "Invalid outcome");
        Outcome memory outcome = outcomes[outcomeIndex];
        return (outcome.label, outcome.totalBets, outcome.bettorCount);
    }

    function getUserBets(address user) external view returns (uint8[] memory, uint256[] memory) {
        uint256[] memory betIndices = userBetIndices[user];
        uint8[] memory _outcomes = new uint8[](betIndices.length);
        uint256[] memory amounts = new uint256[](betIndices.length);
        for (uint256 i = 0; i < betIndices.length; i++) {
            Bet memory bet = bets[betIndices[i]];
            _outcomes[i] = bet.outcome;
            amounts[i] = bet.amount;
        }
        return (_outcomes, amounts);
    }

    function getOutcomeCount() external view returns (uint256) {
        return outcomes.length;
    }

    function getBetCount() external view returns (uint256) {
        return bets.length;
    }

    function _validateOutcome(uint8 outcomeIndex) internal view virtual;
}
