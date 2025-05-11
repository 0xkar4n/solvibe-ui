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
}
