'use client';
import React from 'react';
import { motion } from 'motion/react';

const GettingStartedPage: React.FC = () => {
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
        <motion.section variants={sectionVariants}>
          <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
            Elevate Your Solana dApps with Solvibe-UI
          </h1>
          <div className="fade-dashed-border-bottom h-2 w-full mb-4" ></div>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Welcome to Solvibe-UI, your intuitive and powerful component library meticulously designed for{' '}
            <strong>seamless integration and exceptional user experiences</strong> on the Solana blockchain.
            We're here to help you build dApps that not only function flawlessly but also delight your users.
          </p>
        </motion.section>

        <motion.section variants={sectionVariants}>
          <h2 className="text-4xl font-semibold mb-4 text-white mt-8">
            Why Solvibe-UI? Addressing the Solana Developer's Journey
          </h2>
          <div className="fade-dashed-border-bottom h-2 w-full mb-4" ></div>
          <p className="text-neutral-300 mb-6 leading-relaxed">
            As Solana developers, we understand the grind. You're navigating complex blockchain interactions,
            wrestling with wallet integrations that can feel like arcane rituals, and constantly optimizing for
            Solana's impressive speed. The last thing you need is to lose precious time battling UI inconsistencies
            or reinventing the wheel for common components.
          </p>
          <p className="text-neutral-300 leading-relaxed">
            Solvibe-UI was born from this understanding. We've been in your shoes, felt the friction, and
            decided to build a solution. Our mission is simple: <strong>to let you focus on what you do best
            – building innovative Solana dApps – while we handle the UI heavy lifting.</strong>
          </p>
        </motion.section>

        <motion.section variants={sectionVariants}>
          <h2 className="text-3xl font-semibold mb-4 text-white mt-8">
            The Impact of Thoughtful Design in Web3
          </h2>
          <div className="fade-dashed-border-bottom h-2 w-full mb-4" ></div>
          <p className="text-neutral-300 mb-6 leading-relaxed">
            In the Web3 space, trust is paramount. Your user interface is more than just aesthetics;
            it's your initial handshake, a reflection of your project's professionalism, and a promise of reliability.
            A polished, intuitive UI communicates:
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
            <motion.li variants={itemVariants}>"We prioritize security and user safety."</motion.li>
            <motion.li variants={itemVariants}>"We value your time and aim for clarity."</motion.li>
            <motion.li variants={itemVariants}>"We are committed to quality and long-term vision."</motion.li>
          </motion.ul>
          <p className="text-neutral-300 leading-relaxed">
            Think about the dApps you admire. Chances are, they feature UIs that feel smooth, professional,
            and simply intuitive. This is the standard Solvibe-UI helps you achieve.
          </p>
        </motion.section>

    
        <motion.section variants={sectionVariants}>
          <h2 className="text-3xl font-semibold mb-4 text-white mt-8">
            Accelerate Your Solana dApp Development
          </h2>
          <div className="fade-dashed-border-bottom h-2 w-full mb-4" ></div>
          <p className="text-neutral-300 mb-6 leading-relaxed">
            Leveraging a specialized UI component library for Solana provides significant advantages,
            streamlining your development workflow and enhancing the user experience:
          </p>
          <motion.ul
            className="list-disc list-inside text-neutral-300 mb-6 pl-4 space-y-3 leading-relaxed"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.li variants={itemVariants}>
              <strong>Built for Solana:</strong> Components are designed and optimized with Solana's unique speed
              and transaction model in mind, ensuring seamless integration and performance.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Developer Efficiency Boost:</strong> Pre-built, well-tested components like wallet connection modals,
              NFT gallery, and input fields save you countless hours. Focus on your dApp's logic, not boilerplate UI.
              This translates to a <strong>dramatically faster time-to-market</strong>.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Consistent & Polished UI:</strong> Deliver a professional and consistent user interface out-of-the-box,
              reducing the design and styling overhead and making your dApp instantly feel more robust.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Responsive by Design:</strong> Components are built to look great and function perfectly
              across all devices, from mobile phones to desktops, without extra effort.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Simplified User Interaction:</strong> Intuitive and familiar UI patterns for common Solana interactions
              (like connecting wallets or approving transactions) lower the learning curve for users, improving adoption.
            </motion.li>
          </motion.ul>
          <p className="text-neutral-400 italic leading-relaxed mt-8">
            By utilizing pre-built, SolVibe UI components, you can drastically reduce development time,
            minimize potential errors, and deliver a superior user experience for your decentralized application on the Solana chain.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};


export default GettingStartedPage;
