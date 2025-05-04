'use client';

import { useParams } from 'next/navigation';
import { Registry } from '@/registry';
import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { CodeBlock } from '@/components/code-block';

export default function DemoPage() {
  const params = useParams();
  const id = params?.component; 

  const entry = Registry.find((d) => d.id === id);
  if (!entry) {
    return <div className="p-6">Component not found</div>;
  }

  const { title, description, Component, demoCode, installation } = entry;
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <header className="space-y-1">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg text-neutral-400">{description}</p>
      </header>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="border border-neutral-600 p-8 rounded-lg flex justify-center">
            <Component />
          </div>
        </TabsContent>

        <TabsContent value="code">
          <CodeBlock
            code={demoCode}
            language="tsx"
            previewLines={demoCode.split('\n').length > 10 ? 5 : 0}
          />
        </TabsContent>
      </Tabs>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        {installation.map((step, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="font-medium">
              {idx + 1}. {step.title}
            </h3>
            <CodeBlock
              code={step.code}
              language={step.code.trim().startsWith('npm') ? 'shell' : 'tsx'}
              previewLines={step.code.split('\n').length > 10 ? 5 : 0}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
