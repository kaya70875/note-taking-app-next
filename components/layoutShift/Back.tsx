import ArrowLeft from '@components/svgIcons/ArrowLeft';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Back() {
    const router = useRouter();
    return (
        <div className='go-back flex gap-2 items-center cursor-pointer' onClick={() => router.back()}>
            <ArrowLeft props={{ color: 'text-neutral-50 dark:text-neutral-100' }} />
            <p className='text-neutral-600 dark:text-neutral-300'>Go Back</p>
        </div>
    )
}
