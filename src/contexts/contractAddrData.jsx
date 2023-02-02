import NumFormatter from '../non-visual-logic/numFormatter';
import { DIGITS } from '../non-visual-logic/digitsConstants';
import { createResource, createEffect, createSignal, createContext, useContext } from 'solid-js';
import { readContracts } from '@wagmi/core';
import { utils } from 'ethers';
import { useAddress } from './address';

const ContractAddrDataContext = createContext();

export function ContractAddrDataProvider(props) {
  const address = useAddress();

  // createResource is only called when address !== false, null, undefined
  // so, we rely on only valid addresses being passed in to trigger balance reads with
  const [data, { mutate, refetch }] = createResource(
    address,
    async (source, { value, refetching }) => {
      //   console.log(`[walletData] w/ address: ${source}`);

      const readContractsResp = await readContracts({
        contracts: [
          {
            ...DIGITS.contracts.erc20,
            functionName: 'balanceOf',
            args: [source],
          },
          {
            ...DIGITS.contracts.dividends,
            functionName: 'withdrawableDividendOf',
            args: [source],
          },
          {
            ...DIGITS.contracts.dividends,
            functionName: 'withdrawnDividendOf',
            args: [source],
          },
        ],
      });

      // Change BigNum responses to 0, 500.00, 1.35k, 12.54M, etc
      const strVals = readContractsResp.map((x) =>
        NumFormatter(parseFloat(utils.formatEther(x)), 2)
      );

      return {
        digitsBalance: strVals[0],
        claimableDAI: strVals[1],
        totalClaimedDAI: strVals[2],
      };
    }
  );

  createEffect(() => {
    if (address() === null) mutate(null);
  });

  const contract = { data, mutate, refetch };

  return (
    <ContractAddrDataContext.Provider value={contract}>
      {props.children}
    </ContractAddrDataContext.Provider>
  );
}

export function useContractAddrData() {
  return useContext(ContractAddrDataContext);
}
