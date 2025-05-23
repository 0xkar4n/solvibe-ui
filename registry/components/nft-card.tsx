"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface NFTCardProps {
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
  onAction?: () => void
  actionLabel?: string
  className?: string
}

export default function NFTCard({
  id,
  name,
  image,
  collection,
  attributes,
  price,
  rarity,
  isOwned = false,
  onAction,
  actionLabel = isOwned ? "List for Sale" : "Buy Now",
  className,
}: NFTCardProps) {
  const displayedAttributes = attributes?.slice(0, 3) || []

  return (

    <Card className={cn("overflow-hidden transition-all hover:shadow-md bg-black  text-white", className)}>
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {rarity && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-black/70 text-white border-none">
                Rank #{rarity.rank}/{rarity.total}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-1">
          {collection && <p className="text-xs text-muted-foreground">{collection}</p>}
          <h3 className="font-semibold truncate">{name}</h3>

          {displayedAttributes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {displayedAttributes.map((attr) => (
                <Badge key={attr.trait_type} variant="secondary" className="text-xs">
                  {attr.trait_type}: {attr.value}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {price && (
          <div className="flex text-sm font-bold items-center gap-2">
            <img src="/solana-logo.png" alt="Solana" className="w-4 h-4" />
            {price.amount} 
          </div>
        )}
        <Button size="sm" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}