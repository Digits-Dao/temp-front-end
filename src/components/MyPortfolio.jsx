import { address } from './Wallet';
import NumFormatter from '../NumFormatter';
import { DIGITS } from '../DigitsConstants';
import { createResource, createEffect, createSignal } from 'solid-js';
import { readContracts } from '@wagmi/core';
import { utils } from 'ethers';

// createResource is only called when address !== false, null, undefined
// so, we rely on only valid addresses being passed in to trigger balance reads with
const [walletData, { mutate: mutateWalletData, refetch: refetchWalletData }] = createResource(
  address,
  async (source, { value, refetching }) => {
    console.log(`running fetchBalance w/ address: ${source}`);

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
    const strVals = readContractsResp.map((x) => NumFormatter(parseFloat(utils.formatEther(x)), 2));

    return {
      digitsBalance: strVals[0],
      claimableDAI: strVals[1],
      totalClaimedDAI: strVals[2],
    };
  }
);

function MyPortfolio() {
  const [intervalId, setIntervalId] = createSignal(null);

  // TODO: Hook Up Front End Refresh Interval
  createEffect(() => {
    console.log(`Address: ${address()}`);
    if (address() === null) {
      mutateWalletData(null);
      clearInterval(intervalId());
    } else {
      setIntervalId(
        setInterval(() => {
          console.log('refetching wallet data');
          refetchWalletData();
        }, 10_000)
      );
    }
  });

  createEffect(() => {
    console.log(walletData());
    console.log(walletData()?.digitsBalance);
  });

  return (
    <>
      <h1>{walletData.error && 'Error...'}</h1>
      <h1>{walletData.loading && 'Loading...'}</h1>
      <h1>Digits Balance: {walletData()?.digitsBalance}</h1>
      <h1>Claimable DAI: ${walletData()?.claimableDAI}</h1>
      <h1>Total Claimed DAI: ${walletData()?.totalClaimedDAI}</h1>
    </>
  );
}

export { MyPortfolio, walletData, mutateWalletData, refetchWalletData };
