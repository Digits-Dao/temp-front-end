// TODO: If address isn't imported here, the wallet contract reading breaks. Must be Astro?
import NumFormatter from '../NumFormatter';
import { DIGITS } from '../DigitsConstants';
import { createResource, createEffect, createSignal } from 'solid-js';
import { readContracts } from '@wagmi/core';
import { utils } from 'ethers';

const [contractData, { mutate: mutateContractData, refetch: refetchContractData }] = createResource(
  async (source, { value, refetching }) => {
    console.log(`running contractData`);

    const readContractsResp = await readContracts({
      contracts: [
        {
          ...DIGITS.contracts.uniV2,
          functionName: 'getReserves',
        },
        {
          ...DIGITS.contracts.dividends,
          functionName: 'totalDividendsDistributed',
        },
        {
          ...DIGITS.contracts.erc20,
          functionName: 'balanceOf',
          args: ['0x000000000000000000000000000000000000dEaD'],
        },
      ],
    });

    const floatDigitsPrice =
      parseFloat(utils.formatEther(readContractsResp[0]._reserve0)) /
      parseFloat(utils.formatEther(readContractsResp[0]._reserve1));
    const digitsPrice = floatDigitsPrice.toFixed(5);

    const dividendsPaid = NumFormatter(
      DIGITS.avaxDividendsDistributed + parseFloat(utils.formatEther(readContractsResp[1])),
      2
    );

    const floatValueBurnt = parseFloat(utils.formatEther(readContractsResp[2])) * floatDigitsPrice;
    const totalValueBurnt = NumFormatter(floatValueBurnt, 2);

    const fullyDilutedMcap = NumFormatter(
      DIGITS.totalSupply * floatDigitsPrice - floatValueBurnt,
      2
    );

    return {
      digitsPrice,
      dividendsPaid,
      totalValueBurnt,
      fullyDilutedMcap,
    };
  }
);

export default function DataBanner() {
  setInterval(() => {
    console.log('refetching contract data');
    refetchContractData();
  }, 10_000);

  createEffect(() => {
    console.log(contractData());
  });

  return (
    <>
      <h1>Digits Price: ${contractData()?.digitsPrice}</h1>
      <h1>Dividens Paid: ${contractData()?.dividendsPaid}</h1>
      <h1>Total Value Burnt: ${contractData()?.totalValueBurnt}</h1>
      <h1>Fully Diluted Mcap: ${contractData()?.fullyDilutedMcap}</h1>
    </>
  );
}
