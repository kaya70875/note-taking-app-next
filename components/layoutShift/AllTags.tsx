import useFetch from '@hooks/useFetch';
import { TagsResponse } from '../../types/notes';
import React from 'react'
import TagSvg from '@components/svgIcons/TagSvg';
import Link from 'next/link';
import { LoadingState } from '@components/reusables/LoadingState';

export default function AllTags() {

    const { data, loading, error } = useFetch<TagsResponse>('/api/getAllTags');
    const tags = data?.data;

    if(error) return <p>Error fetching tags</p>;

    return (
        <div className='flex flex-col gap-4 mt-4 xs:mt-0 overflow-auto'>
            {loading && <LoadingState />}
            {tags?.map(tag => (
                <div className='flex flex-col gap-3' key={tag}>
                    <Link href={`/notes?tag=${tag}`} className='flex items-center gap-2'>
                        <TagSvg props={{ color: 'text-neutral-950 dark:text-neutral-100'}} strokeWidth={1.4} />
                        <p>{tag}</p>
                    </Link>

                    <div className="line hidden lg:block"></div>
                </div>

            ))}
        </div>
    )
}
