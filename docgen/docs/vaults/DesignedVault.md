# Functions Summary:

- [`constructor(string _name, address _token, uint256 _inputMaxOnce)`](#DesignedVault-constructor-string-address-uint256-)

- [`initialize(uint256 _totalAllocatedAmount, uint256 _totalClaims, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)`](#DesignedVault-initialize-uint256-uint256-uint256-uint256-uint256-)

- [`setClaimer(address _newClaimer)`](#DesignedVault-setClaimer-address-)

- [`allocateAmount(uint256 round, uint256 amount)`](#DesignedVault-allocateAmount-uint256-uint256-)

- [`startRound(uint256 round)`](#DesignedVault-startRound-uint256-)

- [`start()`](#DesignedVault-start--)

- [`nextClaimStartTime()`](#DesignedVault-nextClaimStartTime--)

- [`nextClaimRound()`](#DesignedVault-nextClaimRound--)

- [`unclaimedInfos()`](#DesignedVault-unclaimedInfos--)

- [`claim()`](#DesignedVault-claim--)

###### *DesignedVault-constructor-string-address-uint256-*

# Function `constructor`

**constructor(string _name, address _token, uint256 _inputMaxOnce)**

constructor

### Parameters:

- `_name`: Vault's name

- `_token`: Allocated token address

###### *DesignedVault-initialize-uint256-uint256-uint256-uint256-uint256-*

# Function `initialize`

**initialize(uint256 _totalAllocatedAmount, uint256 _totalClaims, uint256 _totalTgeCount, uint256 _startTime, uint256 _periodTimesPerCliam)**

initialization function

### Parameters:

- `_totalAllocatedAmount`: total allocated amount

- `_totalClaims`: total available claim count

- `_totalTgeCount`:   total tge count

- `_startTime`: start time

- `_periodTimesPerCliam`: period time per claim

###### *DesignedVault-setClaimer-address-*

# Function `setClaimer`

**setClaimer(address _newClaimer)**

set claimer

### Parameters:

- `_newClaimer`: new claimer

###### *DesignedVault-allocateAmount-uint256-uint256-*

# Function `allocateAmount`

**allocateAmount(uint256 round, uint256 amount)**

allocate amount for each round

### Parameters:

- `round`:  it is the period unit can claim once

- `amount`: total claimable amount

###### *DesignedVault-startRound-uint256-*

# Function `startRound`

**startRound(uint256 round)**

start round, Calculate how much the whitelisted people in the round can claim.

### Parameters:

- `round`:  it is the period unit can claim once

###### *DesignedVault-start--*

# Function `start`

**start()**

start round for claimer , The amount charged at one time is determined.

###### *DesignedVault-nextClaimStartTime--*

# Function `nextClaimStartTime`

**nextClaimStartTime()**

next claimable start time

###### *DesignedVault-nextClaimRound--*

# Function `nextClaimRound`

**nextClaimRound()**

next claimable round

###### *DesignedVault-unclaimedInfos--*

# Function `unclaimedInfos`

**unclaimedInfos()**

number of unclaimed

###### *DesignedVault-claim--*

# Function `claim`

**claim()**

claim
