import { useContractData } from '../contexts/contractData';

export default function DataBanner() {
  const { data } = useContractData();

  return (
    <div class="flex w-full justify-center bg-gradient-to-r from-blue-800 to-indigo-900 drop-shadow-md">
      <div class="mt-12 mb-14 grid max-w-md grid-cols-2 gap-8 md:flex md:max-w-5xl md:grow md:flex-row md:items-center md:justify-evenly">
        <div class="flex flex-col justify-self-start">
          <h1 class="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">
            Digits Price
          </h1>
          <h1 class="pl-1 text-4xl font-extrabold tracking-wide text-white">
            ${data()?.digitsPrice}
          </h1>
        </div>

        <div class="flex flex-col justify-self-start">
          <h1 class="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">
            Dividends Paid
          </h1>
          <h1 class="pl-1 text-4xl font-extrabold tracking-wide text-white">
            ${data()?.dividendsPaid}
          </h1>
        </div>

        <div class="flex flex-col justify-self-start">
          <h1 class="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">
            Total Value Burnt
          </h1>
          <h1 class="pl-1 text-4xl font-extrabold tracking-wide text-white">
            ${data()?.totalValueBurnt}
          </h1>
        </div>

        <div class="flex flex-col justify-self-start">
          <h1 class="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">
            Fully Diluted MCap
          </h1>
          <h1 class="pl-1 text-4xl font-extrabold tracking-wide text-white">
            ${data()?.fullyDilutedMcap}
          </h1>
        </div>
      </div>
    </div>
  );
}
