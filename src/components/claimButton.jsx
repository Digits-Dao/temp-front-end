import { prepareWriteContract, writeContract } from '@wagmi/core';
import { createSignal, createEffect, createResource } from 'solid-js';
import { DIGITS } from '../non-visual-logic/digitsConstants';
import { useAddress } from '../contexts/address';
import toast from 'solid-toast';

export default function ClaimButton() {
  const address = useAddress();

  const [claimData, { claimMutate, claimRefetch }] = createResource(
    address,
    async (source, { value, refetching }) => {
      let claimConfig = null;
      try {
        claimConfig = await prepareWriteContract({
          ...DIGITS.contracts.erc20,
          functionName: 'claim',
        });
      } catch {
        console.log('prepareWriteContract ERRORED');
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
      } catch {
        console.log('writeContract ERRORED');
      }

      return data;
    }
  );

  createEffect(() => {
    console.log('claimTxnData');
    console.log(claimTxnData());
  });

  const notify = () => toast("I'm a toast!", { position: 'top-center' });

  return (
    <div class="ml-4 mt-2 flex-shrink-0">
      <button
        type="button"
        class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={/*(e) => setClickEvent(e)*/ notify}
      >
        Claim
      </button>
    </div>
  );
}
