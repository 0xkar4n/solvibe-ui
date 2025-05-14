import { NFTGallery } from '@/components/nft-gallery'
import React from 'react'

const nfts = [
  {
    id: "nft1",
    name: "Madlad #7648",
    image: "/madlad.png",
    collection: "Mad Lads",
    price: {
      amount: 47.79,
    },
    rarity: {
      rank: 4799,
      score: 85,
      total: 5000,
    },
  },
  {
    id: "nft2",
    name: "DeGod #456",
    image: "/degod.png",
    collection: "DeGods",
    price: {
      amount: 25,
    },
    rarity: {
      rank: 456,
      score: 92,
      total: 10000,
    },
  },
  {
    id: "nft3",
    name: "Madlad #3597",
    image: "/madlad.png",
    collection: "Mad Lads",
    price: {
      amount: 48.99,
    },
    rarity: {
      rank: 3597,
      score: 85,
      total: 5000,
    },
  },
]
const NftGalleryDemo = () => {
  
  return (
    <div >
            {/* <h2 className="text-2xl font-bold mb-4">Your NFTs</h2> */}
            <NFTGallery nfts={nfts} />
          </div>
  )
}

export default NftGalleryDemo