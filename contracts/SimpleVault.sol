//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//import "hardhat/console.sol";

contract SimpleVault is Ownable {
    using SafeERC20 for IERC20;

    address public tos;
    string public name;

    constructor(address tosAddress, string memory _name)  {
        require(tosAddress != address(0), "SimpleVault: zero address");
        tos = tosAddress;
        name = _name;
    }

    function claimTOS(address to, uint256 amount) external onlyOwner {
        require(IERC20(tos).balanceOf(address(this)) >= amount, "SimpleVault: insufficent");
        IERC20(tos).transfer(
                to,
                amount
            );
    }

    function claimERC20(address token, address to, uint256 amount) external onlyOwner {
        require(IERC20(token).balanceOf(address(this)) >= amount, "SimpleVault: insufficent");
        IERC20(token).safeTransfer(
                to,
                amount
            );
    }

    function balanceTOS() external view returns (uint256){
        return IERC20(tos).balanceOf(address(this));
    }

    function balanceERC20(address token) external view returns (uint256){
        return IERC20(token).balanceOf(address(this));
    }

}
