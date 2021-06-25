//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./DesignateVault.sol";

contract MarketingVault is DesignateVault {
    constructor(address _tosAddress, uint256 _maxInputOnce)
        DesignateVault("Marketing", _tosAddress, _maxInputOnce)
    {}
}
