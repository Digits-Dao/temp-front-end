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

              <Toaster position="top-center" />
            </BlockNumberProvider>
          </ContractAddrDataProvider>
        </ContractDataProvider>
      </AddressProvider>
    </WagmiProvider>
  );
}
