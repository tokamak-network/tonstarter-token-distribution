# Events Summary:

- [`SetNewClaimer(address newClaimer)`](#VaultEvent-SetNewClaimer-address-)

- [`AllocatedAmount(uint256 round, uint256 amount)`](#VaultEvent-AllocatedAmount-uint256-uint256-)

- [`AddedWhitelist(uint256 round, address[] users)`](#VaultEvent-AddedWhitelist-uint256-address---)

- [`StartedRound(uint256 round)`](#VaultEvent-StartedRound-uint256-)

- [`Started()`](#VaultEvent-Started--)

- [`Claimed(address caller, uint256 amount, uint256 totalClaimedAmount)`](#VaultEvent-Claimed-address-uint256-uint256-)

- [`Withdrawal(address caller, uint256 amount)`](#VaultEvent-Withdrawal-address-uint256-)

###### *VaultEvent-SetNewClaimer-address-*

# Event `SetNewClaimer`

**emit SetNewClaimer(address newClaimer)**

event on set claimer

### Parameters:

- `newClaimer`: new claimer address

###### *VaultEvent-AllocatedAmount-uint256-uint256-*

# Event `AllocatedAmount`

**emit AllocatedAmount(uint256 round, uint256 amount)**

event on allocate amount

### Parameters:

- `round`:  it is the period unit can claim once

- `amount`: total claimable amount

###### *VaultEvent-AddedWhitelist-uint256-address---*

# Event `AddedWhitelist`

**emit AddedWhitelist(uint256 round, address[] users)**

event on add whitelist

### Parameters:

- `round`:  it is the period unit can claim once

- `users`: people who can claim in that round

###### *VaultEvent-StartedRound-uint256-*

# Event `StartedRound`

**emit StartedRound(uint256 round)**

event on start round

### Parameters:

- `round`:  it is the period unit can claim once

###### *VaultEvent-Started--*

# Event `Started`

**emit Started()**

event on start

###### *VaultEvent-Claimed-address-uint256-uint256-*

# Event `Claimed`

**emit Claimed(address caller, uint256 amount, uint256 totalClaimedAmount)**

event on claim

### Parameters:

- `caller`:  claimer

- `amount`:  the claimed amount of caller

- `totalClaimedAmount`:  total claimed amount

###### *VaultEvent-Withdrawal-address-uint256-*

# Event `Withdrawal`

**emit Withdrawal(address caller, uint256 amount)**

event on withdraw

### Parameters:

- `caller`:  owner

- `amount`:  the withdrawable amount of owner
