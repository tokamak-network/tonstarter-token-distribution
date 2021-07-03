//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
import "../libraries/ClaimVaultLib.sol";
import "./BaseVault.sol";

//import "hardhat/console.sol";

contract WhitelistVault is BaseVault {
    using SafeERC20 for IERC20;

    ///@dev constructor
    ///@param _name Vault's name
    ///@param _token Allocated token address
    constructor(
        string memory _name,
        address _token,
        uint256 _inputMaxOnce
    ) {
        name = _name;
        token = _token;
        maxInputOnceTime = _inputMaxOnce;
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    ///@dev initialization function
    ///@param _totalAllocatedAmount total allocated amount
    ///@param _totalTgeCount   total tge count
    ///@param _startTime start time
    ///@param _periodTimesPerCliam period time per claim
    function initialize(
        uint256 _totalAllocatedAmount,
        uint256 _totalTgeCount,
        uint256 _startTime,
        uint256 _periodTimesPerCliam
    ) external onlyOwner {
        initializeBase(
             _totalAllocatedAmount,
             _totalTgeCount,
             _totalTgeCount,
             _startTime,
             _periodTimesPerCliam
        );
    }

    ///@dev allocate amount for each round
    ///@param round  it is the period unit can claim once
    ///@param amount total claimable amount
    function allocateAmount(uint256 round, uint256 amount)
        external
        onlyOwner
        nonZero(round)
        nonZero(amount)
        validTgeRound(round)
    {
        require(
            totalTgeAmount + amount <= totalAllocatedAmount,
            "WhitelistVault: exceed total allocated amount"
        );

        ClaimVaultLib.TgeInfo storage tgeinfo = tgeInfos[round];
        require(!tgeinfo.allocated, "WhitelistVault: already allocated");
        tgeinfo.allocated = true;
        tgeinfo.allocatedAmount = amount;
        totalTgeAmount += amount;

        emit AllocatedAmount(round, amount);
    }

    ///@dev start round, Calculate how much the whitelisted people in the round can claim.
    ///@param round  it is the period unit can claim once
    function startRound(uint256 round)
        external
        onlyOwner
        nonZero(round)
        nonZero(totalTgeCount)
        validTgeRound(round)
    {
        ClaimVaultLib.TgeInfo storage tgeinfo = tgeInfos[round];
        require(
            tgeinfo.allocated && tgeinfo.allocatedAmount > 0,
            "WhitelistVault: no allocated"
        );
        require(!tgeinfo.started, "WhitelistVault: already started");
        require(tgeinfo.whitelist.length > 0, "WhitelistVault: no whitelist");
        tgeinfo.started = true;
        tgeinfo.amount = tgeinfo.allocatedAmount / tgeinfo.whitelist.length;

        emit StartedRound(round);
    }

    ///@dev next claimable start time
    function startRoundTime(uint256 round)
        external
        view
        returns (uint256 start)
    {
        if (round > 0 && round <= totalTgeCount)
            start = startTime + (periodTimesPerCliam * (round - 1));
    }

    ///@dev number of unclaimed
    function unclaimedInfos()
        external
        view
        returns (uint256 count, uint256 amount)
    {
        count = 0;
        amount = 0;
        if (block.timestamp > startTime) {
            uint256 curRound = currentRound();
            for (uint256 i = 1; i <= totalTgeCount; i++) {
                if (curRound >= i) {
                    ClaimVaultLib.TgeInfo storage tgeinfo = tgeInfos[i];
                    if (tgeinfo.started) {
                        if (
                            tgeinfo.claimedTime[msg.sender].joined &&
                            tgeinfo.claimedTime[msg.sender].claimedTime == 0
                        ) {
                            count++;
                            amount += tgeinfo.amount;
                        }
                    }
                }
            }
        }
    }

    ///@dev claim
    function claim() external {
        uint256 count = 0;
        uint256 amount = 0;
        require(block.timestamp > startTime, "WhitelistVault: not started yet");

        uint256 curRound = currentRound();
        for (uint256 i = 1; i <= totalTgeCount; i++) {
            if (curRound >= i) {
                ClaimVaultLib.TgeInfo storage tgeinfo = tgeInfos[i];
                if (tgeinfo.started) {
                    if (
                        tgeinfo.claimedTime[msg.sender].joined &&
                        tgeinfo.claimedTime[msg.sender].claimedTime == 0
                    ) {
                        tgeinfo.claimedTime[msg.sender].claimedTime = block
                        .timestamp;
                        tgeinfo.claimedCount++;
                        amount += tgeinfo.amount;
                        count++;
                    }
                }
            }
        }

        require(amount > 0, "WhitelistVault: no claimable amount");
        totalClaimedAmount += amount;
        require(
            IERC20(token).transfer(msg.sender, amount),
            "WhitelistVault: transfer fail"
        );

        emit Claimed(msg.sender, amount, totalClaimedAmount);
    }
}
