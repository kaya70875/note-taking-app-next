import React from 'react'
import SuccessIcon from './svgIcons/SuccessIcon'
import { useRouter } from 'next/navigation'

export default function SuccessComponent({ message, title }: { message: string, title: string }) {

    const router = useRouter();

    return (
        <div className='flex flex-col items-center justify-center gap-8 p-12 xs:p-3 bg-neutral-100 rounded-lg'>
            <header className='success-logo'>
                <SuccessIcon props={{ className: 'w-24 h-16' }} />
            </header>

            <div className='flex flex-col gap-4 text-center'>
                <h1>{title}</h1>
                <p>{message}</p>
            </div>

            <div className="primary-btn cursor-pointer" onClick={() => router.push('/login')}>Go Back</div>
        </div>
    )
}
