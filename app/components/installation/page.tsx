'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InstallationPage: React.FC = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const CodeBlock = ({ children }: { children: React.ReactNode }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
      navigator.clipboard.writeText(children as string);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    
    return (
      <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto my-4 relative group">
        <code className="text-green-400 font-mono text-sm">{children}</code>
        <button 
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-400" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  };
  
  const CopyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
  
  const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const InstallationStep = ({ 
    number, 
    title, 
    description, 
    code 
  }: { 
    number: number, 
    title: string, 
    description: React.ReactNode, 
    code: string 
  }) => {
    return (
      <motion.div 
        className="mb-8 border border-neutral-800 rounded-lg p-6"
        variants={itemVariants}
      >
        <div className="flex items-center mb-4">
          <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
            {number}
          </div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
        </div>
        <div className="pl-12">
          <p className="text-neutral-300 mb-4 leading-relaxed">{description}</p>
          <CodeBlock>{code}</CodeBlock>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-8 py-8">
      <motion.div
        className="space-y-12"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {/* Installation Header Section */}
        <motion.section variants={sectionVariants}>
          <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
            Installation Guide
          </h1>
          <hr className="border-neutral-700 mb-8" />
          <p className="text-neutral-300 text-lg leading-relaxed">
            Get started with Solvibe-UI in just a few steps. This guide will walk you through setting up Next.js 
            and installing the necessary Solana wallet adapters for your dApp development.
          </p>
        </motion.section>

        <motion.section variants={sectionVariants}>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Prerequisites
          </h2>
          <hr className="border-neutral-700 mb-6" />
          <p className="text-neutral-300 mb-6 leading-relaxed">
            Before you begin, ensure you have the following installed:
          </p>
          <motion.ul
            className="list-disc list-inside text-neutral-300 mb-6 pl-4 space-y-2 leading-relaxed"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.li variants={itemVariants}>Node.js (version 16.8 or later)</motion.li>
            <motion.li variants={itemVariants}>npm or yarn package manager</motion.li>
          </motion.ul>
        </motion.section>

        {/* Installation Steps Section */}
        <motion.section variants={sectionVariants}>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Installation Steps
          </h2>
          <hr className="border-neutral-700 mb-6" />
          
          <motion.div
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            <InstallationStep 
              number={1} 
              title="Set Up Next.js Project" 
              description={
                <>
                  Create a new Next.js project with the following command. You'll be prompted with several configuration 
                  options:
                </>
              }
              code="npx create-next-app@latest my-solana-app"
            />
            
            <motion.div className="ml-12 mb-8 bg-neutral-800 rounded-lg p-6" variants={itemVariants}>
              <h4 className="text-xl font-semibold text-white mb-4">Next.js Configuration Options</h4>
              <p className="text-neutral-300 mb-4">When running the create-next-app command, you'll be prompted with the following options:</p>
              <ul className="list-disc list-inside text-neutral-300 space-y-2 pl-4">
                <li><span className="text-purple-400">Would you like to use TypeScript?</span> → Yes</li>
                <li><span className="text-purple-400">Would you like to use ESLint?</span> → No</li>
                <li><span className="text-purple-400">Would you like to use Tailwind CSS?</span> → Yes</li>
                <li><span className="text-purple-400">Would you like to use `src/` directory?</span> → No</li>
                <li><span className="text-purple-400">Would you like to use App Router? (recommended)</span> → Yes</li>
                <li><span className="text-purple-400">Would you like to customize the default import alias (@/*)?</span> → @</li>
              </ul>
            </motion.div>

            <InstallationStep 
              number={2} 
              title="Install Solana Wallet Adapters" 
              description={
                <>
                  Install the necessary Solana wallet adapter packages to enable 
                  wallet connectivity in your application:
                </>
              }
              code="npm install @solana/wallet-adapter-react @solana/wallet-adapter-wallets @solana/wallet-adapter-base"
            />

            <InstallationStep 
              number={3} 
              title="Install Solana Web3.js" 
              description={
                <>
                  Install the Solana web3.js library, which is a foundational dependency 
                  for interacting with the Solana blockchain:
                </>
              }
              code="npm install @solana/web3.js"
            />

            <InstallationStep 
              number={4} 
              title="Install Tailwind CSS and Framer Motion" 
              description={
                <>
                  Install Framer Motion for styling and animations:
                </>
              }
              code="npm install framer-motion"
            />

       
          </motion.div>
        </motion.section>


        <motion.section variants={sectionVariants}>
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Next Steps
          </h2>
          <hr className="border-neutral-700 mb-6" />
          <p className="text-neutral-300 mb-6 leading-relaxed">
            Now that you have installed and configured the basic setup, you're ready to start using Solvibe-UI 
            components in your project. Check out our component documentation to explore all the available 
            components and their usage.
          </p>
       
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Need Help?
          </h2>
          <hr className="border-neutral-700 mb-6" />
          <p className="text-neutral-300 leading-relaxed">
            If you encounter any issues during installation or have questions about using Solvibe-UI, 
            check out our GitHub repository for 
            more resources and support.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default InstallationPage;