import NFTCard from "@/components/nft-card";

const nft = 
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
  }

export default function Connect() {
  return (
    <div className="flex items-center">

<NFTCard
              key={nft.id}
              id={nft.id}
              name={nft.name}
              image={nft.image}
              collection={nft.collection}
              price={nft.price}
              rarity={nft.rarity}
            />
    </div>
  )
}