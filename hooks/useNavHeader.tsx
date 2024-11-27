import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useNavHeader = () => {

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [navHeader , setNavHeader] = useState<string | JSX.Element>('');

    const decideNavHeader = () => {
        useEffect(() => {
            if(pathName === '/notes' && !searchParams.has('tag') && !searchParams.has('search')) {
                setNavHeader('All Notes');
            }
    
            else if(searchParams.has('tag') && searchParams.get('tag')) {
                setNavHeader(
                    <div className="flex gap-2 items-center">
                        <h2 className="text-neutral-600 font-bold">Notes Tagged:</h2>
                        <h2 className="font-bold">{searchParams.get('tag')}</h2>
                    </div>
                );
            }

            else if(searchParams.has('search')) {
                setNavHeader('Search');
            }

            else if(searchParams.has('tag') && !searchParams.get('tag')) {
                setNavHeader('Tags');
            }
    
            else if(pathName.includes('archived')) {
                setNavHeader('Archived Notes');
            }
        }, [pathName , searchParams]);
    }

    decideNavHeader();

    return {navHeader};
}

export default useNavHeader;