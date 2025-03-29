"use client";

import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Welcome to Web3 App</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600">
            Connect your wallet to start exploring the Web3 world.
          </p>
        </div>

        {isConnected && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>
            <p className="text-gray-600">
              View and manage your digital assets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
