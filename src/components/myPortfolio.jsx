import { useContractAddrData } from '../contexts/contractAddrData';
import Spinner from './spinner';
import { Match, Switch } from 'solid-js';
import ClaimButton from './claimButton';
import CompoundButton from './compoundButton';

export function MyPortfolioRef() {
  const [{ data }] = useContractAddrData();

  return (
    <>
      <h1>{data.error && 'Error...'}</h1>
      <h1>{data.loading && 'Loading...'}</h1>
      <h1>Digits Balance: {data()?.digitsBalance}</h1>
      <h1>Digits Balance USD: ${data()?.digitsBalanceUSD}</h1>
      <h1>Claimable DAI: ${data()?.claimableDAI}</h1>
      <h1>Total Claimed DAI: ${data()?.totalClaimedDAI}</h1>
    </>
  );
}

export function MyPortfolio() {
  const [{ data }] = useContractAddrData();

  return (
    <div class="mx-auto">
      <div class="rounded-xl border border-indigo-600 bg-white text-left shadow-xl">
        <h1 class="mb-8 rounded-t-lg bg-gradient-to-r from-blue-800 to-indigo-900 py-8 text-center text-2xl font-bold tracking-tight text-white sm:text-4xl">
          My Portfolio
        </h1>
        <div class="grid grid-flow-col grid-cols-2 grid-rows-3">
          <div class="col-span-2 mx-12 flex flex-col justify-center border-b border-indigo-200 pb-8 text-center">
            <h1 class="text-l mb-2 font-medium uppercase tracking-wider text-blue-600 ">
              DIGITS Balance
            </h1>
            <Switch fallback={<Spinner />}>
              <Match when={data() !== null}>
                <div class="flex flex-row justify-center">
                  <h1 class="pr-4 text-4xl font-extrabold tracking-wide text-gray-900">
                    {data()?.digitsBalance}
                  </h1>
                  <h1 class="text-4xl font-extrabold tracking-wide text-green-800 opacity-70">
                    {'($' + data()?.digitsBalanceUSD + ')'}
                  </h1>
                </div>
              </Match>
            </Switch>
          </div>

          <div class="mx-8 flex flex-col justify-end text-center">
            <h1 class="text-l mb-2 font-medium uppercase tracking-wider text-green-800 ">
              Claimable DAI
            </h1>
            <Switch fallback={<Spinner />}>
              <Match when={data() !== null}>
                <h1 class="pl-1 text-4xl font-extrabold tracking-wide text-gray-900 underline decoration-green-700 decoration-dotted underline-offset-8">
                  {'$' + data()?.claimableDAI}
                </h1>
              </Match>
            </Switch>
          </div>

          <ClaimButton />

          <div class="mx-8 flex flex-col justify-end text-center">
            <h1 class="text-l mb-2 font-medium uppercase tracking-wider text-amber-600 ">
              Total Claimed DAI
            </h1>
            <Switch fallback={<Spinner />}>
              <Match when={data() !== null}>
                <h1 class="pl-1 text-4xl font-extrabold tracking-wide text-gray-900">
                  {'$' + data()?.totalClaimedDAI}
                </h1>
              </Match>
            </Switch>
          </div>

          <CompoundButton />
        </div>
      </div>
    </div>
  );
}
