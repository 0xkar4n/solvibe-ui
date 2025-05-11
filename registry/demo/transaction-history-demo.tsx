"use client"

import { useState } from "react"
import { type Transaction, TransactionHistory } from "../components/transaction-history"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"

const demoTransactions: Transaction[] = [
  {
    id: "tx_8f7e6d5c4b3a2109",
    type: "receive",
    amount: "0.5",
    token: "SOL",
    address: "8xh3hVxBJcQADxvUfnCgD1ftiU7B5NvThYtmcqULf2VR",
    timestamp: "2 mins ago",
    status: "Confirmed",
    description: "Payment from Alice",
    fee: "0.000005 SOL",
    blockExplorer: "https://explorer.solana.com/tx/8f7e6d5c4b3a2109",
  },
  {
    id: "tx_7e6d5c4b3a210987",
    type: "send",
    amount: "10",
    token: "USDC",
    address: "DRpbCBMxVnDK7maPM5tGv6MvB3v1TvJXvpgDNZ5jNgbf",
    timestamp: "1 hour ago",
    status: "Confirmed",
    description: "Payment for services",
    fee: "0.000005 SOL",
    blockExplorer: "https://explorer.solana.com/tx/7e6d5c4b3a210987",
  },
  {
    id: "tx_6d5c4b3a21098765",
    type: "pending",
    amount: "2.5",
    token: "SOL",
    address: "4xh3hVxBJcQADxvUfnCgD1ftiU7B5NvThYtmcqULf2VR",
    timestamp: "5 mins ago",
    status: "Pending",
    description: "Transfer to wallet",
    fee: "0.000005 SOL",
    blockExplorer: "https://explorer.solana.com/tx/6d5c4b3a21098765",
  },
  {
    id: "tx_5c4b3a2109876543",
    type: "send",
    amount: "100",
    token: "BONK",
    address: "CRpbCBMxVnDK7maPM5tGv6MvB3v1TvJXvpgDNZ5jNgbf",
    timestamp: "2 days ago",
    status: "Failed",
    description: "Donation",
    fee: "0.000005 SOL",
    blockExplorer: "https://explorer.solana.com/tx/5c4b3a2109876543",
  },
  {
    id: "tx_4b3a210987654321",
    type: "receive",
    amount: "1.2",
    token: "SOL",
    address: "9xh3hVxBJcQADxvUfnCgD1ftiU7B5NvThYtmcqULf2VR",
    timestamp: "3 days ago",
    status: "Confirmed",
    description: "Refund",
    fee: "0.000005 SOL",
    blockExplorer: "https://explorer.solana.com/tx/4b3a210987654321",
  },
  {
    id: "tx_3a21098765432109",
    type: "send",
    amount: "25",
    token: "USDC",
    address: "ERpbCBMxVnDK7maPM5tGv6MvB3v1TvJXvpgDNZ5jNgbf",
    timestamp: "1 week ago",
    status: "Confirmed",
    description: "Weekly savings",
    fee: "0.000005 SOL",
    blockExplorer: "https://explorer.solana.com/tx/3a21098765432109",
  },
]

export default function DemoTransactionHistoryPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Filter transactions based on active tab
  const getFilteredTransactions = () => {
    switch (activeTab) {
      case "sent":
        return demoTransactions.filter((tx) => tx.type === "send")
      case "received":
        return demoTransactions.filter((tx) => tx.type === "receive")
      case "pending":
        return demoTransactions.filter((tx) => tx.type === "pending")
      default:
        return demoTransactions
    }
  }

  return (
    <div className="w-full bg-black text-white min-h-screen">

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full justify-start rounded-lg border border-neutral-800 bg-neutral-900 p-1">
          <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-neutral-800">
            All
          </TabsTrigger>
          <TabsTrigger value="sent" className="rounded-md data-[state=active]:bg-neutral-800">
            Sent
          </TabsTrigger>
          <TabsTrigger value="received" className="rounded-md data-[state=active]:bg-neutral-800">
            Received
          </TabsTrigger>
          <TabsTrigger value="pending" className="rounded-md data-[state=active]:bg-neutral-800">
            Pending
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0 w-full">
          <TransactionHistory
            transactions={getFilteredTransactions()}
            title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Transactions`}
            showFilters={true}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800">
          Load More Transactions
        </Button>
      </div>
    </div>
  )
}
