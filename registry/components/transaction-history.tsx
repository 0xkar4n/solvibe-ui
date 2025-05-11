"use client"

import { useState, useEffect } from "react"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  ChevronDown,
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Info,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export interface Transaction {
  id: string
  type: "send" | "receive" | "pending"
  amount: string
  token: string
  address: string
  timestamp: string
  status: "Confirmed" | "Pending" | "Failed"
  description?: string
  fee?: string
  blockExplorer?: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  title?: string
  showFilters?: boolean
}

type SortField = "timestamp" | "amount" | "type" | "status"
type SortDirection = "asc" | "desc"
type FilterType = "all" | "send" | "receive" | "pending"
type FilterStatus = "all" | "Confirmed" | "Pending" | "Failed"

export function TransactionHistory({
  transactions,
  title = "Transaction History",
  showFilters = true,
}: TransactionHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("timestamp")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [filterType, setFilterType] = useState<FilterType>("all")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null)
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [isClient, setIsClient] = useState(false)

  // For hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    let result = [...transactions]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (tx) =>
          tx.address.toLowerCase().includes(query) ||
          tx.token.toLowerCase().includes(query) ||
          tx.amount.toLowerCase().includes(query) ||
          (tx.description && tx.description.toLowerCase().includes(query)),
      )
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((tx) => tx.type === filterType)
    }

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((tx) => tx.status === filterStatus)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortField === "timestamp") {
        // Simple string comparison for demo purposes
        // In a real app, you'd parse these into actual dates
        return sortDirection === "asc" ? a.timestamp.localeCompare(b.timestamp) : b.timestamp.localeCompare(a.timestamp)
      } else if (sortField === "amount") {
        const amountA = Number.parseFloat(a.amount)
        const amountB = Number.parseFloat(b.amount)
        return sortDirection === "asc" ? amountA - amountB : amountB - amountA
      } else if (sortField === "type") {
        return sortDirection === "asc" ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)
      } else if (sortField === "status") {
        return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
      }
      return 0
    })

    setFilteredTransactions(result)
  }, [transactions, searchQuery, sortField, sortDirection, filterType, filterStatus])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedTransaction(expandedTransaction === id ? null : id)
  }

  const formatCurrency = (amount: string, token: string) => {
    const numAmount = Number.parseFloat(amount)
    const formattedAmount = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(numAmount)

    return `${formattedAmount} ${token}`
  }

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "Failed":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20"
      default:
        return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20"
    }
  }

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="h-4 w-4 text-rose-500" />
      case "receive":
        return <ArrowDownLeft className="h-4 w-4 text-emerald-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "send":
        return "text-rose-500"
      case "receive":
        return "text-emerald-500"
      case "pending":
        return "text-amber-500"
      default:
        return "text-white"
    }
  }

  const getAmountPrefix = (type: Transaction["type"]) => {
    switch (type) {
      case "send":
        return "-"
      case "receive":
        return "+"
      default:
        return ""
    }
  }

  if (!isClient) {
    return null // Prevent hydration issues
  }

  return (
    <div className="w-full space-y-4 rounded-xl border border-neutral-800 bg-black p-4 text-white shadow-lg md:p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>

        {showFilters && (
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-neutral-900 border-neutral-800 w-full sm:w-[200px] md:w-[250px]"
              />
            </div>

            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-neutral-800 bg-neutral-900">
                    <Filter className="mr-2 h-4 w-4" />
                    Type
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
                  <DropdownMenuItem onClick={() => setFilterType("all")}>All Types</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("send")}>Send</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("receive")}>Receive</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-neutral-800 bg-neutral-900">
                    <Calendar className="mr-2 h-4 w-4" />
                    Status
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-neutral-800">
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Confirmed")}>Confirmed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Failed")}>Failed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-800 bg-neutral-900/50 p-8 text-center">
            <div className="mb-3 rounded-full bg-neutral-800 p-3">
              <Search className="h-6 w-6 text-neutral-400" />
            </div>
            <h3 className="mb-1 text-lg font-medium">No transactions found</h3>
            <p className="text-sm text-neutral-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            {/* Table Header - Desktop */}
            <div className="hidden md:flex rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 text-sm font-medium text-neutral-400">
              <div className="flex-1 flex items-center cursor-pointer" onClick={() => toggleSort("type")}>
                Type
                <ArrowUpDown className={cn("ml-1 h-4 w-4", sortField === "type" ? "opacity-100" : "opacity-40")} />
              </div>
              <div className="flex-1 flex items-center cursor-pointer" onClick={() => toggleSort("amount")}>
                Amount
                <ArrowUpDown className={cn("ml-1 h-4 w-4", sortField === "amount" ? "opacity-100" : "opacity-40")} />
              </div>
              <div className="flex-1">Address</div>
              <div className="flex-1 flex items-center cursor-pointer" onClick={() => toggleSort("timestamp")}>
                Time
                <ArrowUpDown className={cn("ml-1 h-4 w-4", sortField === "timestamp" ? "opacity-100" : "opacity-40")} />
              </div>
              <div className="flex-1 flex items-center cursor-pointer" onClick={() => toggleSort("status")}>
                Status
                <ArrowUpDown className={cn("ml-1 h-4 w-4", sortField === "status" ? "opacity-100" : "opacity-40")} />
              </div>
            </div>

            {/* Transactions */}
            <AnimatePresence>
              {filteredTransactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900",
                      expandedTransaction === tx.id ? "border-neutral-700" : "",
                    )}
                  >
                    {/* Mobile View */}
                    <div className="md:hidden space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(tx.type)}
                          <span className={cn("capitalize font-medium", getTypeColor(tx.type))}>{tx.type}</span>
                        </div>
                        <Badge className={cn("font-medium", getStatusColor(tx.status))}>{tx.status}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="font-mono text-lg font-bold">
                          <span className={getTypeColor(tx.type)}>
                            {getAmountPrefix(tx.type)}
                            {formatCurrency(tx.amount, tx.token)}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-400">{tx.timestamp}</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="font-mono text-xs text-neutral-400">
                          {tx.address.slice(0, 6)}...{tx.address.slice(-6)}
                        </div>
                     
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:flex md:items-center">
                      <div className="flex-1 flex items-center space-x-2">
                        {getTypeIcon(tx.type)}
                        <span className={cn("capitalize font-medium", getTypeColor(tx.type))}>{tx.type}</span>
                      </div>
                      <div className="flex-1 font-mono font-medium">
                        <span className={getTypeColor(tx.type)}>
                          {getAmountPrefix(tx.type)}
                          {formatCurrency(tx.amount, tx.token)}
                        </span>
                      </div>
                      <div className="flex-1 flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="font-mono text-xs text-neutral-400 hover:text-white">
                              {tx.address.slice(0, 6)}...{tx.address.slice(-6)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">{tx.address}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {tx.blockExplorer && (
                          <a
                            href={tx.blockExplorer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-neutral-400 hover:text-white"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex-1 text-sm text-neutral-400">{tx.timestamp}</div>
                      <div className="flex-1 flex items-center justify-between">
                        <Badge className={cn("font-medium", getStatusColor(tx.status))}>{tx.status}</Badge>
                        
                      </div>
                    </div>

                    
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-neutral-800 pt-4 text-sm text-neutral-400">
        <div>
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
        <div className="flex items-center">
          <Info className="mr-2 h-4 w-4" />
          <span>Transaction history is updated in real-time</span>
        </div>
      </div>
    </div>
  )
}
