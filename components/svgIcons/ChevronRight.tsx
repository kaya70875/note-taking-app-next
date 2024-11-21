import * as React from "react"

const ChevronRight = ({props} : {props: React.SVGProps<SVGSVGElement>}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className={props.className}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.47 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L12.94 12 9.47 8.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ChevronRight
