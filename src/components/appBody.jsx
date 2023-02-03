import WalletButton from './wallet';
import DataBanner from './dataBanner';
import { MyPortfolio } from './myPortfolio';
import LoadingBar from './loadingBar';
import { DIGITS } from '../non-visual-logic/digitsConstants';

export default function AppBody() {
  const buyURL = `https://app.1inch.io/#/1/simple/swap/DAI/${DIGITS.contracts.erc20.address}`;

  return (
    <div class="flex h-full flex-col">
      <nav
        class="flex items-center justify-between bg-white px-6 py-6 drop-shadow-md lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Digits DAO</span>
            <img class="h-10 w-auto invert sm:h-12" src="/digits-logo.png" alt="Digits Logo" />
          </a>
        </div>
        <div class="flex flex-row gap-2 sm:gap-7">
          <a
            href={buyURL}
            target="_blank"
            rel="noreferrer noopener"
            class="flex items-center justify-center rounded-md bg-slate-700 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <img src="/uniswap-uni-logo.svg" alt="Uniswap Logo" class="mr-2 h-6 w-6" />
            <p>Buy DIGITS</p>
          </a>
          <WalletButton />
        </div>
      </nav>

      <DataBanner />
      <LoadingBar />

      {/* Background: Blurred Color Blob */}
      <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-5rem]">
        <svg
          class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fill-opacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          ></path>
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9089FC"></stop>
              <stop offset="1" stop-color="#FF80B5"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main interractivity portion */}
      <main className="flex flex-grow flex-col justify-center">
        {/* Background blurred object */}
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(30%)]">
          <svg
            class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fill-opacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            ></path>
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9089FC"></stop>
                <stop offset="1" stop-color="#FF80B5"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <MyPortfolio />
        {/* <MyPortfolioRef /> */}
      </main>

      {/* <ClaimButton />
      <CompoundButton /> */}
      <footer aria-labelledby="footer-heading" class="justify-end">
        <h2 id="footer-heading" class="sr-only">
          Footer
        </h2>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mt-12 flex items-center justify-between pb-8">
            <p class="text-xs text-gray-400 sm:text-base">
              &copy; 2023 DigitsDAO. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
