import { useContractAddrData } from '../contexts/contractAddrData';
import { useContractData } from '../contexts/contractData';
import { createSignal, createEffect, on } from 'solid-js';
import { useAddress } from '../contexts/address';
import { watchBlockNumber } from '@wagmi/core';

export default function ContractReader() {
  const contractData = useContractData();
  const contractAddrData = useContractAddrData();
  const address = useAddress();

  const [blockNumber, setBlockNumber] = createSignal(0);

  watchBlockNumber({ listen: true }, (blockNumber) => {
    setBlockNumber(blockNumber);
  });

  createEffect(
    on(blockNumber, () => {
      contractData.refetch();
      contractAddrData.refetch();
    })
  );

  createEffect(() => {
    console.log(contractData.data());
  });

  createEffect(() => {
    console.log(contractAddrData.data());
  });

  return;
}
