import DC from '../defaultConfig'
import { type JSX } from 'react'

function Incident({ props, Back }: {
  props: {},
  Back: (props:{text:string}) => JSX.Element
}) {
  const CI = DC.incident
  // const radiations = 

  return <g
    className="incident-comp"
    opacity="0"
  >
    <defs>
      <radialGradient id="svg_pt_ic_rm_rg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="68%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id="svg_pt_ic_radiation_mask">
        <circle
          r={210}
          fill="url(#svg_pt_ic_rm_rg)"
        />
      </mask>
    </defs>
    <animate
      attributeName="opacity"
      from="0"
      to="1"
      // dur={`${CLR.anime.fadeInDuration}s`}
      // begin={`${svgTime + CLR.anime.fadeInDelay}s`}
      dur={`${1}s`}
      begin={`${1}s`}
      repeatCount="1"
      fill="freeze"
    />
    <Back text="Incident" />
    <g className="incident-main" transform={`scale(${DC.global.size.width / CI.size.width}) translate(${CI.size.width * -0.5}, 0)`}>
      <g className="total-incident" transform={`translate(210, 0)`} mask="url(#svg_pt_ic_radiation_mask)">
        {
          new Array(200).fill(1).map((_item, index) => {
            return <line
              key={`line_${index}`}
              x1={134}
              y1="0"
              x2={210}
              y2="0"
              stroke={"#0089F5"}
              strokeWidth="1"
              strokeOpacity="0.5"
              transform={`rotate(${index / 200 * 360} 0, 0)`}
            />
          })
        }
      </g>
    </g>
  </g>
}

export default Incident