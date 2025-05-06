// steps/connect-wallet.ts

export const ConnectWalletSteps = [
  {
    title: "1. Install Dependencies",
    code: `npm install @solana/wallet-adapter-react @solana/wallet-adapter-wallets  @solana/wallet-adapter-base`
  },
  {
    title: "2. Create Wallet Context Provider",
    code: `// components/WalletProvider.tsx
import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";
import {
  WalletAdapterNetwork
} from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  new MathWalletAdapter(),
  new AlphaWalletAdapter(),
  new AvanaWalletAdapter(),
  new BitpieWalletAdapter(),
  new CoinbaseWalletAdapter(),
  new LedgerWalletAdapter(),
  new TrustWalletAdapter(),
  new TrezorWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};`
  },
  {
    title: "3. Wrap Your App with the Provider",
    code: `// app/layout.tsx or pages/_app.tsx
import React from "react";
import { WalletContextProvider } from "@/components/WalletProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}`
  },
  {
    title: "4. Copy the ConnectWallet Component",
    code: `
    // components/ConnectWallet.tsx
"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckIcon, ChevronDown, EyeOff, LogOut, AlertCircle, Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ModalState = "selection" | "connecting" | "error";

const walletsToShow = 6;

interface ConnectWalletProps {
  buttonClassName?: string;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ buttonClassName }) => {
  const {
    select,
    publicKey,
    disconnect,
    wallet,
    connecting,
    connected,
  } = useWallet();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = React.useState<string | null>(null);
  const [modalState, setModalState] = React.useState<ModalState>("selection");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const allWallets = wallet?.adapter ? [wallet.adapter] : [];
  const displayedWallets = showAll ? allWallets : allWallets.slice(0, walletsToShow);

  const openModal = () => {
    setIsOpen(true);
    setModalState("selection");
    setErrorMessage("");
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedWallet(null);
    setModalState("selection");
    setErrorMessage("");
  };

  const handleSelect = (name: string) => {
    setSelectedWallet(name);
    setModalState("connecting");
    select(name as any);
  };

  React.useEffect(() => {
    if (!selectedWallet) return;
    if (connecting) {
      setModalState("connecting");
    } else if (connected && publicKey) {
      setTimeout(closeModal, 1500);
    } else if (!connecting && !connected && modalState === "connecting") {
      setModalState("error");
setErrorMessage(\`Failed to connect to \${selectedWallet}. Please try again.\`);
    }
  }, [connecting, connected, publicKey, selectedWallet, modalState]);

  const defaultBtn = "bg-white text-black px-5 py-2.5 rounded-xl shadow";
  const connectedBtn = "flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl shadow";

  return (
    <div className="relative">
      {connected && publicKey ? (
        <motion.button
          className={cn(connectedBtn, buttonClassName)}
          onClick={disconnect}
          whileTap={{ scale: 0.95 }}
        >
          <span className="truncate font-mono">
            {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
          </span>
          <LogOut className="w-5 h-5" />
        </motion.button>
      ) : (
        <motion.button
          onClick={openModal}
          className={cn(defaultBtn, buttonClassName)}
          whileTap={{ scale: 0.95 }}
        >
          Connect Wallet
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Selection Screen */}
              {modalState === "selection" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Select Wallet</h3>
                    <button onClick={closeModal} className="text-gray-500">&times;</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                    {displayedWallets.map((w) => (
                      <button
                        key={w.name}
                        onClick={() => handleSelect(w.name)}
                        onMouseEnter={() => setHovered(w.name)}
                        onMouseLeave={() => setHovered(null)}
                        className="flex flex-col items-center p-4 border rounded-xl hover:bg-purple-50 transition"
                      >
                        {w.icon ? (
                          <Image src={w.icon} width={40} height={40} alt={w.name} className="rounded-full" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        )}
                        <span className="mt-2 text-sm">{w.name}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 text-sm text-purple-600 hover:underline flex items-center gap-1"
                  >
                    {showAll ? "Show Less" : "Show More"}{" "}
                    {showAll ? <EyeOff className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {/* Connecting Screen */}
              {modalState === "connecting" && (
                <div className="text-center py-8 space-y-4">
                  <Clock className="mx-auto w-12 h-12 text-purple-600 animate-spin" />
                  <p>Connecting to {selectedWallet}…</p>
                </div>
              )}

              {/* Error Screen */}
              {modalState === "error" && (
                <div className="text-center py-8 space-y-4">
                  <AlertCircle className="mx-auto w-12 h-12 text-red-600" />
                  <p className="text-red-600">{errorMessage}</p>
                  <button onClick={() => setModalState("selection")} className="text-purple-600 hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Try Again
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


`
  }
];
