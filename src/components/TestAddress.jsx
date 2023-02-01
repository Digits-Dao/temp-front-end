import { address, setAddress } from './Wallet';

export default function TestAddress() {
  return <h1>{address()}</h1>;
}
