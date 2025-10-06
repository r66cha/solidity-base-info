recompile:
	npx hardhat clean && npx hardhat compile

# SimplePay contract

# -- calls

sp_balance:
	npx hardhat run scripts/SimplePay/calls/balance.ts --network localhost
sp_myPayments:
	npx hardhat run scripts/SimplePay/calls/myPayments.ts --network localhost
sp_payments:
	npx hardhat run scripts/SimplePay/calls/payments.ts --network localhost

# -- tx

sp_deploy:
	npx hardhat run scripts/SimplePay/transactions/deploy.ts --network localhost
sp_pay:
	npx hardhat run scripts/SimplePay/transactions/pay.ts --network localhost
sp_withdraw:
	npx hardhat run scripts/SimplePay/transactions/withdraw.ts --network localhost 
sp_receive:
	npx hardhat run scripts/SimplePay/transactions/receive.ts --network localhost
sp_fallback:
	npx hardhat run scripts/SimplePay/transactions/fallback.ts --network localhost

# -- events

sp_events:
	npx hardhat run scripts/SimplePay/ws/eventsListen.ts --network localhost

# End