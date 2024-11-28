'use client';

import BottomNavbar from "@components/layoutShift/BottomNavbar";
import Navbar from "@components/Navbar";
import ChevronRight from "@components/svgIcons/ChevronRight";
import useScreenSize from "@hooks/useScreenSize";
import IconSun from "@components/svgIcons/IconSun";
import IconFont from "@components/svgIcons/IconFont";
import IconLock from "@components/svgIcons/IconLock";
import IconLogout from "@components/svgIcons/IconLogout";
import { usePathname, useRouter } from "next/navigation";
import LogoSvg from "@components/svgIcons/LogoSvg";

export default function RootLayout({
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

    const { isTablet } = useScreenSize();
    const router = useRouter();
    const pathName = usePathname();

    const activeItem = settingsItems.find(item => pathName.includes(`settings${item.route}`))?.name; // Find the active item based on the pathname

    return (
        <div className="w-full h-full">
            {isTablet && (
                <div className="p-6 bg-neutral-200 dark:bg-neutral-400">
                    <LogoSvg props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />
                </div>
            )}
            <div className='w-full h-full lg:flex flex-col-reverse rounded-lg'>
                {isTablet ? (<BottomNavbar />) : (<Navbar />)}
                <div className='flex w-full h-full'>
                    <section className="settings-section flex flex-col p-6 gap-8 w-4/12 xxl:w-5/12 xl:w-7/12 border-r border-neutral-300 dark:border-neutral-700 h-full">
                        {settingsItems.map(settings => (
                            <button key={settings.name} className={`flex items-center justify-between p-2 rounded-lg w-3/4 ${activeItem === settings.name ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`} onClick={() => {
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
        </div>

    );
}
