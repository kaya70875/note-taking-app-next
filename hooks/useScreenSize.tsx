'use client';

import { useEffect, useState } from "react"

const useScreenSize = () => {

    const [isTablet, setIsTablet] = useState(false);

    const checkForSize = () => {
        useEffect(() => {
            const checkIsTablet = () => {
                setIsTablet(window.matchMedia('(max-width: 1024px)').matches);
            }

            checkIsTablet();

            window.addEventListener('resize', checkIsTablet);

            return () => window.removeEventListener('resize', checkIsTablet);
        }, [])
    }

    checkForSize();

    return { isTablet }
}

export default useScreenSize;