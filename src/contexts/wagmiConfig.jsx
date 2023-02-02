import { createSignal, createContext, useContext } from 'solid-js';

const WagmiConfigContext = createContext();

export function WagmiProvider(props) {
  const [wagmiClient] = createSignal(props.wagmiClient || null);

  return (
    <WagmiConfigContext.Provider value={wagmiClient}>{props.children}</WagmiConfigContext.Provider>
  );
}

export function useWagmi() {
  return useContext(WagmiConfigContext);
}
