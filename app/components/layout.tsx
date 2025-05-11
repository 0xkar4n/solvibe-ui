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
          <main className="flex-1 ">
            {children}
          </main>
        </div>
      </div>
  }