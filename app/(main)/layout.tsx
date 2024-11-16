import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@components/Sidebar";
import { ArchiveProvider } from "@context/ArchiveContext";

export const metadata: Metadata = {
  title: "Note Taking App",
  description: "A simple note taking app",
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <ArchiveProvider>
          <main className="app">
            <Sidebar />
            {children}
          </main>
        </ArchiveProvider>

      </body>
    </html>
  );
}
