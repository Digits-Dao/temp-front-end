import { createSignal, createContext, useContext } from 'solid-js';
import { watchAccount } from '@wagmi/core';

const AddressContext = createContext();

export function AddressProvider(props) {
  const [address, setAddress] = createSignal(null);

  watchAccount((account) => {
    setAddress(account.address === undefined ? null : account.address);
  });

  return <AddressContext.Provider value={address}>{props.children}</AddressContext.Provider>;
}

export function useAddress() {
  return useContext(AddressContext);
}
