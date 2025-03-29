import dynamic from "next/dynamic";

export const ConnectButton2 = dynamic(() => import("../web3/ConnectButton"), {
  ssr: false,
});
