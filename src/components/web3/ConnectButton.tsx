"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";
import { Button } from "../ui/button";
import WalletModal from "./WalletModal";

export default function ConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="hidden md:inline-block">
          {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
        </span>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          className="text-sm"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Connect Wallet
      </Button>
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
