import AllNotes from '@components/AllNotes';
import useScreenSize from '@hooks/useScreenSize';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

export default function NotChoosed() {
    const { isTablet } = useScreenSize();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    return (
        <div className={`content-section w-full flex flex-1 flex-col gap-4 p-4 xs:p-1 lg:p-0 border-r lg:border-none border-neutral-300 dark:border-neutral-700 ${isTablet && searchParams.has('tag') ? 'hidden' : 'block'}`}>
            {!isTablet ? (
                <div className="flex flex-col items-center justify-center gap-4 pt-12">
                    <h2 className="text-2xl text-neutral-950 dark:text-neutral-300">Notes are shown here.</h2>
                    <p className='dark:text-neutral-300'>Choose a note to get started!</p>
                </div>
            ) : (
                pathName === '/archived' && <AllNotes searchQuery='' />
            )}
        </div>
    )
}
