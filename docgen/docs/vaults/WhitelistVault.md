# Functions Summary:

- [`constructor(string _name, address _token, uint256 _inputMaxOnce)`](#WhitelistVault-constructor-string-address-uint256-)

- [`initialize(uint256 _totalAllocatedAmount, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)`](#WhitelistVault-initialize-uint256-uint256-uint256-uint256-)

- [`allocateAmount(uint256 round, uint256 amount)`](#WhitelistVault-allocateAmount-uint256-uint256-)

- [`startRound(uint256 round)`](#WhitelistVault-startRound-uint256-)

- [`startRoundTime(uint256 round)`](#WhitelistVault-startRoundTime-uint256-)

- [`unclaimedInfos()`](#WhitelistVault-unclaimedInfos--)

- [`claim()`](#WhitelistVault-claim--)

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

###### *WhitelistVault-unclaimedInfos--*

# Function `unclaimedInfos`

**unclaimedInfos()**

number of unclaimed

###### *WhitelistVault-claim--*

# Function `claim`

**claim()**

claim
