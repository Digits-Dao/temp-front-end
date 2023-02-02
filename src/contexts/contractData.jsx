import NumFormatter from '../non-visual-logic/NumFormatter';
import { DIGITS } from '../non-visual-logic/DigitsConstants';
import { createResource, createEffect, createContext, useContext } from 'solid-js';
import { readContracts } from '@wagmi/core';
import { utils } from 'ethers';

const ContractDataContext = createContext();

export function ContractDataProvider(props) {
  const [data, { mutate, refetch }] = createResource(async (source, { value, refetching }) => {
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
  });

  const contract = { data, mutate, refetch };

  // setInterval(() => {
  //   console.log('refetching contract data');
  //   refetch();
  // }, 10_000);

  // createEffect(() => {
  //   console.log(data());
  // });

  return (
    <ContractDataContext.Provider value={contract}>{props.children}</ContractDataContext.Provider>
  );
}

export function useContractData() {
  return useContext(ContractDataContext);
}
