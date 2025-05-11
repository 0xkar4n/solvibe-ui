import { ConnectWalletSteps } from "../registry/steps/connect-wallet";
import  WalletConnectDemo from "../registry/demo/wallet-connect-demo";

import DemoTransactionHistoryPage from "../registry/demo/transaction-history-demo";
import { TransactionHistorySteps } from "../registry/steps/transaction-history";

import SolanaBalanceBadgeDemo from "../registry/demo/solana-balance-demo"
import { SolanaBalanceBadgeSteps } from "../registry/steps/solana-balance-badge";

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
    <div className="flex gap-8">
      <SolanaBalanceBadge balance={userBalance} />
      <SolanaBalanceBadge
        balance={userBalance}
        variant="default"
      />
    </div>
  );

    `.trim(),
    installation: SolanaBalanceBadgeSteps,
  }


  

];