import { useContractAddrData } from '../contexts/contractAddrData';
import { useContractData } from '../contexts/contractData';
import { createEffect, on } from 'solid-js';
import { useBlockNumber } from '../contexts/blockNumber';

export default function ContractReader() {
  const blockNumber = useBlockNumber();
  const contractData = useContractData();
  const [contractAddrData] = useContractAddrData();

  createEffect(
    on(blockNumber, () => {
      contractData.refetch();
      contractAddrData.refetch();
    })
  );

  // createEffect(() => {
  //   console.log(contractData.data());
  // });

  // createEffect(() => {
  //   console.log(contractAddrData.data());
  // });

  return;
}
