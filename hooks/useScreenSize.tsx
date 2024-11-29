'use client';

import { useEffect, useState } from "react";

const useScreenSize = () => {
    const [isTablet, setIsTablet] = useState<boolean | null>(null);

    useEffect(() => {
        const checkIsTablet = () => {
            setIsTablet(window.innerWidth <= 1024);
        };

        // Set initial state
        checkIsTablet();

        // Listen for resize events
        window.addEventListener('resize', checkIsTablet);

        return () => window.removeEventListener('resize', checkIsTablet);
    }, []);

    if(isTablet === null) {
        return {isTablet : null , isLoading : true}
    }

    return { isTablet , isLoading : false};
};

export default useScreenSize;
