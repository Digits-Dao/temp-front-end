import { WagmiProvider } from '../contexts/wagmiConfig';
import { wagmiClient } from '../non-visual-logic/wagmiClient'; // must include: implicit dependency
import { AddressProvider } from '../contexts/address';
import WalletButton from './wallet';
import DataBanner from './dataBanner';
import MyPortfolio from './myPortfolio';
import ContractReader from '../non-visual-logic/contractReader';
import { ContractDataProvider } from '../contexts/contractData';
import { ContractAddrDataProvider } from '../contexts/contractAddrData';

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
          </ContractAddrDataProvider>
        </ContractDataProvider>
      </AddressProvider>
    </WagmiProvider>
  );
}
