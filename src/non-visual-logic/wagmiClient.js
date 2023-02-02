import { configureChains, createClient } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { publicProvider } from '@wagmi/core/providers/public';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc';
import { Web3Modal } from '@web3modal/html';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';

const chains = [mainnet];

// Wagmi Core Client
// TODO: Move projectId to env instead of hardcoding
const { provider } = configureChains(chains, [
  jsonRpcProvider({
    priority: 0,
    rpc: () => ({
      http: 'https://eth.llamarpc.com',
    }),
  }),
  jsonRpcProvider({
    priority: 1,
    rpc: () => ({
      http: 'https://api.securerpc.com/v1',
    }),
  }),
  publicProvider({ priority: 2 }),
  walletConnectProvider({ priority: 3, projectId: 'cd3195fb141f8aebac77cc5e44b5edca' }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'Digits DAO', chains }),
  provider,
});

// Web3Modal and Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal({ projectId: 'cd3195fb141f8aebac77cc5e44b5edca' }, ethereumClient);

export { wagmiClient };
