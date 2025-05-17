export const NFTCardSteps = [
    {
      title: "1. Install Primitives & Dependencies",
      code: `npx shadcn@latest add card badge button`, 
    },
    {
      title: "2. Copy the NFTCard Component",
      code: `// components/NFTCard.tsx
  "use client";
  
  import React from "react";
  import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
  import { cn } from "@/lib/utils";
  import Image from "next/image";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  
  interface NFTCardProps {
    id: string;
    name: string;
    image: string;
    collection?: string;
    attributes?: { trait_type: string; value: string }[];
    price?: { amount: number };
    rarity?: { rank: number; score: number; total: number };
    isOwned?: boolean;
    onAction?: () => void;
    actionLabel?: string;
    className?: string;
  }
  
  export default function NFTCard({
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
    const displayedAttributes = attributes?.slice(0, 3) || [];
  
    return (
      <Card
        className={cn(
          "overflow-hidden transition-all hover:shadow-md bg-black text-white",
          className
        )}
      >
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            {/* Next.js Image for automatic optimization :contentReference[oaicite:1]{index=1} */}
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
            {collection && (
              <p className="text-xs text-muted-foreground">{collection}</p>
            )}
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
            <div className="flex items-center gap-2 text-sm font-bold">
              <img
                src="/solana-logo.png"
                alt="Solana"
                className="w-4 h-4"
              />
              {price.amount}
            </div>
          )}
          <Button size="sm" variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </CardFooter>
      </Card>
    );
  }`,
      // Demonstrates usage of Shadcn/UI Card, Badge, Button and Next.js Image :contentReference[oaicite:2]{index=2}
    },
    {
      title: "3. Import & Use in a Page",
      code: `// app/page.tsx (or pages/index.tsx)
  import React from "react";
  import NFTCard from "@/components/NFTCard";
  
  export default function HomePage() {
    const sampleNFT = {
      id: "1",
      name: "Cool NFT",
      image: "/nft1.png",
      collection: "Art Blocks",
      attributes: [{ trait_type: "Color", value: "Blue" }],
      price: { amount: 1.5 },
      rarity: { rank: 10, score: 95, total: 100 },
      isOwned: false,
    };
  
    return <NFTCard {...sampleNFT} onAction={() => console.log("Action")} />;
  }`,
    }
]