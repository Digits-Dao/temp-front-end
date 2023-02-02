import { useContractData } from '../contexts/contractData';

export default function DataBanner() {
  const { data, mutate, refetch } = useContractData();

  return (
    <>
      <h1>Digits Price: ${data()?.digitsPrice}</h1>
      <h1>Dividens Paid: ${data()?.dividendsPaid}</h1>
      <h1>Total Value Burnt: ${data()?.totalValueBurnt}</h1>
      <h1>Fully Diluted Mcap: ${data()?.fullyDilutedMcap}</h1>
    </>
  );
}
