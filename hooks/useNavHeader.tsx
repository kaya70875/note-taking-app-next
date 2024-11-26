import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useNavHeader = () => {

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [navHeader , setNavHeader] = useState('');

    const decideNavHeader = () => {
        useEffect(() => {
            if(pathName === '/notes' && !searchParams.has('tag')) {
                setNavHeader('All Notes');
            }
    
            else if(searchParams.has('tag') && searchParams.get('tag')) {
                setNavHeader('Notes Tagged:');
            }

            else if(searchParams.has('tag') && !searchParams.get('tag')) {
                setNavHeader('Tags');
            }

            else if(pathName.includes('trash')) {
                setNavHeader('Trash');
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