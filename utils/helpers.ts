import { usePathname, useSearchParams } from "next/navigation";

export default function convertDate(dateString : Date) {
    const date = new Date(dateString);

    const fullDate = date.toLocaleDateString('en-US' , {year: "numeric", month: "long", day: "numeric" });

    return fullDate;
}

export function getFullUrl() { // Gets full url from url section.
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
}