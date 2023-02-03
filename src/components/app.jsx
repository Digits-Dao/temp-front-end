import { WagmiProvider } from '../contexts/wagmiConfig';
import { wagmiClient } from '../non-visual-logic/wagmiClient'; // must include: implicit dependency
import { AddressProvider } from '../contexts/address';
import WalletButton from './wallet';
import DataBanner from './dataBanner';
import MyPortfolio from './myPortfolio';
import ContractReader from '../non-visual-logic/contractReader';
import ClaimButton from './claimButton';
import CompoundButton from './compoundButton';
import { ContractDataProvider } from '../contexts/contractData';
import { ContractAddrDataProvider } from '../contexts/contractAddrData';

import { Toaster } from 'solid-toast';

export default function App() {
  return (
    <WagmiProvider client={wagmiClient}>
      <AddressProvider>
        <ContractDataProvider>
          <ContractAddrDataProvider>
            <ContractReader />
            <WalletButton />
            <DataBanner />
            <h1>=============</h1>
            <MyPortfolio />
            <ClaimButton />
            <CompoundButton />

            <Toaster position="top-center" />
          </ContractAddrDataProvider>
        </ContractDataProvider>
      </AddressProvider>
    </WagmiProvider>
  );
}
