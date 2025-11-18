import DC from '../defaultConfig'
import { type JSX } from 'react'

function Incident({ props, Back }: {
  props: {},
  Back: (props:{text:string}) => JSX.Element
}) {
  return <g
    className="left-right-comp"
    opacity="0"
  >
    <defs></defs>
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
  </g>
}

export default Incident