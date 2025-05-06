// components/SolanaBalanceBadge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SolanaBalanceBadgeProps {
  balance: number;
  classname?: string;
}

export function SolanaBalanceBadge({
  balance = 0.0,
  classname
}: SolanaBalanceBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("border border-gray-300 px-3 py-1 inline-flex items-center gap-1",classname)}>
      {balance.toFixed(2)}
      <img src="/solana-logo.png" alt="Solana" className="w-4 h-4" />
    </Badge>
  );
}
