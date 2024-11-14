import React from 'react'
import SvgIcon from './reusables/SvgIcon'

interface NavbarProps {
    header? : 'All Notes' | 'Archived Notes' | 'Notes Tagged:';
}

export default function Navbar({header = 'All Notes'} : NavbarProps) {
    return (
        <div className='w-full flex items-center justify-between p-8 border-b border-neutral-300'>
            <header className='font-bold text-2xl'>
                <h1 className='text-neutral-950'>{header}</h1>
            </header>
            <div className='flex items-center gap-8 w-2/6'>
                <div className='relative w-full border border-neutral-300 rounded-lg overflow-hidden'>
                    <div className='absolute top-1/2 -translate-y-1/2 left-2'>
                        <SvgIcon path='search' />
                    </div>
                    <input type="text" placeholder='Search by title, content, or tags...' className='w-full p-3 pl-12' />
                </div>
                <SvgIcon path='settings' />
            </div>
        </div>
    )
}
