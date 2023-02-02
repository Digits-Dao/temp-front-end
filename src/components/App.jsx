import { WagmiProvider } from '../contexts/wagmiConfig';
import { wagmiClient } from '../non-visual-logic/WagmiClient'; // must include: implicit dependency
import { AddressProvider } from '../contexts/address';
import WalletButton from './Wallet';
import DataBanner from './DataBanner';
import MyPortfolio from './MyPortfolio';
import ContractReader from './contractReader';
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
            {/* <ContractData /> */}
            <DataBanner />
            <h1>=============</h1>
            <MyPortfolio />
          </ContractAddrDataProvider>
        </ContractDataProvider>
      </AddressProvider>
    </WagmiProvider>
  );
}
