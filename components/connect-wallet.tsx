"use client"

import type React from "react"
import { useState, useMemo, useEffect, memo } from "react"
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  MathWalletAdapter,
  AlphaWalletAdapter,
  AvanaWalletAdapter,
  TrezorWalletAdapter,
  BitpieWalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { WalletReadyState } from "@solana/wallet-adapter-base"
import Image from "next/image"
import { EyeOff, ChevronDown, LogOut, Check, ArrowLeft, AlertCircle, CheckCheckIcon, CheckIcon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  new MathWalletAdapter(),
  new AlphaWalletAdapter(),
  new AvanaWalletAdapter(),
  new BitpieWalletAdapter(),
  new CoinbaseWalletAdapter(),
  new LedgerWalletAdapter(),
  new TrustWalletAdapter(),
  new TrezorWalletAdapter(),
]

const ConnectWallet: React.FC = () => {
  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModal />
      </WalletProvider>
    </ConnectionProvider>
  )
}

// Modal states
type ModalState = "selection" | "connecting" | "error"

const WalletModal: React.FC = () => {
  const { select, publicKey, disconnect, wallet, connecting, connected } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [modalState, setModalState] = useState<ModalState>("selection")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const displayed = showAll ? wallets : wallets.slice(0, 6)

  function open() {
    setIsOpen(true)
    setModalState("selection")
  }

  function close() {
    setIsOpen(false)
    setSelectedWallet(null)
    setModalState("selection")
    setErrorMessage("")
  }

  function toggle() {
    setShowAll((prev) => !prev)
  }

  function goBack() {
    setModalState("selection")
    setSelectedWallet(null)
    setErrorMessage("")
  }

  // Handle wallet selection
  const handleSelectWallet = (walletName: string) => {
    const selectedWalletAdapter = wallets.find((w) => w.name === walletName)

    if (selectedWalletAdapter?.readyState !== WalletReadyState.Installed) {
      setModalState("error")
      setErrorMessage(`${walletName} is not installed. Please install it and try again.`)
      return
    }

    setSelectedWallet(walletName)
    setModalState("connecting")


    select(walletName)
  }

  // Monitor connection status
  useEffect(() => {
    if (connecting && selectedWallet) {
      setModalState("connecting")
    } else if (connected && publicKey && selectedWallet) {
    

      // Close modal after a short delay to show success state
      setTimeout(() => {
        close()
      }, 1500)
    } else if (!connecting && !connected && selectedWallet && modalState === "connecting") {
      // If we were connecting but now we're not, and we're not connected, it's an error
      setModalState("error")
      setErrorMessage(`Failed to connect to ${selectedWallet}. Please try again.`)
    }
  }, [connecting, connected, publicKey, selectedWallet, wallet, modalState])

  // Button animations
  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0px 0px 0px rgba(147, 51, 234, 0)" },
    hover: {
      scale: 1.03,
      // boxShadow: "0px 4px 20px rgba(147, 51, 234, 0.3)",
      // background: "linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)",
    },
    tap: { scale: 0.97 },
  }

  // Connected state animations
  const connectedVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  // Modal animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = {
    hidden: { scale: 0.8, y: 20, opacity: 0 },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
    exit: {
      scale: 0.8,
      y: 20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  // Wallet item animations
  const walletItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  // Page transition animations
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Loading animation variants
  const loadingCircleVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  return (
    <div className="relative z-50">
      {publicKey ? (
        <motion.button
         
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div className="flex items-center gap-2" layout>
            
            <motion.span
              className="truncate w-32 md:w-40 font-medium text-xl"
              variants={connectedVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </motion.span>
            <motion.button  onClick={disconnect}>
            <LogOut  className="w-6 h-6 " />
            </motion.button>
          </motion.div>
        </motion.button>
      ) : (
        <motion.button
          onClick={open}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-purple-500/20"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Connect Wallet
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800 overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {modalState === "selection" && (
                  <motion.div
                    key="selection"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Connect Wallet</h3>
                      <motion.button
                        onClick={close}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        &times;
                      </motion.button>
                    </div>

                    <div className="grid grid-col-2 gap-4 max-h-64 p-2 overflow-y-auto custom-scrollbar">
                      {displayed.map((wallet, index) => (
                        <motion.button
                          key={wallet.name}
                          onClick={() => handleSelectWallet(wallet.name)}
                          disabled={wallet.readyState !== "Installed"}
                          className={`flex flex-col items-center p-4 rounded-xl transition transform space-y-2 border
                            ${
                              wallet.readyState !== "Installed"
                                ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-700"
                            }`}
                          variants={walletItemVariants}
                          whileHover={
                            wallet.readyState === "Installed"
                              ? {
                                  //scale: 1.03,
                                  y: -2,
                                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                  borderColor: "rgba(147, 51, 234, 0.5)",
                                }
                              : {}
                          }
                          onHoverStart={() => setHovered(wallet.name)}
                          onHoverEnd={() => setHovered(null)}
                        >
                          <div className="relative w-12 h-12 flex items-center justify-center">
                            {wallet.icon ? (
                              <Image
                                src={wallet.icon || "/placeholder.svg"}
                                width={48}
                                height={48}
                                alt={wallet.name}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
                            )}

                            {hovered === wallet.name && wallet.readyState === "Installed" && (
                              <motion.div
                                className="absolute inset-0 bg-purple-500/10 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 0 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </div>

                          <motion.span
                            className="text-sm font-medium"
                            animate={{
                              color:
                                hovered === wallet.name && wallet.readyState === "Installed" ? "#9333ea" : "#6b7280",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {wallet.name}
                          </motion.span>

                          {wallet.readyState !== "Installed" && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">Not installed</span>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      onClick={toggle}
                      className="flex items-center justify-center w-full py-3 rounded-lg border border-gray-300 dark:border-gray-700 transition hover:bg-gray-50 dark:hover:bg-gray-800"
                      whileHover={{ y: -2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ y: 0 }}
                    >
                      <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                        {showAll ? "Show Less" : "More Wallets"}
                      </span>
                      {showAll ? <EyeOff className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </motion.button>
                  </motion.div>
                )}

                {modalState === "connecting" && (
                  <motion.div
                    key="connecting"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center justify-center space-y-6 py-8"
                  >
                    <motion.div
                      className="relative w-24 h-24"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        width="96"
                        height="96"
                        viewBox="0 0 96 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute"
                      >
                        <motion.circle cx="48" cy="48" r="40" stroke="#E9D5FF" strokeWidth="4" strokeLinecap="round" />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#9333EA"
                          strokeWidth="4"
                          strokeLinecap="round"
                          variants={loadingCircleVariants}
                          initial="initial"
                          animate="animate"
                          style={{ pathLength: 1 }}
                        />
                      </svg>

                      {selectedWallet && wallets.find((w) => w.name === selectedWallet)?.icon && (
                        <div className="absolute inset-0 flex items-center justify-center">

                        

                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          >

                          {!connected?
                            <Image
                              src={wallets.find((w) => w.name === selectedWallet)?.icon || "/placeholder.svg"}
                              width={48}
                              height={48}
                              alt={selectedWallet}
                              className="rounded-full"
                            />
                            :
                            <motion.div
                            initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 1, scale: [0,2.5,2.3,2.5] }}
                      transition={{ duration: 0.3 }}
                      className="text-bold font-2xl text-white bg-green-400 rounded-full p-2"
                            >
                              <CheckIcon /> 
                          </motion.div>
                          }
                          </motion.div>
                        </div>
                      )}
                    </motion.div>

                    <div className="text-center space-y-2">
                    {!connected?
                      <motion.h3
                        className="text-xl font-semibold text-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        Connecting to {selectedWallet}
                         
                      </motion.h3>
                      :
                      <motion.h3
                      className="text-xl font-semibold text-gray-800 dark:text-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                         Connected to {selectedWallet}

                    </motion.h3>                     
                    }
                     {!connected?
                      <motion.p
                        className="text-sm text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Confirm the connection in your wallet
                      </motion.p>
                      :
                      <motion.p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 1, y: 10 }}
                      animate={{ opacity: 0}}
                      transition={{ delay: 0.2 }}
                    >
                      Confirm the connection in your wallet
                    </motion.p>

                     }
                    </div>

                    <motion.button
                      onClick={goBack}
                      className="flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 transition hover:bg-gray-50 dark:hover:bg-gray-800 mt-4"
                      whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Back to wallet selection</span>
                    </motion.button>
                  </motion.div>
                )}

                {modalState === "error" && (
                  <motion.div
                    key="error"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center justify-center space-y-6 py-8"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <AlertCircle className="w-8 h-8" />
                    </motion.div>

                    <div className="text-center space-y-2">
                      <motion.h3
                        className="text-xl font-semibold text-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        Connection Failed
                      </motion.h3>
                      <motion.p
                        className="text-sm text-red-500 dark:text-red-400 max-w-xs mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {errorMessage || "Failed to connect to wallet. Please try again."}
                      </motion.p>
                    </div>

                    <motion.button
                      onClick={goBack}
                      className="flex items-center justify-center px-6 py-2 rounded-lg bg-purple-600 text-white transition hover:bg-purple-700 mt-4"
                      whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(147, 51, 234, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-sm font-medium">Try Again</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ConnectWallet

 