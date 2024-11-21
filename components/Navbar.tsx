'use client';

import React from 'react'
import SvgIcon from './reusables/SvgIcon'
import { useRouter } from 'next/navigation';
import { useActiveSidebarTag } from '@context/ActiveSidebarTagContext';

interface NavbarProps {
    header?: 'All Notes' | 'Archived Notes' | 'Notes Tagged:' | 'Settings' | 'Showing Results For:';
    searchQuery?: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({ header = 'All Notes', setSearchQuery, searchQuery}: NavbarProps) {
    const router = useRouter();
    const {activeSidebarTag} = useActiveSidebarTag();

    const navigateToSettings = () => {
        router.push('/settings');
    }

    return (
        <div className='w-full flex items-center justify-between p-8 border-b border-neutral-300 dark:border-neutral-700'>
            <header className='font-bold text-2xl flex gap-2'>
                <h1 className='text-neutral-950 dark:text-neutral-50 font-bold'>{header}</h1>
                <p className='text-neutral-950 dark:text-neutral-50'>{header === 'Notes Tagged:' && activeSidebarTag && activeSidebarTag}</p>
                <p>{header === 'Showing Results For:' ? searchQuery : ''}</p>
            </header>
            <div className='flex items-center gap-8 w-2/6'>
                <div className='relative w-full border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden'>
                    <div className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer'>
                        <SvgIcon path='search' />
                    </div>
                    <input type="text" placeholder='Search by title, content, or tags...' className='w-full p-3 pl-12' onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className='cursor-pointer' onClick={() => navigateToSettings()}>
                    <SvgIcon path='settings' />
                </div>
            </div>
        </div>
    )
}
