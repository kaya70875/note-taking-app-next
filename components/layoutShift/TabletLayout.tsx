import AllNotes from '@components/AllNotes'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AllTags from './AllTags';
import useNavHeader from '@hooks/useNavHeader';
import Back from './Back';
import SvgIcon from '@components/reusables/SvgIcon';

export default function TabletLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { navHeader } = useNavHeader();

  const currentTag = searchParams.get('tag');
  const activeNoteId = params.id;

  const hideNavHeader = pathName === '/create' || pathName === `/notes/${activeNoteId}`; // Hide nav header when on create or note page.

  const [searchQuery, setSearchQuery] = useState(''); // We use local state to store the search query instead of query params FOR FILTERING!...

  useEffect(() => { // Reset search query when search params is removed.
    if (!searchParams.has('search')) {
      setSearchQuery('');
    }
  }, [searchParams])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    // Update the URL with the new search query
    const newUrl = new URLSearchParams(searchParams.toString());

    if (newQuery) {
      newUrl.set('search', newQuery);
    }

    router.replace(`/notes?${newUrl.toString()}`); //Update URL without reloading.

  }

  return (
    <div className='bg-neutral-100 dark:bg-neutral-950 w-full h-full overflow-hidden p-4 xs:p-3 xxs:p-2 rounded-tr-lg rounded-tl-lg flex flex-col gap-2'>
      {pathName === '/notes' && currentTag && (
        <Back />
      )}
      {!hideNavHeader && <div className='text-xl font-bold py-2'>{navHeader}</div>}
      {searchParams.has('search') && (
        <div className='relative w-full border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden'>
          <div className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer'>
            <SvgIcon path='search' />
          </div>
          <input type="text" placeholder='Search by title, content, or tags...' className='w-full p-3 pl-12 outline-none' onChange={(e) => {
            handleSearchChange(e);
          }} />
        </div>
      )}

      {pathName === '/notes' && !searchParams.has('tag') ? <AllNotes searchQuery={searchQuery} /> : children}
      {searchParams.has('tag') && !currentTag && <AllTags />}
      {pathName === '/notes' && currentTag && <AllNotes searchQuery={searchQuery} />}
    </div>
  )
}
