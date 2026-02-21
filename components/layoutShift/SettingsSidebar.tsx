import ChevronRight from '@components/svgIcons/ChevronRight';
import IconFont from '@components/svgIcons/IconFont';
import IconLock from '@components/svgIcons/IconLock';
import IconLogout from '@components/svgIcons/IconLogout';
import IconSun from '@components/svgIcons/IconSun';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function SettingsSidebar() {

    const pathName = usePathname();

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

    const activeItem = settingsItems.find(item => pathName.includes(`settings${item.route}`))?.name; // Find the active item based on the pathname

    return (
        <section className="settings-section flex flex-col p-6 xs:p-3 gap-8 w-4/12 xxl:w-5/12 xl:w-7/12 lg:w-full border-r lg:border-none border-neutral-300 dark:border-neutral-700 h-full">
            {settingsItems.map(settings => (
                <Link prefetch href={`${settings.name !== 'Logout' ? `/settings${settings.route}` : '/login'}`} key={settings.name} className={`flex items-center justify-between p-2 rounded-lg w-3/4 ${activeItem === settings.name ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`} >
                    <div className='flex items-center gap-2'>
                        <div className={`icon ${activeItem === settings.name ? 'text-blue-500' : ''}`}>{settings.svg}</div>
                        <p className='text-neutral-950 dark:text-neutral-100'>{settings.name}</p>
                    </div>
                    {settings.name === activeItem && <ChevronRight props={{ color: 'text-neutral-950 dark:text-neutral-100' }} />}
                </Link>
            ))}
            <div className="line"></div>
        </section>
    )
}
