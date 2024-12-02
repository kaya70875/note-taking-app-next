import React from 'react'
import SuccessIcon from './svgIcons/SuccessIcon'
import Link from 'next/link';

export default function SuccessComponent({ message, title }: { message: string, title: string }) {

    return (
        <div className='flex flex-col items-center justify-center gap-8 p-12 xs:p-3 bg-neutral-100 rounded-lg'>
            <header className='success-logo'>
                <SuccessIcon props={{ className: 'w-24 h-16' }} />
            </header>

            <div className='flex flex-col gap-4 text-center'>
                <h1>{title}</h1>
                <p>{message}</p>
            </div>

            <Link href={'/login'} className="primary-btn cursor-pointer">Go Back</Link>
        </div>
    )
}
