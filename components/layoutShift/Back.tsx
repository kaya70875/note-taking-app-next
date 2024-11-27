import ArrowLeft from '@components/svgIcons/ArrowLeft';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Back() {
    const router = useRouter();
    return (
        <div>
            <div className='go-back flex gap-2 items-center' onClick={() => router.back()}>
                <ArrowLeft props={{color : 'text-neutral-100 dark:text-neutral-50'}} />
                <p className='text-neutral-950 dark:text-neutral-50'>Go Back</p>
            </div>
        </div>
    )
}
