import { useBlockNumber } from '../contexts/blockNumber';
import { createEffect, on } from 'solid-js';

export default function LoadingBar() {
  const blockNumber = useBlockNumber();

  createEffect(on(blockNumber, () => {}));

  return (
    <div class="mb-4 h-1.5 w-full bg-white">
      <div class="h-1.5 bg-slate-700" style="width: 45%"></div>
    </div>
  );
}
