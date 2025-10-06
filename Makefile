NETWORK := --network localhost

recompile:
	npx hardhat clean && npx hardhat compile

# SimplePay contract

# -- ignition

sp_ignition_deploy:
	npx hardhat ignition deploy ./ignition/modules/SimplePay.ts --network localhost

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