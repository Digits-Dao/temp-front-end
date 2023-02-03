import { prepareWriteContract, writeContract } from '@wagmi/core';
import { createSignal, createEffect, createResource } from 'solid-js';
import { DIGITS } from '../non-visual-logic/digitsConstants';
import { useContractAddrData } from '../contexts/contractAddrData';
import toast from 'solid-toast';

// const makePromise = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const toss = Math.random();
//       if (toss > 0.5) resolve('Successful!');
//       reject('Something went wrong!');
//     }, 2000);
//   });
// };

export default function ClaimButton() {
  const [, hasClaimableDAI] = useContractAddrData();

  const [claimData] = createResource(hasClaimableDAI, async () => {
    let claimConfig = null;
    try {
      claimConfig = await prepareWriteContract({
        ...DIGITS.contracts.erc20,
        functionName: 'claim',
      });

      console.log('=== AFTER prepareWriteContract ===');
    } catch {
      console.error('[ClaimButton] prepareWriteContract failed');
    }

    return claimConfig;
  });

  const [clickEvent, setClickEvent] = createSignal();
  const [claimTxnData] = createResource(clickEvent, async () => {
    let data = null;
    try {
      data = await writeContract(claimData());

      toast.promise(data.wait, {
        loading: 'Claiming DAI',
        success: 'DAI claimed!',
        error: 'An error occurred 😔',
      });
    } catch {
      toast.error('Oops! Something went wrong');
      console.error('[ClaimButton] writeContract failed');
    }

    return data;
  });

  createEffect(() => {
    console.log('claimTxnData');
    console.log(claimTxnData());
  });

  return (
    <button
      type="button"
      class="mt-10 rounded-bl-xl border bg-slate-100 text-base font-semibold text-indigo-900 shadow-lg hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={(e) => setClickEvent(e)}
      disabled={!hasClaimableDAI()}
      // disabled={false}
      title={hasClaimableDAI() ? '' : 'No DAI to claim'}
    >
      Claim
    </button>
  );
}
