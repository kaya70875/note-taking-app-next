import React from 'react'

export default function page() {
    return (
        <div className='content-section w-full flex flex-1 flex-col gap-4 p-4 border-r border-neutral-300 dark:border-neutral-700'>
            <div className="flex flex-col items-center justify-center gap-4 pt-12">
                <h2 className="text-2xl text-neutral-950 dark:text-neutral-300">Notes are shown here.</h2>
                <p className='dark:text-neutral-300'>Choose a note to get started!</p>
            </div>
        </div>
    )
}
