//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./DesignateVault.sol";

contract InitialContributorVault is DesignateVault {
    constructor(address _tosAddress, uint256 _maxInputOnce)
        DesignateVault("InitialContributor", _tosAddress, _maxInputOnce)
    {}
}
