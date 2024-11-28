'use client';

import BottomNavbar from "@components/layoutShift/BottomNavbar";
import Navbar from "@components/Navbar";
import useScreenSize from "@hooks/useScreenSize";
import LogoSvg from "@components/svgIcons/LogoSvg";
import SettingsSidebar from "@components/layoutShift/SettingsSidebar";
import { usePathname } from "next/navigation";
import Back from "@components/layoutShift/Back";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { isTablet } = useScreenSize();
    const pathName = usePathname();

    return (
        <div className="w-full h-full">
            {isTablet && (
                <div className="p-6 bg-neutral-200 dark:bg-neutral-400">
                    <LogoSvg props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />
                </div>
            )}
            <div className='w-full h-[89.7%] lg:flex flex-col-reverse rounded-lg'>
                {isTablet ? (<BottomNavbar />) : (<Navbar />)}
                {isTablet ? (
                    <div className='flex w-full h-full'>
                        {pathName === '/settings' ? <SettingsSidebar /> : ( // İf route is settings render sidebar only if not (settings/theme for ex.) render children content only.
                            <div className="w-full h-full p-10 lg:p-6 lg:flex flex-col gap-2">
                                {isTablet && <Back />}
                                {children}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex w-full h-full">
                        <SettingsSidebar />
                        <div className="w-full h-full p-10">
                            {children}
                        </div>
                    </div>
                )}

            </div>
        </div>

    );
}
