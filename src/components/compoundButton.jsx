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

export default function CompoundButton() {
  const [, hasClaimableDAI] = useContractAddrData();

  const [compoundData] = createResource(hasClaimableDAI, async () => {
    let compoundConfig = null;
    try {
      compoundConfig = await prepareWriteContract({
        ...DIGITS.contracts.erc20,
        functionName: 'compound',
      });

      console.log('=== AFTER prepareWriteContract ===');
    } catch {
      console.error('[CompoundButton] prepareWriteContract failed');
    }

    return compoundConfig;
  });

  const [clickEvent, setClickEvent] = createSignal();
  const [compoundTxnData] = createResource(clickEvent, async () => {
    let data = null;
    try {
      data = await writeContract(compoundData());

      toast.promise(data.wait(1), {
        loading: <span>Compounding DAI &rarr; DIGITS</span>,
        success: <span>DAI &rarr; DIGITS compounded!</span>,
        error: 'An error occurred 😔',
      });
    } catch {
      toast.error('Oops! Something went wrong');
      console.error('[CompoundButton] writeContract failed');
    }

    return data;
  });

  createEffect(() => {
    console.log('compoundTxnData');
    console.log(compoundTxnData());
  });

  return (
    <button
      type="button"
      class="mt-10 rounded-br-xl border bg-slate-100 text-base font-semibold text-indigo-900 shadow-lg hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={(e) => setClickEvent(e)}
      disabled={!hasClaimableDAI()}
      title={hasClaimableDAI() ? '' : 'No DAI to compound'}
    >
      <p class="px-6">Compound DAI &rarr; DIGITS</p>
    </button>
  );
}
