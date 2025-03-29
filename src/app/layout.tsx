import "./globals.css";
import ClientLayout from "@/components/layouts/ClientLayout";

export const metadata = {
  title: "Supreme Web3 App",
  description:
    "Basic Web3 Framework with Next.js | Wagmi | Tanstack Query | shadcn | viem",
  author: "0xNunana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClientLayout children={children} />
      </body>
    </html>
  );
}
