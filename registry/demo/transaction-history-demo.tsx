// app/demo/transaction-history/page.tsx
"use client";

import React from "react";
import { Transaction, TransactionHistory } from "../components/transaction-history";


const demoTransactions:Transaction[]= [
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

export default function DemoTransactionHistoryPage() {
  return (
    <div >
      <TransactionHistory
        transactions={demoTransactions}
      />
    </div>
  );
}
