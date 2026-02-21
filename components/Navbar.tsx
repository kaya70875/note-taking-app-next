'use client';

import SvgIcon from './reusables/SvgIcon'
import useNavHeader from '@hooks/useNavHeader';
import Link from 'next/link';

interface NavbarProps {
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({ setSearchQuery }: NavbarProps) {
    const { navHeader } = useNavHeader();

    return (
        <div className='w-full flex items-center justify-between p-8 border-b border-neutral-300 dark:border-neutral-700'>
            <header className='font-bold text-2xl flex gap-2'>
                <h1 className='text-neutral-950 dark:text-neutral-50 font-bold'>{navHeader}</h1>
            </header>
            <div className='flex items-center gap-8 w-2/6'>
                <div className='relative w-full border border-neutral-300 hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-600 transition-all duration-150 rounded-lg overflow-hidden'>
                    <div className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer'>
                        <SvgIcon path='search' />
                    </div>
                    <input type="text" placeholder='Search by title, content, or tags...' className='w-full p-3 pl-12 outline-none bg-neutral-50 dark:bg-neutral-900' onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)} />
                </div>
                <Link href={'/settings'} className='cursor-pointer item-hover p-1' >
                    <SvgIcon path='settings' />
                </Link>
            </div>
        </div>
    )
}
