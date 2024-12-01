import * as React from "react"
const SuccessIcon = ({props} : {props: React.SVGProps<SVGSVGElement>}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 50 50"
    className={props.className}
    {...props}
  >
    <circle
      cx={25}
      cy={25}
      r={25}
      style={{
        fill: "#25ae88",
      }}
    />
    <path
      d="M38 15 22 33l-10-8"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
    />
  </svg>
)
export default SuccessIcon
