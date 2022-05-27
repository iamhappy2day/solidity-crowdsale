// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "./Kyc.sol";
import "./Crowdsale.sol";

contract MyTokenSale is Crowdsale {
    Kyc kyc;
    // r w t = rate wallet token. Naming was changed to prevent issues regarding update OZ crowdsale contract
    constructor( uint256 r, address payable w, IERC20 t, Kyc _kyc)
    Crowdsale(r, w, t) public {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override(Crowdsale) {
        require(kyc.checkKyc(msg.sender), "Kyc not competed! You can't purchase");
        super._preValidatePurchase(beneficiary, weiAmount);
    }
}  