import Sidebar from "@/components/sidebar"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export default function ComponentLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <div>

        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
          <div className="lg:w-20 lg:border-l lg:border-dashed lg:border-neutral-600"></div>
        </div>
      </div>
  }