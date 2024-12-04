import { Inter, Noto_Serif, Source_Code_Pro } from "next/font/google";
import "../globals.css";
import Sidebar from "@components/Sidebar";
import { ToastProvider } from "@context/ToastContext";
import SessionProvider from "../../providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { Provider } from "@providers/ThemeProvider";
import { FontProvider } from "@context/FontContext";
import { DynamicFontWrapper } from "@context/DynamicFontWrapper";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const noto = Noto_Serif({ subsets: ['latin'], variable: '--font-noto' });
const mono = Source_Code_Pro({ subsets: ['latin'], variable: '--font-mono' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${noto.variable} ${mono.variable}`}
      >
        <SessionProvider session={session}>
          <FontProvider>
            <DynamicFontWrapper>
              <ToastProvider>
                <Provider>
                  <main className='app dark:bg-neutral-950'>
                    <Sidebar />
                    {children}
                  </main>
                </Provider>
              </ToastProvider>
            </DynamicFontWrapper>
          </FontProvider>
        </SessionProvider>
      </body>
    </html>
  );
}