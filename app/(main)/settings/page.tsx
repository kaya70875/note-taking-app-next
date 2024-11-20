'use client';

import Navbar from '@components/Navbar'
import SvgIcon from '@components/reusables/SvgIcon';
import Settings from '@components/Settings';
import React, { useState } from 'react'

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeItem, setActiveItem] = useState<'Color Theme' | 'Font Theme' | 'Change Password' | 'Logout'>('Color Theme');

    const settingsItems = [
        {
            name: 'Color Theme',
            svg: (<SvgIcon path='sun' />)
        },
        {
            name: 'Font Theme',
            svg: (<SvgIcon path='font' />)
        },
        {
            name: 'Change Password',
            svg: (<SvgIcon path='lock' />)
        },
        {
            name: 'Logout',
            svg: (<SvgIcon path='logout' />)
        }
    ] as const;

    return (
        <div className='w-full h-full'>
            <Navbar header='Settings' setSearchQuery={setSearchQuery} />
            <div className='flex w-full h-full'>
                <section className="settings-section flex flex-col p-6 gap-8 w-4/12 border-r border-neutral-300 h-full">
                    {settingsItems.map(settings => (
                        <button key={settings.name} className={`flex items-center justify-between p-2 rounded-lg w-3/4 ${activeItem === settings.name ? 'bg-neutral-200' : ''}`} onClick={() => setActiveItem(settings.name)}>
                            <div className='flex items-center gap-2'>
                                <div className="icon">{settings.svg}</div>
                                <p>{settings.name}</p>
                            </div>
                            {settings.name === activeItem && <SvgIcon path='chevron-right' />}
                        </button>
                    ))}
                </section>

                <Settings settingType={activeItem} />
            </div>
        </div>
    )
}