import Sidebar from "@/components/sidebar"

export default function ComponentLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
          <div className="lg:w-20 lg:border-l lg:border-dashed lg:border-neutral-600"></div>
        </div>
      </section>
  }