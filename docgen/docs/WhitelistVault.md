# Functions Summary:

- [`constructor(string _name, address _token, uint256 _inputMaxOnce)`](#WhitelistVault-constructor-string-address-uint256-)

- [`initialize(uint256 _totalAllocatedAmount, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)`](#WhitelistVault-initialize-uint256-uint256-uint256-uint256-)

- [`allocateAmount(uint256 round, uint256 amount)`](#WhitelistVault-allocateAmount-uint256-uint256-)

- [`addWhitelist(uint256 round, address[] users)`](#WhitelistVault-addWhitelist-uint256-address---)

- [`startRound(uint256 round)`](#WhitelistVault-startRound-uint256-)

- [`startRoundTime(uint256 round)`](#WhitelistVault-startRoundTime-uint256-)

- [`currentRound()`](#WhitelistVault-currentRound--)

- [`unclaimedInfos()`](#WhitelistVault-unclaimedInfos--)

- [`claim()`](#WhitelistVault-claim--)

- [`availableWithdrawAmount()`](#WhitelistVault-availableWithdrawAmount--)

- [`withdraw(address to)`](#WhitelistVault-withdraw-address-)

- [`getTgeInfos(uint256 round)`](#WhitelistVault-getTgeInfos-uint256-)

- [`getWhitelistInfo(uint256 round, address user)`](#WhitelistVault-getWhitelistInfo-uint256-address-)

# Events Summary:

- [`SetNewClaimer(address newClaimer)`](#WhitelistVault-SetNewClaimer-address-)

- [`AllocatedAmount(uint256 round, uint256 amount)`](#WhitelistVault-AllocatedAmount-uint256-uint256-)

- [`AddedWhitelist(uint256 round, address[] users)`](#WhitelistVault-AddedWhitelist-uint256-address---)

- [`StartedRound(uint256 round)`](#WhitelistVault-StartedRound-uint256-)

- [`Started()`](#WhitelistVault-Started--)

- [`Claimed(address caller, uint256 amount, uint256 totalClaimedAmount)`](#WhitelistVault-Claimed-address-uint256-uint256-)

- [`Withdrawal(address caller, uint256 amount)`](#WhitelistVault-Withdrawal-address-uint256-)

###### *WhitelistVault-constructor-string-address-uint256-*

# Function `constructor`

**constructor(string _name, address _token, uint256 _inputMaxOnce)**

constructor

### Parameters:

- `_name`: Vault's name

- `_token`: Allocated token address

###### *WhitelistVault-initialize-uint256-uint256-uint256-uint256-*

# Function `initialize`

**initialize(uint256 _totalAllocatedAmount, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)**

initialization function

### Parameters:

- `_totalAllocatedAmount`: total allocated amount

- `_totalTgeCount`:   total tge count

- `_startTime`: start time

- `_periodTimesPerCliam`: period time per claim

###### *WhitelistVault-allocateAmount-uint256-uint256-*

# Function `allocateAmount`

**allocateAmount(uint256 round, uint256 amount)**

allocate amount for each round

### Parameters:

- `round`:  it is the period unit can claim once

- `amount`: total claimable amount

###### *WhitelistVault-addWhitelist-uint256-address---*

# Function `addWhitelist`

**addWhitelist(uint256 round, address[] users)**

Register the white list for the round.

### Parameters:

- `round`:  it is the period unit can claim once

- `users`: people who can claim in that round

###### *WhitelistVault-startRound-uint256-*

# Function `startRound`

**startRound(uint256 round)**

start round, Calculate how much the whitelisted people in the round can claim.

### Parameters:

- `round`:  it is the period unit can claim once

###### *WhitelistVault-startRoundTime-uint256-*

# Function `startRoundTime`

**startRoundTime(uint256 round)**

next claimable start time

###### *WhitelistVault-currentRound--*

# Function `currentRound`

**currentRound()**

No description

###### *WhitelistVault-unclaimedInfos--*

# Function `unclaimedInfos`

**unclaimedInfos()**

number of unclaimed

###### *WhitelistVault-claim--*

# Function `claim`

**claim()**

claim

###### *WhitelistVault-availableWithdrawAmount--*

# Function `availableWithdrawAmount`

**availableWithdrawAmount()**

Amount that can be withdrawn by the owner

###### *WhitelistVault-withdraw-address-*

# Function `withdraw`

**withdraw(address to)**

withdraw to whom

### Parameters:

- `to`: to address to send

###### *WhitelistVault-getTgeInfos-uint256-*

# Function `getTgeInfos`

**getTgeInfos(uint256 round)**

get Tge infos

### Parameters:

- `round`:  it is the period unit can claim once

###### *WhitelistVault-getWhitelistInfo-uint256-address-*

# Function `getWhitelistInfo`

**getWhitelistInfo(uint256 round, address user)**

get the claim info of whitelist's person

### Parameters:

- `round`:  it is the period unit can claim once

- `user`: person in whitelist

###### *WhitelistVault-SetNewClaimer-address-*

# Event `SetNewClaimer`

**emit SetNewClaimer(address newClaimer)**

event on set claimer

### Parameters:

- `newClaimer`: new claimer address

###### *WhitelistVault-AllocatedAmount-uint256-uint256-*

# Event `AllocatedAmount`

**emit AllocatedAmount(uint256 round, uint256 amount)**

event on allocate amount

### Parameters:

- `round`:  it is the period unit can claim once

- `amount`: total claimable amount

###### *WhitelistVault-AddedWhitelist-uint256-address---*

# Event `AddedWhitelist`

**emit AddedWhitelist(uint256 round, address[] users)**

event on add whitelist

### Parameters:

- `round`:  it is the period unit can claim once

- `users`: people who can claim in that round

###### *WhitelistVault-StartedRound-uint256-*

# Event `StartedRound`

**emit StartedRound(uint256 round)**

event on start round

### Parameters:

- `round`:  it is the period unit can claim once

###### *WhitelistVault-Started--*

# Event `Started`

**emit Started()**

event on start

###### *WhitelistVault-Claimed-address-uint256-uint256-*

# Event `Claimed`

**emit Claimed(address caller, uint256 amount, uint256 totalClaimedAmount)**

event on claim

### Parameters:

- `caller`:  claimer

- `amount`:  the claimed amount of caller

- `totalClaimedAmount`:  total claimed amount

###### *WhitelistVault-Withdrawal-address-uint256-*

# Event `Withdrawal`

**emit Withdrawal(address caller, uint256 amount)**

event on withdraw

### Parameters:

- `caller`:  owner

- `amount`:  the withdrawable amount of owner
