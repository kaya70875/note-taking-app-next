'use client';

import { Inter } from "next/font/google";
import BottomNavbar from "@components/layoutShift/BottomNavbar";
import Navbar from "@components/Navbar";
import ChevronRight from "@components/svgIcons/ChevronRight";
import useScreenSize from "@hooks/useScreenSize";
import { useState } from "react";
import IconSun from "@components/svgIcons/IconSun";
import IconFont from "@components/svgIcons/IconFont";
import IconLock from "@components/svgIcons/IconLock";
import IconLogout from "@components/svgIcons/IconLogout";
import { useRouter } from "next/navigation";
import { WrappedNextRouterError } from "next/dist/server/route-modules/app-route/module";


const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const settingsItems = [
        {
            name: 'Color Theme',
            route: '/theme',
            svg: (<IconSun props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />)
        },
        {
            name: 'Font Theme',
            route: '/font',
            svg: (<IconFont props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />)
        },
        {
            name: 'Change Password',
            route: '/reset',
            svg: (<IconLock props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />)
        },
        {
            name: 'Logout',
            route: '/login',
            svg: (<IconLogout props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />)
        }
    ] as const;

    const [activeItem, setActiveItem] = useState<'Color Theme' | 'Font Theme' | 'Change Password' | 'Logout'>('Color Theme');

    const { isTablet } = useScreenSize();
    const router = useRouter();

    return (
        <div className='w-full h-full lg:flex flex-col-reverse'>
            {isTablet ? (<BottomNavbar />) : (<Navbar />)}
            <div className='flex w-full h-full'>
                <section className="settings-section flex flex-col p-6 gap-8 w-4/12 border-r border-neutral-300 dark:border-neutral-700 h-full">
                    {settingsItems.map(settings => (
                        <button key={settings.name} className={`flex items-center justify-between p-2 rounded-lg w-3/4 ${activeItem === settings.name ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`} onClick={() => {
                            setActiveItem(settings.name);
                            router.push(`/settings${settings.route}`);
                        }}>
                            <div className='flex items-center gap-2'>
                                <div className={`icon ${activeItem === settings.name ? 'text-blue-500' : ''}`}>{settings.svg}</div>
                                <p className='text-neutral-950 dark:text-neutral-100'>{settings.name}</p>
                            </div>
                            {settings.name === activeItem && <ChevronRight props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />}
                        </button>
                    ))}
                </section>
                <div className="w-full h-full p-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
