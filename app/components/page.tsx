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
              staggerChildren: 0.3, // Stagger the animation of child sections
            },
          },
        }}
      >
        {/* Introduction Section */}
        <motion.section variants={sectionVariants}>
          <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
            Elevate Your Solana dApps with Solvibe-UI
          </h1>
          <hr className="border-neutral-700 mb-8" />
          <p className="text-neutral-300 text-lg leading-relaxed">
            Welcome to Solvibe-UI, your intuitive and powerful component library meticulously designed for{' '}
            <strong>seamless integration and exceptional user experiences</strong> on the Solana blockchain.
            We're here to help you build dApps that not only function flawlessly but also delight your users.
          </p>
        </motion.section>

        {/* Why Solvibe-UI Exists Section */}
        <motion.section variants={sectionVariants}>
          <h2 className="text-4xl font-semibold mb-4 text-white mt-8">
            Why Solvibe-UI? Addressing the Solana Developer's Journey
          </h2>
          <hr className="border-neutral-700 mb-6" />
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

        {/* The Power of Great Design in Web3 Section */}
        <motion.section variants={sectionVariants}>
          <h2 className="text-3xl font-semibold mb-4 text-white mt-8">
            The Impact of Thoughtful Design in Web3
          </h2>
          <hr className="border-neutral-700 mb-6" />
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

    

        {/* The Solvibe-UI Advantage Section */}
        <motion.section variants={sectionVariants}>
          <h2 className="text-3xl font-semibold mb-4 text-white mt-8">
            The Solvibe-UI Advantage
          </h2>
          <hr className="border-neutral-700 mb-6" />
          <p className="text-neutral-300 mb-6 leading-relaxed">
            By leveraging Solvibe-UI, you gain significant advantages:
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
              <strong>Solana-First Philosophy:</strong> Every component is built with Solana's unique architecture
              and performance characteristics in mind.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Developer Sanity:</strong> We've obsessed over the details – wallet connection modals,
              transaction state management, responsive design – so you don't have to.
              This means a <strong>100x better developer experience</strong>.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Rapid Prototyping & Customization:</strong> Use our components out-of-the-box for speed,
              or easily tailor them to match your dApp's unique branding and style.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Performance Obsessed:</strong> Optimized for the blazing-fast experience Solana users expect.
              No more laggy UIs.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>Easier User Onboarding:</strong> A consistent, familiar, and intuitive UI lowers the barrier
              for new users, helping them confidently interact with your Solana dApp.
            </motion.li>
          </motion.ul>
          <p className="text-neutral-400 italic leading-relaxed mt-8">
            In essence, Solvibe-UI is committed to lowering the barrier to entry for both Solana
            developers and end-users, fostering a more vibrant, accessible, and user-friendly dApp ecosystem.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};


export default GettingStartedPage;
