import * as React from "react"
const IconInfo = ({props} : {props?: React.SVGProps<SVGSVGElement>}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className={props?.className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm9.006 3.693v-4.3M12 8.355v-.063"
    />
  </svg>
)
export default IconInfo
