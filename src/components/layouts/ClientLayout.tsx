"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/web3";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const queryClient = new QueryClient();
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
