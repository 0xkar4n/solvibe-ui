"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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
    ],
  },
  {
    title: 'Components',
    links: [
      { href: '/components/connect-wallet', label: 'Connect Wallet' },
      { href: '/components/transaction-history', label: 'Transaction History' },
      { href: '/components/solana-balance-badge', label: 'Solana Balance Badge' },
      { href: '/components/stake', label: 'Stake' },


     
    ],
  },
]
  

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="bg-black text-neutral-300 w-64 min-h-screen p-4 border-neutral-600 border-dashed border-r">
      <nav>
        <ul>
          {sidebarSections.map((section, index) => (
            <li key={index} className="mb-6">
              <div className="text-neutral-100 text-sm font-semibold mb-2">{section.title}</div>
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
    </div>
  );
};

export default Sidebar;