import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DotDocs",
  description: "Sua base de conhecimento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <main className="content-area">{children}</main>
        </div>
      </body>
    </html>
  );
}