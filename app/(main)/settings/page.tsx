'use client';

import useScreenSize from '@hooks/useScreenSize'
import React from 'react'

export default function Page() {
    const { isTablet } = useScreenSize();

    return (
        <>
            {!isTablet && (
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <h2>Settings</h2>
                    <p>Set your preferences to customize your experience.</p>
                </div>
            )}
        </>
    );
}
