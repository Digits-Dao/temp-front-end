import { createSignal, createEffect, createContext, useContext } from 'solid-js';
import { watchBlockNumber } from '@wagmi/core';

const BlockNumberContext = createContext();

export function BlockNumberProvider(props) {
  const [blockNumber, setBlockNumber] = createSignal(0);

  // createEffect(() => console.log(`Block Number Updated: ${blockNumber()}`));

  watchBlockNumber({ listen: true }, (blockNumber) => {
    setBlockNumber(blockNumber);
  });

  return (
    <BlockNumberContext.Provider value={blockNumber}>{props.children}</BlockNumberContext.Provider>
  );
}

export function useBlockNumber() {
  return useContext(BlockNumberContext);
}
