import { prepareWriteContract, writeContract } from '@wagmi/core';
import { createSignal, createEffect, createResource } from 'solid-js';
import { DIGITS } from '../non-visual-logic/digitsConstants';
import { useContractAddrData } from '../contexts/contractAddrData';
import toast from 'solid-toast';

const makePromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const toss = Math.random();
      if (toss > 0.5) resolve('Successful!');
      reject('Something went wrong!');
    }, 2000);
  });
};

export default function ClaimButton() {
  const [, hasClaimableDAI] = useContractAddrData();

  const [claimData, { claimMutate, claimRefetch }] = createResource(
    hasClaimableDAI,
    async (source, { value, refetching }) => {
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
    }
  );

  const [clickEvent, setClickEvent] = createSignal();
  const [claimTxnData, { claimTxnMutate, claimTxnRefetch }] = createResource(
    clickEvent,
    async (source, { value, refetching }) => {
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
    }
  );

  createEffect(() => {
    console.log('claimTxnData');
    console.log(claimTxnData());
  });

  return (
    <div class="ml-4 mt-2 flex-shrink-0">
      <button
        type="button"
        class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={(e) => setClickEvent(e)}
        disabled={!hasClaimableDAI()}
        title={hasClaimableDAI() ? '' : 'No DAI to claim'}
      >
        Claim
      </button>
    </div>
  );
}
