import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('SPModule', (m) => {
  const sp = m.contract('SimplePay');

  // Verification should be handled outside the module or after deployment.

  return { sp };
});
