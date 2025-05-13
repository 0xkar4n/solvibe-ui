import { ConnectWalletSteps } from "../registry/steps/connect-wallet";
import  WalletConnectDemo from "../registry/demo/wallet-connect-demo";
import DemoTransactionHistoryPage from "../registry/demo/transaction-history-demo";
import { TransactionHistorySteps } from "../registry/steps/transaction-history";
import SolanaBalanceBadgeDemo from "../registry/demo/solana-balance-demo"
import { SolanaBalanceBadgeSteps } from "../registry/steps/solana-balance-badge";
import NftCardDemo from "./demo/nft-card-demo";
import {NFTCardSteps} from "../registry/steps/nft-card";
import { NFTGallerySteps } from "./steps/nft-gallery";
import NftGalleryDemo from "./demo/nft-gallery-demo";

type Entry = {
  id: string;
  title: string;
  description: string;
  Component: React.ComponentType<any>;
  demoCode: string;
  installation: {
    title: string;
    code: string;
  }[];
  props: {
    name: string,
    type: string,
    default: string,
    description: string,
  }[];
};

export const Registry: Entry[] = [
  {
    id: "connect-wallet",
    title: "Connect Wallet",
    description:
      "A button to connect/disconnect a Solana wallet via @solana/wallet-adapter, with auto-reconnect support.",
    Component: WalletConnectDemo,
    demoCode: `
import { ConnectWallet } from "@/components/ConnectWallet";

export function ConnectWalletDemo() {
  return <ConnectWallet />;
}
    `.trim(),
    installation: ConnectWalletSteps.map((step) => ({
      title: step.title,
      code: step.code.trim(),
    })),
    props: [
      {
        name: "classname",
        type: "string",
        default: "default",
        description: "Tailwind css ",
      },
    ],

  },
  {
    id: "transaction-history",
    title: "Transaction History Table",
    description: "A responsive table for displaying Solana transaction history with status badges and icons.",
    Component: DemoTransactionHistoryPage,
    demoCode: `
import { TransactionHistory, Transaction } from "@/components/TransactionHistory";

const transactions: Transaction[] = [ 
  {
    id: "1",
    type: "receive",
    amount: "0.5",
    token: "SOL",
    address: "8xh3hVxBJcQADxvUfnCgD1ftiU7B5NvThYtmcqULf2VR",
    timestamp: "2 mins ago",
    status: "Confirmed",
  },
  {
    id: "2",
    type: "send",
    amount: "10",
    token: "USDC",
    address: "DRpbCBMxVnDK7maPM5tGv6MvB3v1TvJXvpgDNZ5jNgbf",
    timestamp: "1 hour ago",
    status: "Confirmed",
  },
  {
    id: "3",
    type: "pending",
    amount: "2.5",
    token: "SOL",
    address: "4xh3hVxBJcQADxvUfnCgD1ftiU7B5NvThYtmcqULf2VR",
    timestamp: "5 mins ago",
    status: "Pending",
  },
  {
    id: "4",
    type: "send",
    amount: "100",
    token: "BONK",
    address: "CRpbCBMxVnDK7maPM5tGv6MvB3v1TvJXvpgDNZ5jNgbf",
    timestamp: "2 days ago",
    status: "Failed",
  },

];

export default function TransactionHistoryDemo() {
  return <TransactionHistory transactions={transactions} />;
}
    `.trim(),
    installation: TransactionHistorySteps,
    props: [
      {
        name: "variant",
        type: "string",
        default: "default",
        description: "The button style variant to use.",
      },
      {
        name: "size",
        type: "string",
        default: "default",
        description: "The size of the button.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description: "Whether to render as a child element.",
      },
    ],
  },

  {
    id: "solana-balance-badge",
    title: "Solana Balance Badge",
    description:
      "A small badge displaying a SOL balance alongside the Solana logo, using Shadcn/UI’s Badge with a secondary outline variant.",
    Component: SolanaBalanceBadgeDemo,
    demoCode: `
import { SolanaBalanceBadge } from "../components/solana-balance-badge";

export default function SolanaBalanceBadgeDemo() {
  const userBalance = 1.27;
  return (
   <div className="flex flex-col gap-8 items-center">
      <div className="flex gap-8 items-center">
      <SolanaBalanceBadge  balance={userBalance} />
      <SolanaBalanceBadge  balance={userBalance}  variant="default" />
      </div>
      <div className="flex gap-8 items-center">      
      <SolanaBalanceBadge  balance={userBalance} variant="outline" classname="text-white" />
      <SolanaBalanceBadge  balance={userBalance} variant="destructive"/>
      </div>
    </div>
  );

    `.trim(),
    installation: SolanaBalanceBadgeSteps,
    props: [
      {
        name: "balance",
        type: "number",
        default: "0.00",
        description: "Solana balance value",
      },
      {
        name: "variant",
        type: "string",
        default: "default | outline | destructive | secondary",
        description: "Type of badge variant",
      },
      {
        name: "classname",
        type: "string",
        default: "default",
        description: " ",
      },
    ],
  }
  ,

  {
    id: "nft-card",
    title: "NFT Card",
    description:
      "NFT card component",
    Component: NftCardDemo,
    demoCode: `
    import NFTCard from "@/components/nft-card";

const nft = 
  {
    id: "nft3",
    name: "Madlad #3597",
    image: "/madlad.png",
    collection: "Mad Lads",
    price: {
      amount: 48.99,
    },
    rarity: {
      rank: 3597,
      score: 85,
      total: 5000,
    },
  }

export default function NftCardDemo() {
  return (
    <div className="flex items-center">
            <NFTCard
              key={nft.id}
              id={nft.id}
              name={nft.name}
              image={nft.image}
              collection={nft.collection}
              price={nft.price}
              rarity={nft.rarity}
            />
    </div>
  )
}   
    `.trim(),
    installation: NFTCardSteps,
    props: [
      {
        name: "balance",
        type: "number",
        default: "0.00",
        description: "Solana balance value",
      },
      {
        name: "variant",
        type: "string",
        default: "default | outline | destructive | secondary",
        description: "Type of badge variant",
      },
      {
        name: "classname",
        type: "string",
        default: "default",
        description: " ",
      },
    ],
  },

  {
    id: "nft-gallery",
    title: "NFT gallery",
    description:
      "NFT gallery component used in NFT marketplace",
    Component: NftGalleryDemo,
    demoCode: `
 import { NFTGallery } from '@/components/nft-gallery'
import React from 'react'

const nfts = [
  {
    id: "nft1",
    name: "Madlad #7648",
    image: "/madlad.png",
    collection: "Mad Lads",
    price: {
      amount: 47.79,
    },
    rarity: {
      rank: 4799,
      score: 85,
      total: 5000,
    },
  },
  {
    id: "nft2",
    name: "DeGod #456",
    image: "/degod.png",
    collection: "DeGods",
    price: {
      amount: 25,
    },
    rarity: {
      rank: 456,
      score: 92,
      total: 10000,
    },
  },
  {
    id: "nft3",
    name: "Madlad #3597",
    image: "/madlad.png",
    collection: "Mad Lads",
    price: {
      amount: 48.99,
    },
    rarity: {
      rank: 3597,
      score: 85,
      total: 5000,
    },
  },
]
const NftGalleryDemo = () => {
  
  return (
    <div className='m-8 max-h-screen max-w-screen'>
            <h2 className="text-2xl font-bold mb-4">Your NFTs</h2>
            <NFTGallery nfts={nfts} />
          </div>
  )
}

export default NftGalleryDemo
    `.trim(),
    installation: NFTGallerySteps,
    props: [
      {
        name: "balance",
        type: "number",
        default: "0.00",
        description: "Solana balance value",
      },
      {
        name: "variant",
        type: "string",
        default: "default | outline | destructive | secondary",
        description: "Type of badge variant",
      },
      {
        name: "classname",
        type: "string",
        default: "default",
        description: " ",
      },
    ],
  },


  

];