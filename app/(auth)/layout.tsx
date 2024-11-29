import { Inter } from 'next/font/google';
import '../globals.css';
import { ToastProvider } from '@context/ToastContext';

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
                <ToastProvider>
                    <main className="app flex w-full min-h-screen items-center justify-center bg-neutral-200">
                        <article className="w-5/12 xl:w-6/12 lg:w-8/12 md:w-10/12 xs:w-full p-2 bg-neutral-50 rounded-lg max-w-2xl">
                            {children}
                        </article>
                    </main>
                </ToastProvider>

            </body>
        </html>
    );
}