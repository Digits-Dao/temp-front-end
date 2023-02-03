import { createEffect } from 'solid-js';

export default function LabelAndValueCard({ label, value }) {
  createEffect(() => console.log('LabelAndValueCard', label, value));

  return (
    <div className="flex flex-col justify-self-start">
      <h1 className="text-l mb-2 font-medium uppercase tracking-wider text-blue-200 ">{label}</h1>
      <h1 className="pl-1 text-4xl font-extrabold tracking-wide text-white">${value}</h1>
    </div>
  );
}
