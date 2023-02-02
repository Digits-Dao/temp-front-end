import { useContractData } from '../contexts/contractData';

export default function DataBanner() {
  const { data, mutate, refetch } = useContractData();

  return (
    <>
      <h1>{data.error && 'Error...'}</h1>
      <h1>{data.loading && 'Loading...'}</h1>
      <h1>Digits Price: ${data()?.digitsPrice}</h1>
      <h1>Dividends Paid: ${data()?.dividendsPaid}</h1>
      <h1>Total Value Burnt: ${data()?.totalValueBurnt}</h1>
      <h1>Fully Diluted Mcap: ${data()?.fullyDilutedMcap}</h1>
    </>
  );
}
