import NumFormatter from '../non-visual-logic/numFormatter';
import { DIGITS } from '../non-visual-logic/digitsConstants';
import { createResource, createContext, useContext } from 'solid-js';
import { readContracts } from '@wagmi/core';
import { utils } from 'ethers';

const ContractDataContext = createContext();

export function ContractDataProvider(props) {
  const [data, { mutate, refetch }] = createResource(async (source, { value, refetching }) => {
    const resp = await readContracts({
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
      parseFloat(utils.formatEther(resp[0]._reserve0)) /
      parseFloat(utils.formatEther(resp[0]._reserve1));
    const digitsPrice = floatDigitsPrice.toFixed(5);

    const dividendsPaid = NumFormatter(
      DIGITS.avaxDividendsDistributed + parseFloat(utils.formatEther(resp[1])),
      2
    );

    const floatValueBurnt = parseFloat(utils.formatEther(resp[2])) * floatDigitsPrice;
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

  return (
    <ContractDataContext.Provider value={contract}>{props.children}</ContractDataContext.Provider>
  );
}

export function useContractData() {
  return useContext(ContractDataContext);
}
