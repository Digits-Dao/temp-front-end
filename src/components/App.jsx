import { WagmiProvider } from '../contexts/wagmiConfig';
import { wagmiClient } from '../non-visual-logic/WagmiClient'; // must include: implicit dependency
import { AddressProvider } from '../contexts/address';
import WalletButton from './Wallet';
// import DataBanner from './DataBanner';
// import { MyPortfolio } from './MyPortfolio';

export default function App() {
  return (
    <WagmiProvider client={wagmiClient}>
      <AddressProvider>
        <WalletButton />
        {/* <DataBanner /> */}
        <h1>=============</h1>
        {/* <MyPortfolio /> */}
      </AddressProvider>
    </WagmiProvider>
  );
}
