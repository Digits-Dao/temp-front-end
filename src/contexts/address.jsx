import { createSignal, createEffect, createContext, useContext } from 'solid-js';
import { watchAccount } from '@wagmi/core';

const AddressContext = createContext();

export function AddressProvider(props) {
  const [address, setAddress] = createSignal(null);

  createEffect(() => console.log(`Address Updated: ${address()}`));

  watchAccount((account) => {
    console.log(`[watchAccount] w/ ${account.address}`);
    setAddress(account.address === undefined ? null : account.address);
  });

  return <AddressContext.Provider value={address}>{props.children}</AddressContext.Provider>;
}

export function useAddress() {
  return useContext(AddressContext);
}
