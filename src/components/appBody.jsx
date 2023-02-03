import WalletButton from './wallet';
import DataBanner from './dataBanner';
import MyPortfolio from './myPortfolio';
import ClaimButton from './claimButton';
import CompoundButton from './compoundButton';

import { useContractData } from '../contexts/contractData';
import { createEffect } from 'solid-js';
import LoadingBar from './loadingBar';

export default function AppBody() {
  const { data, mutate, refetch } = useContractData();

  createEffect(() => {
    console.log('AppBody');
    console.log(data()?.digitsPrice);
  });

  return (
    <div className="flex h-full flex-col">
      <nav
        className="flex items-center justify-between bg-white px-6 py-6 drop-shadow-md lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Digits DAO</span>
            <img className="h-10 w-auto invert sm:h-12" src="/digits-logo.png" alt="Digits Logo" />
          </a>
        </div>
        <div className="flex flex-row gap-2 sm:gap-7">
          <a
            href="https://app.1inch.io/#/1/unified/swap/DAI/DIGITS"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center rounded-md bg-slate-700 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <img src="/uniswap-uni-logo.svg" alt="Uniswap Logo" className="mr-2 h-6 w-6" />
            <p>Buy DIGITS</p>
          </a>
          <WalletButton />
        </div>
      </nav>

      {/* <div className="flex w-full justify-center bg-gradient-to-r from-blue-800 to-indigo-900 drop-shadow-md">
        <div className="mt-12 mb-14 grid max-w-md grid-cols-2 gap-8 md:flex md:max-w-5xl md:grow md:flex-row md:items-center md:justify-evenly">
          <div className="flex flex-col justify-self-start">
            <h1 className="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">
              Digits Price
            </h1>
            <h1 className="pl-1 text-4xl font-extrabold tracking-wide text-white">
              ${data()?.digitsPrice}
            </h1>
          </div>

          <div className="flex flex-col justify-self-start">
            <h1 className="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">
              Dividends Paid
            </h1>
            <h1 className="pl-1 text-4xl font-extrabold tracking-wide text-white">
              ${data()?.dividendsPaid}
            </h1>
          </div>

          <div className="flex flex-col justify-self-start">
            <h1 className="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">
              Total Value Burnt
            </h1>
            <h1 className="pl-1 text-4xl font-extrabold tracking-wide text-white">
              ${data()?.totalValueBurnt}
            </h1>
          </div>

          <div className="flex flex-col justify-self-start">
            <h1 className="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">
              Fully Diluted MCap
            </h1>
            <h1 className="pl-1 text-4xl font-extrabold tracking-wide text-white">
              ${data()?.fullyDilutedMcap}
            </h1>
          </div>
        </div> 
      </div>*/}

      <DataBanner />
      <LoadingBar />

      <h1>=============</h1>
      <MyPortfolio />
      <ClaimButton />
      <CompoundButton />
    </div>
  );
}
