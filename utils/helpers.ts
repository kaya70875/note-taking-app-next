export default function convertDate(dateString : Date) {
    const date = new Date(dateString);

    const fullDate = date.toLocaleDateString('en-US' , {year: "numeric", month: "long", day: "numeric" });

    return fullDate;
}