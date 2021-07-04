# Functions Summary:

- [`initializeBase(uint256 _totalAllocatedAmount, uint256 _totalClaims, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)`](#BaseVault-initializeBase-uint256-uint256-uint256-uint256-uint256-)

- [`setMaxInputOnceTimeWhitelist(uint256 _maxInputOnceTime)`](#BaseVault-setMaxInputOnceTimeWhitelist-uint256-)

- [`addWhitelist(uint256 round, address[] users)`](#BaseVault-addWhitelist-uint256-address---)

- [`currentRound()`](#BaseVault-currentRound--)

- [`availableWithdrawAmount()`](#BaseVault-availableWithdrawAmount--)

- [`withdraw(address to)`](#BaseVault-withdraw-address-)

- [`getTgeInfos(uint256 round)`](#BaseVault-getTgeInfos-uint256-)

- [`getWhitelistInfo(uint256 round, address user)`](#BaseVault-getWhitelistInfo-uint256-address-)

- [`totalWhitelist(uint256 round)`](#BaseVault-totalWhitelist-uint256-)

###### *BaseVault-initializeBase-uint256-uint256-uint256-uint256-uint256-*

# Function `initializeBase`

**initializeBase(uint256 _totalAllocatedAmount, uint256 _totalClaims, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)**

initialization function

### Parameters:

- `_totalAllocatedAmount`: total allocated amount

- `_totalTgeCount`:   total tge count

- `_startTime`: start time

- `_periodTimesPerCliam`: period time per claim

###### *BaseVault-setMaxInputOnceTimeWhitelist-uint256-*

# Function `setMaxInputOnceTimeWhitelist`

**setMaxInputOnceTimeWhitelist(uint256 _maxInputOnceTime)**

set max input at once time of whitelist

### Parameters:

- `_maxInputOnceTime`:  max input at once time

###### *BaseVault-addWhitelist-uint256-address---*

# Function `addWhitelist`

**addWhitelist(uint256 round, address[] users)**

Register the white list for the round.

### Parameters:

- `round`:  it is the period unit can claim once

- `users`: people who can claim in that round

###### *BaseVault-currentRound--*

# Function `currentRound`

**currentRound()**

No description

###### *BaseVault-availableWithdrawAmount--*

# Function `availableWithdrawAmount`

**availableWithdrawAmount()**

Amount that can be withdrawn by the owner

###### *BaseVault-withdraw-address-*

# Function `withdraw`

**withdraw(address to)**

withdraw to whom

### Parameters:

- `to`: to address to send

###### *BaseVault-getTgeInfos-uint256-*

# Function `getTgeInfos`

**getTgeInfos(uint256 round)**

get Tge infos

### Parameters:

- `round`:  it is the period unit can claim once

### Return Values:

- allocated whether allocated

- started whether started

- allocatedAmount allocated amount

- claimedCount claimed  count

- amount the claimeable amount by person in TGE period

- whitelist who can claim in TGE period

###### *BaseVault-getWhitelistInfo-uint256-address-*

# Function `getWhitelistInfo`

**getWhitelistInfo(uint256 round, address user)**

get the claim info of whitelist's person

### Parameters:

- `round`:  it is the period unit can claim once

- `user`: person in whitelist

### Return Values:

- joined whether joined

- claimedTime the claimed time

###### *BaseVault-totalWhitelist-uint256-*

# Function `totalWhitelist`

**totalWhitelist(uint256 round)**

get the claim info of whitelist's person

### Parameters:

- `round`:  it is the period unit can claim once

### Return Values:

- total the total count of whitelist in TGE round
