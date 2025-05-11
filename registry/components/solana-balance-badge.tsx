import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SolanaBalanceBadgeProps {
  balance: number;
  classname?: string;
  variant?: "default" | "outline" | "destructive" | "secondary";
}

export function SolanaBalanceBadge({
  balance = 0.0,
  classname,
  variant = "secondary"
}: SolanaBalanceBadgeProps) {
  return (
    <Badge variant={variant} className={cn("px-3 py-1 inline-flex items-center gap-1",classname)}>
      {balance.toFixed(2)}
      <img src="/solana-logo.png" alt="Solana" className="w-4 h-4" />
    </Badge>
  );
}
