export const DIGITS = {
  totalSupply: 1_000_000_000,
  avaxDividendsDistributed: 284_281.37,

  contracts: {
    erc20: {
      address: '0xBE56ab825fD35678A32dc35bc4EB17e238e1404F',
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'claim',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'compound',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
    },
    dividends: {
      address: '0xAd1b1E9db5A55F0608AD6934BfDa871645090f38',
      abi: [
        {
          inputs: [],
          name: 'totalDividendsDistributed',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'withdrawableDividendOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'withdrawnDividendOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
    },
    uniV2: {
      address: '0x24825D0eD8BaA195f360e9084fA0e508082C4E3e',
      abi: [
        {
          constant: true,
          inputs: [],
          name: 'getReserves',
          outputs: [
            { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
            { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
            { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
    },
  },
};
