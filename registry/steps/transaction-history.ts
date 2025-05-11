export const TransactionHistorySteps = [
  {
    title: "Install UI Primitives",
    code: `npm install @shadcn/ui @radix-ui/react-table lucide-react`,
  },
  {
    title: "Import the Component",
    code: `import { TransactionHistory, Transaction } from "@/components/TransactionHistory";`,
  },
  {
    title: "Define Your Data",
    code: `const transactions: Transaction[] = [ /* your array of Transaction objects */ ];`,
  },
  {
    title: "Copy the TransactionHistory Component",
    code: `// components/TransactionHistory.tsx
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";

export interface Transaction {
  id: string;
  type: "send" | "receive" | "pending";
  amount: string;
  token: string;
  address: string;
  timestamp: string;
  status: "Confirmed" | "Pending" | "Failed";
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="rounded-lg border-dashed border border-gray-700 bg-black text-white">
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <h3 className="text-lg font-semibold text-white">Transaction History</h3>
        <Badge
          variant="outline"
          className="ml-auto bg-white text-black hover:bg-gray-200"
        >
          Last 7 days
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <Table className="text-white w-full min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 text-white">Type</TableHead>
              <TableHead className="px-6 text-white">Amount</TableHead>
              <TableHead className="px-6 hidden md:table-cell text-white">Address</TableHead>
              <TableHead className="px-6 hidden sm:table-cell text-white">Time</TableHead>
              <TableHead className="px-6 text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="px-6">
                  <div className="flex items-center gap-2 text-white">
                    {tx.type === "send" ? (
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    ) : tx.type === "receive" ? (
                      <ArrowDownLeft className="h-4 w-4 text-white" />
                    ) : (
                      <Clock className="h-4 w-4 text-white" />
                    )}
                    <span className="capitalize">{tx.type}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 font-mono text-white">
                  {tx.type === "send" ? "-" : "+"}
                  {tx.amount} {tx.token}
                </TableCell>
                <TableCell className="px-6 hidden font-mono text-xs md:table-cell text-white">
                  {tx.address.slice(0, 4)}...{tx.address.slice(-4)}
                </TableCell>
                <TableCell className="px-6 hidden sm:table-cell text-white">
                  {tx.timestamp}
                </TableCell>
                <TableCell className="px-6">
                  <Badge
                    variant={
                      tx.status === "Confirmed"
                        ? "default"
                        : tx.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                    className="capitalize"
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}`,
  },
];
