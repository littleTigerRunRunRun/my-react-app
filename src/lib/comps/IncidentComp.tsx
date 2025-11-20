import DC from '../defaultConfig'
import { type JSX } from 'react'
import { createSmoothLine } from '../utils/createCurve'

function Incident({ props, Back }: {
  props: {},
  Back: (props:{text:string}) => JSX.Element
}) {
  const CI = DC.incident
  const CIT = CI.total

  const totalRate = 0.22
  const interval = CIT.inner.interval * Math.PI * 2
  const totalStart = [
    CIT.inner.r * Math.cos(interval * 0.5),
    CIT.inner.r * Math.sin(interval * 0.5)
  ]
  const P1angle = (1 - CIT.inner.interval * 2) * Math.PI * 2 * totalRate + interval * 0.5
  const totalP1 = [
    CIT.inner.r * Math.cos(P1angle),
    CIT.inner.r * Math.sin(P1angle)
  ]
  const P2angle = P1angle + interval
  const totalP2 = [
    CIT.inner.r * Math.cos(P2angle),
    CIT.inner.r * Math.sin(P2angle)
  ]
  const totalEnd = [totalStart[0], -totalStart[1]]

  console.log(createSmoothLine([
    { x: 0, y: 100 },
    { x: 100, y: 20 },
    { x: 200, y: 40 },
    { x: 300, y: 80 },
  ]))

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
          r={CIT.radiation.r}
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
      <g className="total-incident" transform={`translate(${CIT.radiation.r}, 0)`} mask="url(#svg_pt_ic_radiation_mask)">
        {
          new Array(CIT.radiation.num).fill(1).map((_item, index) => {
            return <line
              key={`line_${index}`}
              x1={CIT.radiation.r - CIT.radiation.rLength}
              y1="0"
              x2={CIT.radiation.r}
              y2="0"
              stroke={"#0089F5"}
              strokeWidth="1"
              strokeOpacity="0.5"
              transform={`rotate(${index / CIT.radiation.num * 360} 0, 0)`}
            />
          })
        }
        <path
          d={`M${totalStart[0]},${totalStart[1]} A${CIT.inner.r},${CIT.inner.r} 0 0 1 ${totalP1[0]},${totalP1[1]}`}
          strokeWidth={CIT.inner.width}
          stroke="#00DEFE"
          fill="none"
          style={{
            filter: `drop-shadow(0px 0px 20px #00DEFE)`
          }}
        />
        <path
          d={`M${totalP2[0]},${totalP2[1]} A${CIT.inner.r},${CIT.inner.r} 0 1 1 ${totalEnd[0]},${totalEnd[1]}`}
          strokeWidth={CIT.inner.width}
          stroke="#008FFF "
          fill="none"
          style={{
            filter: `drop-shadow(0px 0px 20px #008FFF)`
          }}
        />
        <text
          {...CIT.mainText as React.SVGProps<SVGTextElement>}
        >350</text>
        <text
          {...CIT.subText as React.SVGProps<SVGTextElement>}
        >Total Incidents</text>
      </g>
        {/* <path
          d={`${createSmoothLine([
            { x: 0, y: 100 },
            { x: 100, y: 20 },
            { x: 200, y: 40 },
            { x: 300, y: 80 },
          ], 0)}`}
          fill="none"
          stroke="#fff"
          strokeWidth="6"
        /> */}
    </g>
  </g>
}

export default Incident