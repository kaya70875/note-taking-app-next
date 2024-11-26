'use client';

import { useState } from 'react';
import useFetch from '@hooks/useFetch';
import { TagsResponse } from '../types/notes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import ChevronRight from './svgIcons/ChevronRight';
import LogoSvg from './svgIcons/LogoSvg';

export default function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();

    // Get all tags from database and filter theme only one category.
    const { data, loading, error } = useFetch<TagsResponse>('/api/getAllTags');
    const [activeNavTag , setActiveNavTag] = useState('');

    if (error) return <div>{error}</div>

    const tags = data?.data;

    const sidebarItems = [
        {
            name: 'All Notes',
            route : '/notes',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.496 8.025a.75.75 0 0 1 .75.75v8.675a2.314 2.314 0 0 0 2.314 2.314h8.88a2.314 2.314 0 0 0 2.313-2.314V8.775a.75.75 0 0 1 1.5 0v8.675a3.814 3.814 0 0 1-3.814 3.814H7.56a3.814 3.814 0 0 1-3.814-3.814V8.775a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="M10.06 3.41a3.127 3.127 0 0 1 3.88 0l7.525 5.958a.75.75 0 1 1-.93 1.176l-7.526-5.957a1.628 1.628 0 0 0-2.018 0l-7.525 5.957a.75.75 0 1 1-.931-1.176L10.06 3.41Z" clipRule="evenodd" /><path fill="currentColor" fillRule="evenodd" d="M17.668 4.193a.75.75 0 0 1 .75.75v2.354a.75.75 0 0 1-1.5 0V4.943a.75.75 0 0 1 .75-.75ZM11.974 13.688h.055c.377 0 .702 0 .97.02.283.022.565.071.838.203a2.25 2.25 0 0 1 1.05 1.05c.131.272.18.554.202.837.02.268.02.593.02.97v3.746a.75.75 0 0 1-1.5 0v-3.718c0-.412 0-.678-.015-.881-.016-.195-.041-.268-.059-.303a.75.75 0 0 0-.35-.35c-.035-.017-.108-.043-.302-.058a12.747 12.747 0 0 0-.881-.017c-.412 0-.679.001-.881.017-.195.015-.268.04-.303.058a.75.75 0 0 0-.35.35c-.017.035-.043.108-.058.303-.016.203-.016.469-.016.88v3.72a.75.75 0 0 1-1.5 0v-3.747c0-.377 0-.702.02-.97.022-.283.071-.565.203-.838a2.25 2.25 0 0 1 1.05-1.05c.273-.131.554-.18.837-.202.268-.02.593-.02.97-.02Z" clipRule="evenodd" /></svg>),
        },
        {
            name: 'Archived Notes',
            route : '/archived',
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059" /></svg>),
        }
    ]

    const activeItem = sidebarItems.find(item => pathName.startsWith(item.route))?.name 
        || tags?.find(tag => pathName.includes(tag)) 
        || 'All Notes';

    const handleSidebarItemClick = (itemName: string) => { // Open and close the archive section
        setActiveNavTag(itemName);
        if (itemName === 'Archived Notes') {
            router.push('/archived');
        }
        else {
            router.push('/notes');
        }
    }

    const handleTagClick = (tag: string) => {
        setActiveNavTag(tag);
        router.push(`/notes?tag=${tag}`);
    }

    return (
        <div className='flex flex-col p-4 gap-12 w-1/4 max-w-80 border-r border-neutral-300 dark:border-neutral-400 dark:bg-neutral-950'>
            <header className='logo'>
                <LogoSvg props={{color : 'text-neutral-950 dark:text-neutral-50'}} />   
            </header>
            <div className="flex flex-col gap-6">
                <section className="sidebar-top">
                    <ul className='flex flex-col gap-4'>
                        {sidebarItems.map(item => (
                            <li key={item.name} className={`flex items-center justify-between p-2 cursor-pointer ${!searchParams.has('tag') && activeItem === item.name ? 'activeItem dark:bg-neutral-700' : ''}`} onClick={() => handleSidebarItemClick(item.name)}>
                                <div className='flex items-center gap-4'>
                                    <div className={`${!searchParams.has('tag') && activeItem === item.name ? 'text-blue-500' : 'text-neutral-950 dark:text-neutral-50'}`}>{item.icon}</div>
                                    <p className={`${!searchParams.has('tag') && activeItem === item.name ? 'font-medium dark:text-neutral-50' : 'dark:text-neutral-50'}`}>{item.name}</p>
                                </div>
                                {!searchParams.has('tag') && activeItem === item.name && <ChevronRight props={{ color: 'text-neutral-950 dark:text-neutral-50' }} />}
                            </li>
                        ))}
                    </ul>
                </section>
                <div className="line dark:bg-neutral-400"></div>
                <section className="flex flex-col gap-4">
                    <p className='text-neutral-600 dark:text-neutral-500'>Tags</p>
                    <ul className='flex flex-col gap-4'>
                        {loading && (<div className='w-full h-full flex items-center justify-center'><CircularProgress color='secondary' /></div>)}
                        {tags && tags?.map(tag => (
                            <li key={tag} className={`flex items-center justify-between p-2 cursor-pointer ${activeNavTag === tag ? 'activeItem dark:bg-neutral-700' : ''}`} onClick={() => {handleTagClick(tag)}}>
                                <div className='flex items-center gap-4'>
                                    <div className={`${activeNavTag === tag ? 'text-blue-500' : 'text-neutral-950 dark:text-neutral-50'}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z" clipRule="evenodd" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z" clipRule="evenodd" /></svg></div>
                                    <p className={`${activeNavTag === tag ? 'font-medium dark:text-neutral-50' : 'dark:text-neutral-50'}`}>{tag}</p>
                                </div>
                                {activeNavTag === tag && <ChevronRight props={{ color: 'text-neutral-950 dark:text-neutral-50' }} />}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

        </div>
    )
}
