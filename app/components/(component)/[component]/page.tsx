"use client"

import { useParams, useRouter } from "next/navigation"
import { Registry } from "@/registry"
import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Copy, Check, ExternalLink, Github, Package, Code2, Layers } from "lucide-react"
import { motion } from "framer-motion"

export default function ComponentPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params?.component === "string" ? params.component : undefined

  const entry = Registry.find((d) => d.id === id)

  const [tab, setTab] = useState<"preview" | "code" | "installation">("preview")
  const [copied, setCopied] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // For hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!entry) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center p-6 bg-black text-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Component Not Found</h2>
          <p className="text-lg text-neutral-400">The component you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/components")} variant="default">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Components
          </Button>
        </div>
      </div>
    )
  }

  const { title, description, Component, demoCode, installation} = entry

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(demoCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isClient) {
    return null // Prevent hydration issues
  }

  return (
    <div className="flex flex-col lg:flex-row bg-black text-white min-h-screen">

      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-400 "
              onClick={() => router.push("/components")}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              All Components
            </Button>
          </div>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 border-b border-neutral-800 pb-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
              {/* <div className="flex items-center space-x-3">
                {version && (
                  <Badge variant="outline" className="text-neutral-400 border-neutral-700">
                    v{version}
                  </Badge>
                )}
                {category && <Badge className="bg-neutral-800 hover:bg-neutral-700 text-white">{category}</Badge>}
              </div> */}
            </div>
            <p className="text-lg text-neutral-400 max-w-3xl">{description}</p>
           
          </motion.header>

          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as "preview" | "code" | "installation")}
            className="w-full"
          >
            <TabsList className="bg-neutral-900 border border-neutral-800 p-1">
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white"
              >
                <Layers className="mr-2 h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Code2 className="mr-2 h-4 w-4" />
                Code
              </TabsTrigger>
              <TabsTrigger
                value="installation"
                className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Installation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                
                <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.2 }}
                  className={cn(
                    "flex min-h-[500px]  items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 p-10 backdrop-blur-sm transition-all",
                    "hover:border-neutral-700 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]",
                  )}
                >
                  <div className="component-preview w-full">
                    <Component />
                  </div>
                </motion.div>
                <div className="mt-4 text-sm text-neutral-500 text-center">
                  Interact with the component to see its different states
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="code" className="mt-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-neutral-700"></div>
                      <div className="h-3 w-3 rounded-full bg-neutral-700"></div>
                      <div className="h-3 w-3 rounded-full bg-neutral-700"></div>
                    </div>
                    <div className="text-xs font-medium text-neutral-500">DemoComponent.tsx</div>
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      variant="ghost"
                      className="text-neutral-400 hover:text-white"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
                    </Button>
                  </div>
                  <CodeBlock
                    code={demoCode}
                    language="tsx"
                    className="max-h-[600px] overflow-auto rounded-none border-0"
                  />
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="installation" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {installation && installation.length > 0 ? (
                  installation.map((step, idx) => (
                    <div
                      key={idx}
                      className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all hover:border-neutral-700"
                    >
                      <h3 className="flex items-center text-xl font-medium tracking-tight text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-sm mr-3">
                          {idx + 1}
                        </span>
                        {step.title}
                      </h3>
                      <div className="overflow-hidden rounded-md border border-neutral-800 bg-neutral-950">
                        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-2">
                          <div className="text-xs font-medium text-neutral-500">
                            {step.code.trim().startsWith("npm") ||
                            step.code.trim().startsWith("yarn") ||
                            step.code.trim().startsWith("pnpm")
                              ? "Terminal"
                              : "Code"}
                          </div>
                          <Button
                            onClick={async () => {
                              await navigator.clipboard.writeText(step.code)
                              setCopied(true)
                              setTimeout(() => setCopied(false), 2000)
                            }}
                            size="sm"
                            variant="ghost"
                            className="text-neutral-400 hover:text-white"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
                          </Button>
                        </div>
                        <CodeBlock
                          code={step.code}
                          language={
                            step.code.trim().startsWith("npm") ||
                            step.code.trim().startsWith("yarn") ||
                            step.code.trim().startsWith("pnpm")
                              ? "shell"
                              : "tsx"
                          }
                          className="max-h-[300px] overflow-auto rounded-none border-0"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8 text-center">
                    <p className="text-neutral-400">No installation instructions available.</p>
                  </div>
                )}

                
              </motion.div>
            </TabsContent>
          </Tabs>

          <section className="space-y-6 border-t border-neutral-800 pt-10">
            <h2 className="text-3xl font-semibold tracking-tight">Component Props</h2>
            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900">
                    <th className="px-4 py-3 text-left font-medium text-neutral-300">Prop</th>
                    <th className="px-4 py-3 text-left font-medium text-neutral-300">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-neutral-300">Default</th>
                    <th className="px-4 py-3 text-left font-medium text-neutral-300">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {entry.props?.map((prop, idx) => (
                    <tr key={idx} className="bg-neutral-950 transition-colors hover:bg-neutral-900">
                      <td className="px-4 py-3 font-medium text-white">{prop.name}</td>
                      <td className="px-4 py-3 text-neutral-400">
                        <code className="rounded bg-neutral-900 px-1 py-0.5 text-xs text-neutral-300">{prop.type}</code>
                      </td>
                      <td className="px-4 py-3 text-neutral-400">
                        {prop.default ? (
                          <code className="rounded bg-neutral-900 px-1 py-0.5 text-xs text-neutral-300">
                            {prop.default}
                          </code>
                        ) : (
                          <span className="text-neutral-500">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-neutral-400">{prop.description}</td>
                    </tr>
                  ))}
                  {!entry.props || entry.props.length === 0 ? (
                    <tr className="bg-neutral-950">
                      <td colSpan={4} className="px-4 py-3 text-center text-neutral-500">
                        No props documented for this component.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>

      

       
        </div>
      </main>
    </div>
  )
}
