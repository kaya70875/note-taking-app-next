import { Inter } from 'next/font/google';
import '../globals.css';

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
                <main className="app flex w-full min-h-screen items-center justify-center bg-neutral-200">
                    <article className="w-5/12 p-2 bg-neutral-50 rounded-lg max-w-2xl">
                        {children}
                    </article>
                </main>
            </body>
        </html>
    );
}