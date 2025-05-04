
import ConnectWallet from './components/connect-wallet';
import connectWalletSource from './components/connect-wallet.tsx?raw';
import connectWalletDemoSource from './demo/wallet-connect-demo.tsx?raw';

export type InstallationStep = {
  title: string;       
  code: string;        
};

export type Entry = {
  id: string;
  title: string;
  description: string,
  Component: React.FC;
  demoCode: string;
  installation: InstallationStep[];
};

export const Registry: Entry[] = [
  {
    id: 'connect-wallet',
    title: 'Connect Wallet',
    description: 'Connect wallet button UI for connecting solana wallets',
    Component: ConnectWallet,
    demoCode: connectWalletDemoSource,
    installation: [
      {
        title: "Install Dependencies",
        code: `npm install @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-wallets @solana/web3.js framer-motion`
      },
      {
        title: "Update Layout File",
        code: `import ConnectWallet from '@/components/connect-wallet'` + "\n" + `// then use <ConnectWallet /> in your Page ` 
      }
    ],
  },
  
];
