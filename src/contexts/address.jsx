import { createSignal, createEffect, createContext, useContext } from 'solid-js';
import { watchAccount } from '@wagmi/core';

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [address, setAddress] = createSignal(null);

  createEffect(() => console.log(`Address Updated: ${address()}`));

  watchAccount((account) => {
    console.log(`watchAccount triggered w/ ${account.address}`);
    setAddress(account.address === undefined ? null : account.address);
  });

  return <AddressContext.Provider value={address}>{children}</AddressContext.Provider>;
}

export function useAddress() {
  return useContext(AddressContext);
}
