import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@components/Sidebar";
import { ActiveSidebarTagContextProvider } from "@context/ActiveSidebarTagContext";
import { ToastProvider } from "@context/ToastContext";
import SessionProvider from "../../providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { Provider } from "@providers/ThemeProvider";

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
        <SessionProvider session={session}>
          <ToastProvider>
            <ActiveSidebarTagContextProvider>
              <Provider>
                <main className='app dark:bg-neutral-950'>
                  <Sidebar />
                  {children}
                </main>
              </Provider>
            </ActiveSidebarTagContextProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
