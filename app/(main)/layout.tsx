import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@components/Sidebar";
import { ArchiveProvider } from "@context/ArchiveContext";
import { ActiveSidebarTagContextProvider } from "@context/ActiveSidebarTagContext";

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
        <ActiveSidebarTagContextProvider>
          <ArchiveProvider>
            <main className="app">
              <Sidebar />
              {children}
            </main>
          </ArchiveProvider>
        </ActiveSidebarTagContextProvider>


      </body>
    </html>
  );
}
