import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('SPModule', (m) => {
  const sp = m.contract('SimplePay');

  return { sp };
});
