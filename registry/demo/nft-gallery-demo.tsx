import { NFTGallery } from '../components/nft-gallery'
import React from 'react'

const nfts = [
  {
    id: "nft1",
    name: "Madlad #4799",
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
    name: "DeGod #8624",
    image: "/degod-1.avif",
    collection: "DeGods",
    price: {
      amount: 29.05,
    },
    rarity: {
      rank: 8624,
      score: 87,
      total: 10000,
    },
  },
  {
    id: "nft4",
    name: "DeGod #1001",
    image: "/degod-2.avif",
    collection: "DeGods",
    price: {
      amount: 29.05,
    },
    rarity: {
      rank: 1001,
      score: 95,
      total: 10000,
    },
  },
  {
    id: "nft5",
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
  {
    id: "nft6",
    name: "Madlad #1001",
    image: "/madlad-2.avif",
    collection: "Mad Lads",
    price: {
      amount: 100.99,
    },
    rarity: {
      rank: 10001,
      score: 97,
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