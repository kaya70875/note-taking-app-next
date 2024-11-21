'use client';

import Navbar from '@components/Navbar'
import SvgIcon from '@components/reusables/SvgIcon';
import Settings from '@components/Settings';
import ChevronRight from '@components/svgIcons/ChevronRight';
import IconFont from '@components/svgIcons/IconFont';
import IconLock from '@components/svgIcons/IconLock';
import IconLogout from '@components/svgIcons/IconLogout';
import IconSun from '@components/svgIcons/IconSun';
import React, { useState } from 'react'

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeItem, setActiveItem] = useState<'Color Theme' | 'Font Theme' | 'Change Password' | 'Logout'>('Color Theme');

    const settingsItems = [
        {
            name: 'Color Theme',
            svg: (<IconSun props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)
        },
        {
            name: 'Font Theme',
            svg: (<IconFont props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)
        },
        {
            name: 'Change Password',
            svg: (<IconLock props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)
        },
        {
            name: 'Logout',
            svg: (<IconLogout props={{color : 'text-neutral-950 dark:text-neutral-100'}} />)
        }
    ] as const;

    return (
        <div className='w-full h-full'>
            <Navbar header='Settings' setSearchQuery={setSearchQuery} />
            <div className='flex w-full h-full'>
                <section className="settings-section flex flex-col p-6 gap-8 w-4/12 border-r border-neutral-300 dark:border-neutral-700 h-full">
                    {settingsItems.map(settings => (
                        <button key={settings.name} className={`flex items-center justify-between p-2 rounded-lg w-3/4 ${activeItem === settings.name ? 'bg-neutral-200 dark:bg-neutral-700' : ''}`} onClick={() => setActiveItem(settings.name)}>
                            <div className='flex items-center gap-2'>
                                <div className={`icon ${activeItem === settings.name ? 'text-blue-500' : 'text-neutral-100'}`}>{settings.svg}</div>
                                <p className='text-neutral-950 dark:text-neutral-100'>{settings.name}</p>
                            </div>
                            {settings.name === activeItem && <ChevronRight props={{color : 'text-neutral-950 dark:text-neutral-100'}} />}
                        </button>
                    ))}
                </section>

                <Settings settingType={activeItem} />
            </div>
        </div>
    )
}