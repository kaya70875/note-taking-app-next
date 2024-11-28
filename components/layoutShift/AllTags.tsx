import useFetch from '@hooks/useFetch';
import { TagsResponse } from '../../types/notes';
import React from 'react'
import TagSvg from '@components/svgIcons/TagSvg';
import Link from 'next/link';

export default function AllTags() {

    const { data, loading, error } = useFetch<TagsResponse>('/api/getAllTags');
    const tags = data?.data;

    return (
        <div className='flex flex-col gap-4 mt-4 overflow-auto'>
            {tags?.map(tag => (
                <Link href={`/notes?tag=${tag}`} key={tag} className='flex items-center gap-2'>
                    <TagSvg props={{color : 'text-neutral-950 dark:text-neutral-100'}} />
                    <p className='text-sm'>{tag}</p>
                </Link>
            ))}
        </div>
    )
}
