import { WagmiProvider } from '../contexts/wagmiConfig';
import { wagmiClient } from '../non-visual-logic/wagmiClient'; // must include: implicit dependency
import { AddressProvider } from '../contexts/address';
import ContractReader from '../non-visual-logic/contractReader';
import AppBody from './appBody';
import { ContractDataProvider } from '../contexts/contractData';
import { ContractAddrDataProvider } from '../contexts/contractAddrData';

import { Toaster } from 'solid-toast';
import { BlockNumberProvider } from '../contexts/blockNumber';

export default function App() {
  return (
    <WagmiProvider client={wagmiClient}>
      <AddressProvider>
        <ContractDataProvider>
          <ContractAddrDataProvider>
            <BlockNumberProvider>
              <ContractReader />

              <AppBody />

              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))',
                    '--tw-gradient-from': '#1e40af',
                    '--tw-gradient-to': 'rgb(30 64 175 / 0)',
                    '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)',
                    '--tw-gradient-to': '#312e81',
                    color: '#fff',
                  },
                }}
              />
            </BlockNumberProvider>
          </ContractAddrDataProvider>
        </ContractDataProvider>
      </AddressProvider>
    </WagmiProvider>
  );
}
