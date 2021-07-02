//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "../libraries/ClaimVaultLib.sol";

contract BaseVaultStorage {

    uint256 public maxInputOnceTime;
    ///
    string public name;
    ///
    address public token;

    uint256 public totalAllocatedAmount;
    uint256 public totalClaimedAmount;
    // uint256 public totalClaims;

    uint256 public startTime;
    uint256 public endTime;
    uint256 public periodTimesPerCliam;

    uint256 public totalTgeCount;
    uint256 public totalTgeAmount;


    /// round => TgeInfo
    mapping(uint256 => ClaimVaultLib.TgeInfo) public tgeInfos;

    modifier nonZeroAddress(address _addr) {
        require(_addr != address(0), "BaseVaultStorage: zero address");
        _;
    }

    modifier nonZero(uint256 _value) {
        require(_value > 0, "BaseVaultStorage: zero value");
        _;
    }

}