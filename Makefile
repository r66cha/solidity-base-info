# -- Variables
LOCALHOST := localhost
SEPOLIA := sepolia
ARBITRUM := arbitrum-sepolia
MAINNET := mainnet
CURRENT := $(LOCALHOST)
NETWORK := --network $(CURRENT)

# -- Common

recompile:
	npx hardhat clean && npx hardhat compile

# -- Contracts

# SimplePay contract
# Deploy:
# -- Localhost
# Localhost:                       npx hardhat run scripts/SimplePay/transactions/deploy/ts --network localhost
# Localhost (ignition):            npx hardhat ignition deploy ./ignition/modules/SimplePay.ts --network localhost
# -- Testnets
# L1 Sepolia:                      npx hardhat run scripts/SimplePay/transactions/deploy/ts --network sepolia
# L1 Sepolia +verify:              npx hardhat run scripts/SimplePay/transactions/deploy/ts --network sepolia --verify
# L1 Sepolia (ignition):           npx hardhat ignition deploy ./ignition/modules/SimplePay.ts --network sepolia
# L1 Sepolia +verify (ignition):   npx hardhat ignition deploy ./ignition/modules/SimplePay.ts --network sepolia --verify
# L1 Sepolia verify all:           npx hardhat verify --network sepolia
# L1 Sepolia verify current:       npx hardhat verify --network sepolia 0x...
# L2 Arbitrum Sepolia:             npx hardhat run scripts/SimplePay/transactions/deploy.ts --network arbitrum-sepolia
# L2 Arbitrum Sepolia (ignition):  npx hardhat ignition deploy ./ignition/modules/SimplePay.ts --network arbitrum-sepolia
# L2 Arbitrum Sepolia verify       forge verify-contract \
								   0x7D36bFe40379aF286AEfA75E1F0B51480145249B \
								   contracts/SimplePay.sol:SimplePay \
								   $ARBISCAN_KEY \
								   --chain arbitrum-sepolia \
								   --compiler-version v0.8.28
# -- Mainnet
# ...
# -- calls
sp_balance:
	npx hardhat run scripts/SimplePay/calls/balance.ts $(NETWORK)
sp_myPayments:
	npx hardhat run scripts/SimplePay/calls/myPayments.ts $(NETWORK)
sp_payments:
	npx hardhat run scripts/SimplePay/calls/payments.ts $(NETWORK)
address_balance:
	npx hardhat run scripts/_common/addressBalance.ts $(NETWORK)
# -- tx
sp_deploy:
	npx hardhat run scripts/SimplePay/transactions/deploy.ts $(NETWORK)
sp_pay:
	npx hardhat run scripts/SimplePay/transactions/pay.ts $(NETWORK)
sp_withdraw:
	npx hardhat run scripts/SimplePay/transactions/withdraw.ts $(NETWORK)
sp_receive:
	npx hardhat run scripts/SimplePay/transactions/receive.ts $(NETWORK)
sp_fallback:
	npx hardhat run scripts/SimplePay/transactions/fallback.ts $(NETWORK)
# -- events
sp_events:
	npx hardhat run scripts/SimplePay/ws/eventsListen.ts $(NETWORK)
# End

# Other contract
#...