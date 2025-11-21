import DC from '../defaultConfig'
import { type JSX } from 'react'
import { createSmoothLine } from '../utils/createCurve'
import { GlowBezier } from './comp/GlowBezier'
import LabelCount from './comp/LabelCount'
import Node from './comp/Node'
import { Event, Value, subscriber } from '../utils/Subscriber'
import ic_automated from '../../assets/ic_automated.png'
import ic_manual from '../../assets/ic_manual.png'

function Incident({ props, Back }: {
  props: {
    automated: number,
    manual: number
  },
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

  const points = new Array(11).fill(0).map((_item, index) => {
    return {
      x: -CIT.inner.r + CIT.inner.r * 2 / 10 * index,
      y: 4 * index + Math.round(Math.random() * 30)
    }
  })
  const px = points.map((p) => p.x).sort((a, b) => a - b)
  const py = points.map((p) => p.y).sort((a, b) => a - b)
  console.log(px, py)
  // [
  //   { x: 0, y: 100 },
  //   { x: 100, y: 20 },
  //   { x: 200, y: 40 },
  //   { x: 300, y: 80 },
  // ]
  const originPath = points.map((point, index) => {
    return `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`
  }).join(' ')
  const smoothPath = 
    `M${-CIT.inner.r},${CIT.inner.r}` +
    createSmoothLine(points)?.map((point) => {
      return `L${point.x},${point.y}`
    }).join(' ') + 
    `L${CIT.inner.r},${CIT.inner.r} Z`

  const borderR = CI.resolveIncidents.r + 2
  const riRadius = CI.resolveIncidents.r + CI.resolveIncidents.radiationSpan + CI.resolveIncidents.radiationLength

  return <g
    className="incident-comp"
    opacity="0"
  >
    <defs>
      <radialGradient id="svg_pt_ic_rm_rg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="68%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="svg_pt_ic_oi_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#00D5F5" stopOpacity="1" />
        <stop offset="18%" stopColor="#00D5F5" stopOpacity="0" />
        <stop offset="82%" stopColor="#00D5F5" stopOpacity="0" />
        <stop offset="100%" stopColor="#00D5F5" stopOpacity="1" />
      </linearGradient>
      <mask id="svg_pt_ic_radiation_mask">
        <circle
          r={CIT.radiation.r}
          fill="url(#svg_pt_ic_rm_rg)"
        />
      </mask>
      <mask id="svg_pt_ic_ri_radiation_mask">
        <circle
          r={riRadius}
          fill="url(#svg_pt_ic_rm_rg)"
        />
      </mask>
      <mask id="svg_pt_ic_curve_mask">
        <circle
          r={CIT.inner.r - CIT.inner.width * 0.5}
          fill="#fff"
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
      <GlowBezier
        k={'sta'}
        start={{ x: CI.curve.start.x, y: CI.curve.start.span * -0.5 }}
        end={CI.curve.automated}
        extendS={40}
        extendE={70}
        bezier={[50, 0, 80, 0]}
        className="hover-thick-8"
        styleAttr={{
          outerLine: {
            fill: 'none',
            stroke: 'url(#svg_pt_lg_lc_sta)',
            strokeWidth: 8,
            strokeLinecap: 'round'
          },
          flowLine: {
            fill: 'none',
            stroke: 'none',
            strokeWidth: 2,
            strokeLinecap: 'round'
          }
        }}
        startAnimeBegin={`1s`}
        // anime={Event.LINE_ANIME}
      />
      <GlowBezier
        k={'stm'}
        start={{ x: CI.curve.start.x, y: CI.curve.start.span * 0.5 }}
        end={CI.curve.manual}
        extendS={40}
        extendE={70}
        bezier={[50, 0, 80, 0]}
        className="hover-thick-8"
        styleAttr={{
          outerLine: {
            fill: 'none',
            stroke: 'url(#svg_pt_lg_lc_stm)',
            strokeWidth: 8,
            strokeLinecap: 'round'
          },
          flowLine: {
            fill: 'none',
            stroke: 'none',
            strokeWidth: 2,
            strokeLinecap: 'round'
          }
        }}
        startAnimeBegin={`1s`}
        // anime={Event.LINE_ANIME}
      />
      <GlowBezier
        k={'atr'}
        start={CI.curve.automated}
        end={{ x: CI.curve.resolveIncidents.x, y: CI.curve.resolveIncidents.y - 1 }}
        extendS={0}
        extendE={0}
        bezier={[20, 0, 20, 0]}
        className="hover-thick-8"
        styleAttr={{
          outerLine: {
            fill: 'none',
            stroke: 'url(#svg_pt_lg_lc_atr)',
            strokeWidth: 8,
            strokeLinecap: 'round'
          },
          flowLine: {
            fill: 'none',
            stroke: 'none',
            strokeWidth: 2,
            strokeLinecap: 'round'
          }
        }}
        startAnimeBegin={`1s`}
        // anime={Event.LINE_ANIME}
      />
      <GlowBezier
        k={'ato'}
        start={{ x: CI.curve.automated.x, y: CI.curve.automated.y + 12 }}
        end={{ x: CI.curve.openIncidents.x, y: CI.curve.openIncidents.y - 6 }}
        extendS={80}
        extendE={280}
        bezier={[50, 0, 50, 0]}
        className="hover-thick-6"
        styleAttr={{
          outerLine: {
            fill: 'none',
            stroke: 'url(#svg_pt_lg_lc_ato_p5)',
            strokeWidth: 6,
            strokeLinecap: 'round'
          },
          flowLine: {
            fill: 'none',
            stroke: 'url(#svg_pt_lg_lc_ato)',
            strokeWidth: 2,
            strokeLinecap: 'round'
          }
        }}
        startAnimeBegin={`1s`}
        // anime={Event.LINE_ANIME}
      />
      <GlowBezier
        k={'mto'}
        start={{ x: CI.curve.manual.x, y: CI.curve.manual.y }}
        end={{ x: CI.curve.openIncidents.x, y: CI.curve.openIncidents.y + 6 }}
        extendS={240}
        extendE={100}
        bezier={[50, 0, 50, 0]}
        className="hover-thick-8"
        styleAttr={{
          outerLine: {
            fill: 'none',
            stroke: 'url(#svg_pt_lg_lc_mto)',
            strokeWidth: 8,
            strokeLinecap: 'round'
          },
          flowLine: {
            fill: 'none',
            stroke: 'none',
            strokeWidth: 2,
            strokeLinecap: 'round'
          }
        }}
        startAnimeBegin={`1s`}
        // anime={Event.LINE_ANIME}
      />
      <GlowBezier
        k={'mtr'}
        start={{ x: CI.curve.manual.x, y: CI.curve.manual.y - 12 }}
        end={{ x: CI.curve.resolveIncidents.x, y: CI.curve.resolveIncidents.y + 20 }}
        extendS={80}
        extendE={0}
        bezier={[50, 0, 0, 0]}
        className="hover-thick-6"
        styleAttr={{
          outerLine: {
            fill: 'none',
            stroke: 'url(#svg_pt_lg_lc_mtr_p5)',
            strokeWidth: 6,
            strokeLinecap: 'round'
          },
          flowLine: {
            fill: 'none',
            stroke: 'url(#svg_pt_lg_lc_mtr)',
            strokeWidth: 2,
            strokeLinecap: 'round'
          }
        }}
        startAnimeBegin={`1s`}
        // anime={Event.LINE_ANIME}
      />
      <g className="type-node" opacity="1">
        {/* <animate
          attributeName="opacity"
          from="0"
          to="1"
          dur={`${CR.anime.nodeDuration}s`}
          begin={`${1}s`}
          fill="freeze"
        /> */}
        <LabelCount 
          count={props.automated}
          labels={['Automated']}
          labelAttr={DC.right.label as React.SVGProps<SVGTextElement>}
          countAttr={DC.right.count as React.SVGProps<SVGTextElement>}
          transform={`translate(${CI.curve.automated.x}, ${CI.curve.automated.y - CI.curve.nodeLabelYSpan})`}
          clipPath="url(#svg_pt_rtext_cp)"
        />
        <Node
          keyword="automated"
          style="blue"
          icon={ic_automated}
          x={CI.curve.automated.x}
          y={CI.curve.automated.y}
        />
      </g>
      <g className="type-node" opacity="1">
        {/* <animate
          attributeName="opacity"
          from="0"
          to="1"
          dur={`${CR.anime.nodeDuration}s`}
          begin={`${1}s`}
          fill="freeze"
        /> */}
        <LabelCount 
          count={props.manual}
          labels={['Manual']}
          labelAttr={DC.right.label as React.SVGProps<SVGTextElement>}
          countAttr={DC.right.count as React.SVGProps<SVGTextElement>}
          transform={`translate(${CI.curve.manual.x}, ${CI.curve.manual.y + CI.curve.nodeLabelYSpan})`}
          clipPath="url(#svg_pt_rtext_cp)"
        />
        <Node
          keyword="manual"
          style="cyan"
          icon={ic_manual}
          x={CI.curve.manual.x}
          y={CI.curve.manual.y}
        />
      </g>
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
              strokeOpacity="0.4"
              transform={`rotate(${index / CIT.radiation.num * 360} 0, 0)`}
            />
          })
        }
        <path
          d={`M${totalStart[0]},${totalStart[1]} A${CIT.inner.r},${CIT.inner.r} 0 0 1 ${totalP1[0]},${totalP1[1]}`}
          strokeWidth={CIT.inner.width}
          stroke="#00DEFE"
          strokeLinecap="round"
          fill="none"
          style={{
            filter: `drop-shadow(0px 0px 20px #00DEFE)`
          }}
        />
        <path
          d={`M${totalP2[0]},${totalP2[1]} A${CIT.inner.r},${CIT.inner.r} 0 1 1 ${totalEnd[0]},${totalEnd[1]}`}
          strokeWidth={CIT.inner.width}
          stroke="#008FFF"
          strokeLinecap="round"
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
        <path
          d={smoothPath}
          fill="none"
          stroke="#008FFF"
          strokeWidth="2"
          mask="url(#svg_pt_ic_curve_mask)"
        />
      </g>
      <g className="resolve-incidents" transform={`translate(${CI.resolveIncidents.x}, ${CI.resolveIncidents.y})`} mask="url(#svg_pt_ic_ri_radiation_mask)">
        {
          new Array(CI.resolveIncidents.num).fill(1).map((_item, index) => {
            return <line
              key={`line_${index}`}
              x1={CI.resolveIncidents.r + CI.resolveIncidents.radiationSpan}
              y1="0"
              x2={CI.resolveIncidents.r + CI.resolveIncidents.radiationSpan + CI.resolveIncidents.radiationLength}
              y2="0"
              stroke={"#0089F5"}
              strokeWidth="1"
              strokeOpacity="0.4"
              transform={`rotate(${index / CI.resolveIncidents.num * 360} 0, 0)`}
            />
          })
        }
        <path
          d={`M0.5,${borderR} A${borderR},${borderR} 0 0 1 0.5,${-borderR} Z`}
          fill="url(#svg_pt_comp_node_lg_1)"
          // fill="#008FFF"
        />
        <path
          d={`M0,${-borderR} A${borderR},${borderR} 0 0 1 0,${borderR} Z`}
          fill="#008FFF"
        />
        <circle
          r={CI.resolveIncidents.r}
          cx={0}
          cy={0}
          fill="#000"
          stroke="none"
          style={{
            filter: `drop-shadow(0px 0px 20px rgba(0,143,255,0.5))`
          }}
        />
        <text
          {...CI.resolveIncidents.percent as React.SVGProps<SVGTextElement>}
        >
          <tspan>74</tspan>
          <tspan fontWeight="normal" fontSize="14" dx="4" dy="3">%</tspan>
        </text>
        <text
          {...CI.resolveIncidents.subtext as React.SVGProps<SVGTextElement>}
        >
          <tspan x="0">Resolved</tspan>
          <tspan x="0" dy="20">Incidents</tspan>
        </text>
        <text
          {...CI.resolveIncidents.number as React.SVGProps<SVGTextElement>}
        >258</text>
      </g>
      {/* mask="url(#svg_pt_ic_radiation_mask)" */}
      <g className="oepn-incidents" transform={`translate(${CI.openIncidents.x}, ${CI.openIncidents.y})`}>
        <circle
          r={CI.openIncidents.r}
          stroke="url(#svg_pt_ic_oi_lg)"
          strokeWidth="4"
          fill="#000"
        />
      </g>
    </g>
  </g>
}

export default Incident