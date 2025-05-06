'use client';

import { useParams } from 'next/navigation';
import { Registry } from '@/registry'; // Assuming this holds your component data
import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'; // Assuming Shadcn Tabs path
import { CodeBlock } from '@/components/code-block'; // Your custom code block component
import { cn } from '@/lib/utils'; // Optional: Shadcn's utility for conditional classes

// Define a type for your registry entries for better type safety
interface RegistryEntry {
  id: string;
  title: string;
  description: string;
  Component: React.ComponentType<any>; // Or a more specific type if props are known
  demoCode: string;
  installation: Array<{
    title: string;
    code: string;
  }>;
}

export default function ComponentsPage() {
  const params = useParams();
  // Ensure id is treated as a string or undefined
  const id = typeof params?.component === 'string' ? params.component : undefined;

  // Find the component entry using the ID
  const entry: RegistryEntry | undefined = Registry.find((d) => d.id === id);

  // State for managing the active tab
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  // Handle case where the component is not found
  if (!entry) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center p-6">
        <p className="text-lg text-muted-foreground">Component not found.</p>
      </div>
    );
  }

  // Destructure the found entry for easier access
  const { title, description, Component, demoCode, installation } = entry;

  return (
    // Use a container for consistent padding and max-width
    // Added more vertical padding (py-12)
    <div className="container mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-6 lg:px-8">
      {/* Page Header */}
      <header className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </header>

      {/* Tabs for Preview and Code */}
      <Tabs value={tab} onValueChange={(value) => setTab(value as 'preview' | 'code')} className="w-full">
        {/* Tab Triggers */}
        <TabsList className=' text-neutral-700 bg-neutral-500' >
          <TabsTrigger value="preview" >Preview</TabsTrigger>
          <TabsTrigger value="code" >Code</TabsTrigger>
        </TabsList>

        {/* Preview Content */}
        <TabsContent value="preview">
          <div
            className={cn(
              'mt-2 flex min-h-[500px] items-center justify-center rounded-md border border-neutral-600 ', // Shadcn-like styling: border, subtle background, rounded corners, padding
            )}
          >
            <Component />
          </div>
        </TabsContent>

        {/* Code Content */}
        <TabsContent value="code">
          <div className="mt-2 w-full overflow-hidden rounded-md border border-neutral-600r">
             {/* Wrap CodeBlock for consistent styling if needed */}
             {/* Assuming CodeBlock handles its internal padding/styling */}
            <CodeBlock
              code={demoCode}
              language="tsx"
              // Adjust preview lines logic if needed
              previewLines={demoCode.split('\n').length > 15 ? 8 : 0}
              className="max-h-[500px] overflow-auto" // Add max-height and scroll if code can be long
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Installation Section */}
      {installation && installation.length > 0 && (
        <section className="space-y-8 pt-8"> {/* Added top padding */}
          <h2 className="scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Installation
          </h2>
          <div className="space-y-6"> {/* Increased spacing between steps */}
            {installation.map((step, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xl font-medium tracking-tight"> {/* Slightly larger step title */}
                  {idx + 1}. {step.title}
                </h3>
                <div className="overflow-hidden rounded-md border border-border"> {/* Wrap CodeBlock */}
                  <CodeBlock
                    code={step.code}
                    language={step.code.trim().startsWith('npm') || step.code.trim().startsWith('yarn') || step.code.trim().startsWith('pnpm') ? 'shell' : 'tsx'}
                    // Adjust preview lines logic if needed
                    previewLines={step.code.split('\n').length > 10 ? 5 : 0}
                    className="max-h-[300px] overflow-auto" // Add max-height and scroll
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}