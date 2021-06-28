# Functions:

 - [`constructor(string _name, address _token, uint256 _inputMaxOnce)`](#DesignedVault-constructor-string-address-uint256-)

 - [`initialize(uint256 _totalAllocatedAmount, uint256 _totalClaims, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)`](#DesignedVault-initialize-uint256-uint256-uint256-uint256-uint256-)

 - [`setClaimer(address _newClaimer)`](#DesignedVault-setClaimer-address-)

 - [`allocateAmount(uint256 round, uint256 amount)`](#DesignedVault-allocateAmount-uint256-uint256-)

 - [`addWhitelist(uint256 round, address[] users)`](#DesignedVault-addWhitelist-uint256-address---)

 - [`startRound(uint256 round)`](#DesignedVault-startRound-uint256-)

 - [`start()`](#DesignedVault-start--)

 - [`nextClaimStartTime()`](#DesignedVault-nextClaimStartTime--)

 - [`nextClaimRound()`](#DesignedVault-nextClaimRound--)

 - [`currentRound()`](#DesignedVault-currentRound--)

 - [`unclaimedInfos()`](#DesignedVault-unclaimedInfos--)

 - [`claim()`](#DesignedVault-claim--)

 - [`availableWithdrawAmount()`](#DesignedVault-availableWithdrawAmount--)

 - [`withdraw(address to)`](#DesignedVault-withdraw-address-)

 - [`getTgeInfos(uint256 round)`](#DesignedVault-getTgeInfos-uint256-)

 - [`getWhitelistInfo(uint256 round, address user)`](#DesignedVault-getWhitelistInfo-uint256-address-)

# Events:

- [`SetNewClaimer(address newClaimer)`](#DesignedVault-SetNewClaimer-address-)

- [`AllocatedAmount(uint256 round, uint256 amount)`](#DesignedVault-AllocatedAmount-uint256-uint256-)

- [`AddedWhitelist(uint256 round, address[] users)`](#DesignedVault-AddedWhitelist-uint256-address---)

- [`StartedRound(uint256 round)`](#DesignedVault-StartedRound-uint256-)

- [`Started()`](#DesignedVault-Started--)

- [`Claimed(address caller, uint256 amount, uint256 totalClaimedAmount)`](#DesignedVault-Claimed-address-uint256-uint256-)

- [`Withdrawal(address caller, uint256 amount)`](#DesignedVault-Withdrawal-address-uint256-)

###### *DesignedVault-constructor-string-address-uint256-*

## Function `constructor`

**constructor(string _name, address _token, uint256 _inputMaxOnce)**

constructor

### Parameters:

- `_name`: Vault's name

- `_token`: Allocated token address

###### *DesignedVault-initialize-uint256-uint256-uint256-uint256-uint256-*

## Function `initialize`

**initialize(uint256 _totalAllocatedAmount, uint256 _totalClaims, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)**

initialization function

### Parameters:

- `_totalAllocatedAmount`: total allocated amount

- `_totalClaims`: total available claim count

- `_totalTgeCount`:   total tge count

- `_startTime`: start time

- `_periodTimesPerCliam`: period time per claim

###### *DesignedVault-setClaimer-address-*

## Function `setClaimer`

**setClaimer(address _newClaimer)**

set claimer

### Parameters:

- `_newClaimer`: new claimer

###### *DesignedVault-allocateAmount-uint256-uint256-*

## Function `allocateAmount`

**allocateAmount(uint256 round, uint256 amount)**

allocate amount for each round

### Parameters:

- `round`:  it is the period unit can claim once

- `amount`: total claimable amount

###### *DesignedVault-addWhitelist-uint256-address---*

## Function `addWhitelist`

**addWhitelist(uint256 round, address[] users)**

Register the white list for the round.

### Parameters:

- `round`:  it is the period unit can claim once

- `users`: people who can claim in that round

###### *DesignedVault-startRound-uint256-*

## Function `startRound`

**startRound(uint256 round)**

start round, Calculate how much the whitelisted people in the round can claim.

### Parameters:

- `round`:  it is the period unit can claim once

###### *DesignedVault-start--*

## Function `start`

**start()**

start round for claimer , The amount charged at one time is determined.

###### *DesignedVault-nextClaimStartTime--*

## Function `nextClaimStartTime`

**nextClaimStartTime()**

next claimable start time

###### *DesignedVault-nextClaimRound--*

## Function `nextClaimRound`

**nextClaimRound()**

next claimable round

###### *DesignedVault-currentRound--*

## Function `currentRound`

**currentRound()**

No description

###### *DesignedVault-unclaimedInfos--*

## Function `unclaimedInfos`

**unclaimedInfos()**

number of unclaimed

###### *DesignedVault-claim--*

## Function `claim`

**claim()**

claim

###### *DesignedVault-availableWithdrawAmount--*

## Function `availableWithdrawAmount`

**availableWithdrawAmount()**

Amount that can be withdrawn by the owner

###### *DesignedVault-withdraw-address-*

## Function `withdraw`

**withdraw(address to)**

withdraw to whom

### Parameters:

- `to`: to address to send

###### *DesignedVault-getTgeInfos-uint256-*

## Function `getTgeInfos`

**getTgeInfos(uint256 round)**

get Tge infos

### Parameters:

- `round`:  it is the period unit can claim once

###### *DesignedVault-getWhitelistInfo-uint256-address-*

## Function `getWhitelistInfo`

**getWhitelistInfo(uint256 round, address user)**

get the claim info of whitelist's person

### Parameters:

- `round`:  it is the period unit can claim once

- `user`: person in whitelist

###### *DesignedVault-SetNewClaimer-address-*

## Event `SetNewClaimer(address newClaimer)`

event on set claimer

### Parameters:

- `newClaimer`: new claimer address

###### *DesignedVault-AllocatedAmount-uint256-uint256-*

## Event `AllocatedAmount(uint256 round, uint256 amount)`

event on allocate amount

### Parameters:

- `round`:  it is the period unit can claim once

- `amount`: total claimable amount

###### *DesignedVault-AddedWhitelist-uint256-address---*

## Event `AddedWhitelist(uint256 round, address[] users)`

event on add whitelist

### Parameters:

- `round`:  it is the period unit can claim once

- `users`: people who can claim in that round

###### *DesignedVault-StartedRound-uint256-*

## Event `StartedRound(uint256 round)`

event on start round

### Parameters:

- `round`:  it is the period unit can claim once

###### *DesignedVault-Started--*

## Event `Started()`

event on start

###### *DesignedVault-Claimed-address-uint256-uint256-*

## Event `Claimed(address caller, uint256 amount, uint256 totalClaimedAmount)`

event on claim

### Parameters:

- `caller`:  claimer

- `amount`:  the claimed amount of caller

- `totalClaimedAmount`:  total claimed amount

###### *DesignedVault-Withdrawal-address-uint256-*

## Event `Withdrawal(address caller, uint256 amount)`

event on withdraw

### Parameters:

- `caller`:  owner

- `amount`:  the withdrawable amount of owner
