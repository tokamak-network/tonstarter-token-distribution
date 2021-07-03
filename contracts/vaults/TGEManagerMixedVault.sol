//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./CommonVault.sol";
import "./storage/ManagerVaultStorage.sol";
import "./ManagerVaultEvent.sol";
import "./TGEVault.sol";

//import "hardhat/console.sol";

contract TGEManagerMixedVault is TGEVault, ManagerVaultStorage , ManagerVaultEvent {
    using SafeERC20 for IERC20;

    ///@dev constructor
    ///@param _name Vault's name
    ///@param _token Allocated token address
    constructor(
        string memory _name,
        address _token,
        uint256 _inputMaxOnce
    ) TGEVault(_name, _token, _inputMaxOnce) {
        claimer = msg.sender;
    }

    ///@dev initialization function
    ///@param _totalAllocatedAmount total allocated amount
    ///@param _totalClaims total available claim count
    ///@param _totalTgeCount   total tge count
    ///@param _startTime start time
    ///@param _periodTimesPerCliam period time per claim
    function initialize(
        uint256 _totalAllocatedAmount,
        uint256 _totalClaims,
        uint256 _totalTgeCount,
        uint256 _startTime,
        uint256 _periodTimesPerCliam
    )
        external override
        onlyOwner
    {
        super.initialize(
            _totalAllocatedAmount,
            _totalClaims,
            _startTime,
            _periodTimesPerCliam
        );
        totalTgeCount = _totalTgeCount;
    }

    ///@dev set claimer
    ///@param _newClaimer new claimer
    function setClaimer(address _newClaimer)
        external
        onlyOwner
        nonZeroAddress(_newClaimer)
        nonSameAddress(claimer, _newClaimer)
    {
        claimer = _newClaimer;

        emit SetNewClaimer(_newClaimer);
    }

    ///@dev start round, Calculate how much the whitelisted people in the round can claim.
    ///@param round  it is the period unit can claim once
    function startRound(uint256 round)
        external override
        onlyOwner
        nonZero(round)
        nonZero(totalClaims)
    {
        require(
            round <= totalTgeCount,
            "TGEManagerMixedVault: exceed available round"
        );

        TgeInfo storage tgeinfo = tgeInfos[round];
        require(tgeinfo.allocated, "TGEManagerMixedVault: no allocated");
        require(!tgeinfo.started, "TGEManagerMixedVault: already started");
        tgeinfo.started = true;
        if (tgeinfo.allocatedAmount > 0 && tgeinfo.whitelist.length > 0)
            tgeinfo.amount = tgeinfo.allocatedAmount / tgeinfo.whitelist.length;
        else tgeinfo.amount = tgeinfo.allocatedAmount;

        emit StartedRound(round);
    }

    ///@dev start round for claimer , The amount charged at one time is determined.
    function start() external onlyOwner nonZero(totalClaims) {
        require(
            !startedByClaimer,
            "TGEManagerMixedVault: already started by claimer"
        );
        for (uint256 i = 1; i <= totalTgeCount; i++) {
            require(
                tgeInfos[i].allocated,
                "TGEManagerMixedVault: previous round did't be allocated yet."
            );
        }
        startedByClaimer = true;
        oneClaimAmountByClaimer =
            (totalAllocatedAmount - totalTgeAmount) /
            (totalClaims - totalTgeCount);

        emit Started();
    }

    ///@dev number of unclaimed
    function unclaimedInfos()
        external override
        view
        returns (uint256 count, uint256 amount)
    {
        count = 0;
        amount = 0;
        if (block.timestamp > startTime) {
            uint256 curRound = currentRound();
            if (msg.sender == claimer) {
                if (curRound > totalTgeCount) {
                    if (lastClaimedRound >= totalTgeCount) {
                        count = curRound - lastClaimedRound;
                    } else {
                        count = curRound - totalTgeCount;
                    }
                }
                if (count > 0) amount = count * oneClaimAmountByClaimer;
            } else {
                for (uint256 i = 1; i <= totalTgeCount; i++) {
                    if (curRound >= i) {
                        TgeInfo storage tgeinfo = tgeInfos[i];
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
    }

    ///@dev claim
    function claim() external virtual override {
        uint256 count = 0;
        uint256 amount = 0;
        require(block.timestamp > startTime, "TGEManagerMixedVault: not started yet");

        uint256 curRound = currentRound();
        if (msg.sender == claimer) {
            if (lastClaimedRound > totalTgeCount) {
                if (lastClaimedRound < curRound) {
                    count = curRound - lastClaimedRound;
                }
            } else {
                if (totalTgeCount < curRound) {
                    count = curRound - totalTgeCount;
                }
            }

            amount = count * oneClaimAmountByClaimer;
            require(amount > 0, "TGEManagerMixedVault: no claimable amount");
            lastClaimedRound = curRound;
            totalClaimedAmount += amount;
            totalClaimedCountByClaimer++;
            claimedTimesOfRoundByCliamer[curRound] = block.timestamp;
            require(
                IERC20(token).transfer(msg.sender, amount),
                "TGEManagerMixedVault: transfer fail"
            );
        } else {
            for (uint256 i = 1; i <= totalTgeCount; i++) {
                if (curRound >= i) {
                    TgeInfo storage tgeinfo = tgeInfos[i];
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

            require(amount > 0, "TGEManagerMixedVault: no claimable amount");
            totalClaimedAmount += amount;
            if (lastClaimedRound < totalTgeCount && curRound < totalTgeCount)
                lastClaimedRound = curRound;
            require(
                IERC20(token).transfer(msg.sender, amount),
                "TGEManagerMixedVault: transfer fail"
            );
        }

        emit Claimed(msg.sender, amount, totalClaimedAmount);
    }

}
