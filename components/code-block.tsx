'use client';

import React, { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import shell from 'react-syntax-highlighter/dist/esm/languages/prism/shell-session';
import DarkStyle from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { IconCopy, IconCheck, IconMaximize, IconMinimize } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('shell', shell);

interface CodeBlockProps {
  code: string;
  language?: 'tsx' | 'shell';
  previewLines?: number;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  previewLines = 5,
  className,
}: CodeBlockProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const lines = code.split('\n');
  const isLong = lines.length > previewLines!;
  const displayText = mounted
    ? isLong && !expanded
      ? lines.slice(0, previewLines).join('\n')
      : code
    : '';

  return (
    <div className={cn('relative overflow-hidden rounded-md bg-neutral-900 text-neutral-200', className)}>
      {/* Top-right controls */}
      <div className="absolute right-2 top-2 z-20 flex space-x-1">
        <Button size="icon" variant="ghost" onClick={handleCopy} disabled={copied} aria-label="Copy code">
          {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
        </Button>
        {isLong && (
          <Button size="icon" variant="ghost" onClick={() => setExpanded(!expanded)} aria-label={expanded ? 'Collapse code' : 'Expand code'}>
            {expanded ? <IconMinimize size={18} /> : <IconMaximize size={18} />}
          </Button>
        )}
      </div>

      {/* Center Expand button overlay when collapsed */}
      {isLong && !expanded && (
        <div className="absolute inset-0 flex items-center justify-center z-40 ">
          <Button className='bg-neutral-500 text-white hover:bg-neutral-600' size="sm" onClick={() => setExpanded(true)}>
            Expand
          </Button>
        </div>
      )}

      {/* Fade overlay when collapsed */}
      {isLong && !expanded && (
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-neutral-900 to-transparent z-10" />
      )}

      <div className={cn('p-4 overflow-auto', !expanded && isLong && `max-h-[${previewLines! * 1.5}rem]`)}>
        {mounted ? (
          <SyntaxHighlighter
            language={language}
            style={DarkStyle}
            showLineNumbers
            wrapLines
          >
            {displayText}
          </SyntaxHighlighter>
        ) : (
          <div className="h-36 animate-pulse bg-neutral-800 rounded-md" />
        )}
      </div>
    </div>
  );
}
