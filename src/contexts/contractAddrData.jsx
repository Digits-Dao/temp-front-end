import NumFormatter from '../non-visual-logic/numFormatter';
import { DIGITS } from '../non-visual-logic/digitsConstants';
import { createResource, createEffect, createSignal, createContext, useContext } from 'solid-js';
import { readContracts } from '@wagmi/core';
import { utils } from 'ethers';
import { useAddress } from './address';
import { useContractData } from './contractData';

const ContractAddrDataContext = createContext();

export function ContractAddrDataProvider(props) {
  const address = useAddress();
  const contractData = useContractData();
  const [hasClaimableDAI, setHasClaimableDAI] = createSignal(false);

  // createResource is only called when address !== false, null, undefined
  // so, we rely on only valid addresses being passed in to trigger balance reads with
  const [data, { mutate, refetch }] = createResource(
    address,
    async (source, { value, refetching }) => {
      const resp = await readContracts({
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
      const floatVals = resp.map((x) => parseFloat(utils.formatEther(x)));
      const strVals = floatVals.map((x) => NumFormatter(x, 2));

      setHasClaimableDAI(floatVals[1] > 0);
      // setHasClaimableDAI(!hasClaimableDAI());

      return {
        digitsBalance: strVals[0],
        digitsBalanceUSD: NumFormatter(floatVals[0] * contractData.data()?.digitsPrice, 2),
        claimableDAI: strVals[1],
        totalClaimedDAI: strVals[2],
      };
    }
  );

  createEffect(() => {
    if (address() === null) mutate(null);
  });

  // createEffect(() => console.log(`hasClaimableDAI(): ${hasClaimableDAI()}`));

  const contract = { data, mutate, refetch };

  return (
    <ContractAddrDataContext.Provider value={[contract, hasClaimableDAI]}>
      {props.children}
    </ContractAddrDataContext.Provider>
  );
}

export function useContractAddrData() {
  return useContext(ContractAddrDataContext);
}
