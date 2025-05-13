"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Registry } from "@/registry"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, ChevronRight, Package, Layers } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

const groupedComponents = Registry.reduce(
  (acc, component) => {
    const category = component.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(component)
    return acc
  },
  {} as Record<string, typeof Registry>,
)

interface ComponentNavProps {
  currentComponent?: string
}

export function ComponentNav({ currentComponent }: ComponentNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredComponents, setFilteredComponents] = useState(Registry)
  const [isClient, setIsClient] = useState(false)

  // For hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Filter components based on search query
    if (searchQuery.trim() === "") {
      setFilteredComponents(Registry)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredComponents(
        Registry.filter(
          (component) =>
            component.title.toLowerCase().includes(query) ||
            component.description.toLowerCase().includes(query) ||
            component.category?.toLowerCase().includes(query),
        ),
      )
    }
  }, [searchQuery])

  // Group filtered components by category
  const filteredGroupedComponents = filteredComponents.reduce(
    (acc, component) => {
      const category = component.category || "Uncategorized"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(component)
      return acc
    },
    {} as Record<string, typeof Registry>,
  )

  if (!isClient) {
    return null // Prevent hydration issues
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="bg-neutral-900 border-neutral-800"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-neutral-800 p-4">
                <Link href="/components" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Package className="h-6 w-6" />
                  <span className="text-lg font-bold">Components</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <Input
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-neutral-900 border-neutral-800"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1 overflow-auto p-4">
                {Object.entries(filteredGroupedComponents).map(([category, components]) => (
                  <div key={category} className="mb-6">
                    <h3 className="mb-2 text-sm font-medium text-neutral-400 uppercase tracking-wider">{category}</h3>
                    <ul className="space-y-1">
                      {components.map((component) => (
                        <li key={component.id}>
                          <Link
                            href={`/components/${component.id}`}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                              component.id === currentComponent
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-400 hover:bg-neutral-900 hover:text-white",
                            )}
                          >
                            <Layers className="mr-2 h-4 w-4" />
                            {component.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r border-neutral-800 bg-neutral-950 overflow-y-auto">
        <div className="flex flex-col h-screen sticky top-0">
          <div className="p-4 border-b border-neutral-800">
            <Link href="/components" className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span className="text-lg font-bold">Components</span>
            </Link>
          </div>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-neutral-900 border-neutral-800"
              />
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            {Object.entries(filteredGroupedComponents).map(([category, components]) => (
              <div key={category} className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-neutral-400 uppercase tracking-wider">{category}</h3>
                <ul className="space-y-1">
                  {components.map((component) => (
                    <li key={component.id}>
                      <Link
                        href={`/components/${component.id}`}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                          component.id === currentComponent
                            ? "bg-neutral-800 text-white"
                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white",
                        )}
                      >
                        <Layers className="mr-2 h-4 w-4" />
                        {component.title}
                        {component.id === currentComponent && <ChevronRight className="ml-auto h-4 w-4" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
