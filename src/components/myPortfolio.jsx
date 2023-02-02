import { useContractAddrData } from '../contexts/contractAddrData';

export default function MyPortfolio() {
  const { data, mutate, refetch } = useContractAddrData();

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
