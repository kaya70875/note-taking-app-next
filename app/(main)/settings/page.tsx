'use client';

import Navbar from '@components/Navbar'
import SvgIcon from '@components/reusables/SvgIcon';
import Settings from '@components/Settings';
import React, { useState } from 'react'

export default function page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeItem, setActiveItem] = useState('Color Theme');

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
    ]

    return (
        <div className='w-full h-full'>
            <Navbar setSearchQuery={setSearchQuery} />
            <div className='flex w-full h-full'>
                <section className="settings-section flex flex-col p-6 gap-8 w-3/12 border-r border-neutral-300 h-full">
                    {settingsItems.map(settings => (
                        <button className={`flex items-center justify-between p-2 rounded-lg w-3/4 ${activeItem === settings.name ? 'bg-neutral-200' : ''}`} onClick={() => setActiveItem(settings.name)}>
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
