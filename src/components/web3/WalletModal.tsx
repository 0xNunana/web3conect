"use client";

import { useConnect } from "wagmi";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, connectors, status, error } = useConnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle connection

  if (!mounted || !isOpen) return null;
  if (status === "pending") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">
            Connecting... <span className="ml-2 animate-spin">⚡</span>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Connect Wallet</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error.message}
          </div>
        )}

        <div
          className="space-y-3 flex
        flex-col"
        >
          {connectors.map((connector) => (
            <Button key={connector.uid} onClick={() => connect({ connector })}>
              <span>{connector.name}</span>
            </Button>
          ))}
        </div>

        <Button onClick={onClose} variant="outline" className="mt-4 w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
}
