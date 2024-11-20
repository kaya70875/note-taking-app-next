import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@components/Sidebar";
import { ArchiveProvider } from "@context/ArchiveContext";
import { ActiveSidebarTagContextProvider } from "@context/ActiveSidebarTagContext";
import { ToastProvider } from "@context/ToastContext";
import SessionProvider from "../../providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <SessionProvider session={session}>
          <ToastProvider>
            <ActiveSidebarTagContextProvider>
              <ArchiveProvider>
                <main className="app">
                  <Sidebar />
                  {children}
                </main>
              </ArchiveProvider>
            </ActiveSidebarTagContextProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
