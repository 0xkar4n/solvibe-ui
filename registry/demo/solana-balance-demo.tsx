import { SolanaBalanceBadge } from "../components/solana-balance-badge";

export default function SolanaBalanceBadgeDemo() {
  const userBalance = 1.27;
  return (
    <div className="flex gap-8">
      <SolanaBalanceBadge balance={userBalance} />
      <SolanaBalanceBadge
        balance={userBalance}
        classname="bg-black text-white border-none"
      />
    </div>
  );
}
