import AllNotes from '@components/AllNotes'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import AllTags from './AllTags';
import useNavHeader from '@hooks/useNavHeader';
import Back from './Back';

export default function TabletLayout({children} : {children: React.ReactNode}) {
    const pathName = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();

    const {navHeader} = useNavHeader();

    const currentTag = searchParams.get('tag');
    const activeNoteId = params.id;

    const hideNavHeader = pathName === '/create' || pathName === `/notes/${activeNoteId}`;

  return (
    <div className='bg-neutral-100 dark:bg-neutral-950 w-full h-full p-4 rounded-tr-lg rounded-tl-lg'>
        {pathName === '/notes' && currentTag && (
          <Back />
        )}
        {!hideNavHeader && <div className='text-xl font-bold py-2'>{navHeader}</div>}
        {pathName === '/notes' && !searchParams.has('tag') ? <AllNotes searchQuery='' /> : children}
        {searchParams.has('tag') && !currentTag && <AllTags />}
        {pathName === '/notes' && currentTag && <AllNotes searchQuery={''} />}
    </div>
  )
}
