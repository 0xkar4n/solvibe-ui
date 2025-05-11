"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import NFTCard  from "./nft-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Grid3X3, List, Search } from "lucide-react"


interface NFT {
  id: string
  name: string
  image: string
  collection?: string
  attributes?: Array<{
    trait_type: string
    value: string
  }>
  price?: {
    amount: number
  }
  rarity?: {
    rank: number
    score: number
    total: number
  }
  isOwned?: boolean
}

interface NFTGalleryProps {
  nfts: NFT[]
  onNFTAction?: (nft: NFT) => void
  className?: string
}

export function NFTGallery({ nfts, onNFTAction, className }: NFTGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price":
        return (b.price?.amount || 0) - (a.price?.amount || 0)
      case "rarity":
        return (a.rarity?.rank || 999999) - (b.rarity?.rank || 999999)
      default:
        return 0
    }
  })

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search NFTs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price: High to Low</SelectItem>
              <SelectItem value="rarity">Rarity: Best to Worst</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant="default"
              size="icon"
              className={cn("rounded-r-none  ", viewMode === "grid" && "bg-muted hover:bg-white")}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4 hover:none" color={viewMode==='grid'?"#000000":"#ffffff"} />
              
            </Button>
            <Button
              variant="default"
              size="icon"
              className={cn("rounded-l-none hover:bg-none ", viewMode === "list" && "bg-muted hover:bg-white")}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 hover:none" color={viewMode==='list'?"#000000":"#ffffff"} />
            </Button>
          </div>
        </div>
      </div>

      {sortedNFTs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No NFTs found matching your search.</div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              id={nft.id}
              name={nft.name}
              image={nft.image}
              collection={nft.collection}
              attributes={nft.attributes}
              price={nft.price}
              rarity={nft.rarity}
              isOwned={nft.isOwned}
              onAction={() => onNFTAction?.(nft)}
              actionLabel={nft.isOwned ? "List for Sale" : "Buy Now"}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sortedNFTs.map((nft) => (
            <div key={nft.id} className="flex items-center border rounded-lg p-3 hover:bg-muted/50">
              <div className="w-12 h-12 rounded overflow-hidden mr-4">
                <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline">
                  <h3 className="font-medium truncate">{nft.name}</h3>
                  {nft.collection && (
                    <span className="ml-2 text-xs text-muted-foreground truncate">{nft.collection}</span>
                  )}
                </div>
                {nft.rarity && (
                  <div className="text-xs text-muted-foreground">
                    Rank #{nft.rarity.rank}/{nft.rarity.total}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                {nft.price && (
                  <div className="text-sm font-medium flex  items-center  gap-2">
                <img src="/solana-logo.png" alt="Solana" className="w-4 h-4" />

                    {nft.price.amount} 
                  </div>
                )}
                <Button size="sm" variant="secondary"  onClick={() => onNFTAction?.(nft)}>
                  {nft.isOwned ? "List for Sale" : "Buy Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
