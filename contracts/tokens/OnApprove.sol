// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC165} from "../introspection/ERC165.sol";

abstract contract OnApprove is ERC165 {
    constructor() {
        _registerInterface(OnApprove(this).onApprove.selector);
    }

    // solhint-disable-next-line max-line-length
    function onApprove(
        address owner,
        address spender,
        uint256 amount,
        bytes calldata data
    ) external virtual returns (bool);
}
