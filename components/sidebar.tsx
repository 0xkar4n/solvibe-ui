"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface SidebarLink {
  href: string;
  label: string;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'Getting started',
    links: [
      { href: '/components', label: 'Information' },
      { href: '/components/installation', label: 'Installation' },      
    ],
  },
  {
    title: 'Components',
    links: [
      { href: '/components/connect-wallet', label: 'Connect Wallet' },
      { href: '/components/transaction-history', label: 'Transaction History' },
      { href: '/components/solana-balance-badge', label: 'Solana Balance Badge' },
      { href: '/components/nft-card', label: 'NFT Card' },
      { href: '/components/nft-gallery', label: 'NFT Gallery' },     
    ],
  },
  // {
  //   title: 'Full Fledged Components',
  //   links: [
  //     { href: '/components/stake', label: 'Stake' },
  //   ],
  // },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContent = (
    <nav>
      <ul>
        {sidebarSections.map((section, index) => (
          <li key={index} className="mb-2 py-2 border-b border-neutral-600 border-dashed last:border-b-0">
            <div className="text-neutral-200 text-md font-bold mb-2">{section.title}</div>
            <ul>
              {section.links.map((link, linkIndex) => {
                const isActive = pathname === link.href;
                return (
                  <li key={linkIndex} className="mb-2">
                    <Link href={link.href} legacyBehavior>
                      <a
                        className={`block py-2 font-normal text-sm px-3 rounded-md transition duration-200 ease-in-out
                          ${isActive
                            ? 'bg-neutral-800 text-white'
                            : 'hover:bg-neutral-800 hover:text-neutral-100'
                          }`}
                        onClick={() => isMobile && setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isMobile) {
    return (
      <>
        <div className="absolute top-4 left-4 z-50">
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-700 transition duration-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className={`bg-black mt-12 text-neutral-300 w-64 min-h-screen p-4 border-neutral-600 border-dashed border-r transform transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {sidebarContent}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-black text-neutral-300 w-64 min-h-screen p-4 border-neutral-600 border-dashed border-r hidden md:block">
      {sidebarContent}
    </div>
  );
};

export default Sidebar;