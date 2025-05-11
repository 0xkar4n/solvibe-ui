"use client"

import { useState, useEffect } from "react"
import { Highlight, themes } from "prism-react-renderer"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language, className, showLineNumbers = true }: CodeBlockProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <pre className={cn("p-4 text-sm bg-neutral-950 text-neutral-400", className)}>{code}</pre>
  }

  return (
    <Highlight theme={themes.vsDark} code={code} language={language as any}>
      {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={cn(highlightClassName, "p-4 text-sm font-mono", className)} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {showLineNumbers && (
                <span className="inline-block w-8 text-right mr-4 text-neutral-600 select-none">{i + 1}</span>
              )}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
