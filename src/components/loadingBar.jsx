import { useBlockNumber } from '../contexts/blockNumber';
import { createEffect, on, createSignal } from 'solid-js';

export default function LoadingBar() {
  const AVERAGE_BLOCK_TIME_ETH_MS = 12_000;
  const INTERVAL_PERIOD_MS = 25;
  const blockNumber = useBlockNumber();
  let intervalId = null;
  const [progressMs, setProgressMs] = createSignal(0);
  const [widthString, setWidthString] = createSignal('width: 0%');

  createEffect(
    on(blockNumber, () => {
      setProgressMs(0);
      clearInterval(intervalId);

      intervalId = setInterval(() => {
        setProgressMs(progressMs() + INTERVAL_PERIOD_MS);

        if (progressMs() >= AVERAGE_BLOCK_TIME_ETH_MS) {
          clearInterval(intervalId);
        }
      }, INTERVAL_PERIOD_MS);
    })
  );

  createEffect(
    on(progressMs, () => {
      setWidthString(`width: ${(progressMs() / AVERAGE_BLOCK_TIME_ETH_MS) * 100}%`);
    })
  );

  return (
    <div class="mb-4 h-1.5 w-full">
      <div class="h-1.5 bg-slate-700" style={widthString()} />
    </div>
  );
}
