'use client';

import { usePathname } from "@node_modules/next/navigation";

export function isArchiveOpen() : boolean {
    const pathName = usePathname();
    return pathName.includes('/archived');
}