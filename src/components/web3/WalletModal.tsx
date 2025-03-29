"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useConnect } from "wagmi";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const walletIcons: Record<string, string> = {
  MetaMask: "/icons/MetaMask-icon-fox.svg",
  "Coinbase Wallet": "/icons/coinbase.svg",
  walletConnect: "/icons/walletconnect.svg",
  // Add more wallet icons as needed
};

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, connectors, error } = useConnect();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm mx-4 pointer-events-auto shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white">
                  Connect Wallet
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 rounded-xl text-sm"
                >
                  {error.message.includes("User rejected the request")
                    ? "Request Cancelled"
                    : error.message}
                </motion.div>
              )}

              <div className="space-y-3">
                {connectors.map((connector) => (
                  <motion.div
                    key={connector.uid}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => connect({ connector })}
                      className="w-full p-4 h-auto flex items-center justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 p-2 flex items-center justify-center">
                          {walletIcons[connector.name] ? (
                            <Image
                              src={walletIcons[connector.name]}
                              alt={connector.name}
                              width={24}
                              height={24}
                            />
                          ) : (
                            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full" />
                          )}
                        </div>
                        <div className="flex justify-between">
                          <div className="font-semibold">{connector.name}</div>
                        </div>
                      </div>
                      <div>Connect</div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                By connecting a wallet, you agree to our Terms of Service and
                Privacy Policy
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
