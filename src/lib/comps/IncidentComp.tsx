import DC from '../defaultConfig'
import React, { type JSX } from 'react'
import { createSmoothLine } from '../utils/createCurve'
import { GlowBezier } from './comp/GlowBezier'
import LabelCount from './comp/LabelCount'
import Node from './comp/Node'
import { Value, subscriber } from '../utils/Subscriber'
import ic_automated from '../../assets/ic_automated.png'
import ic_manual from '../../assets/ic_manual.png'
import IncidentType from './IncidentTypeComp'

const Incident = React.memo(function Incident({ props, Back }: {
  props: {
    total: number,
    trend: Array<{ value: number, time: string }>
    automated: number,
    manual: number,
    resolvedIncidents: number,
    openIncidents: {
      low: number,
      middle: number,
      high: number,
      critical: number,
    },
    attackList: Array<{ num: number, name: string, type: Array<'low' | 'middle' | 'high' | 'critical' | 'normal'> }>
  },
  Back: (props:{text:string}) => JSX.Element
}) {
  const CI = DC.incident
  const CIT = CI.total
  const svgTime = (Date.now() - (subscriber.get(Value.SVG_START_TIME) as number)) / 1000

  const totalRate = (props.total - props.resolvedIncidents) / props.total
  const interval = CIT.inner.interval * Math.PI * 2
  const totalStart = [
    totalRate === 1 ? CIT.inner.r : CIT.inner.r * Math.cos(interval * 0.5),
    totalRate === 1 ? 0 : CIT.inner.r * Math.sin(interval * 0.5)
  ]
  const P1angle = (1 - CIT.inner.interval * 2) * Math.PI * 2 * totalRate + interval * 0.5
  const totalP1 = [
    totalRate === 1 ? totalStart[0] : CIT.inner.r * Math.cos(P1angle),
    totalRate === 1 ? -totalStart[1] : CIT.inner.r * Math.sin(P1angle)
  ]
  const P2angle = P1angle + interval
  const totalP2 = [
    totalRate === 0 ? totalStart[0] : CIT.inner.r * Math.cos(P2angle),
    totalRate === 0 ? totalStart[1] : CIT.inner.r * Math.sin(P2angle)
  ]
  const totalEnd = [
    totalStart[0],
    -totalStart[1]
  ]

  const trendSortArray = [...props.trend].sort((a, b) => a.value - b.value)
  const max = trendSortArray[trendSortArray.length - 1].value
  const min = trendSortArray[0].value
  const pointWidth = CIT.inner.r * 2 / (props.trend.length - 1)
  const points = props.trend.map(({ value, time }, index) => {
    return {
      x: -CIT.inner.r + pointWidth * index,
      y: 60 - (value - min) * (35 / (max - min)),
      time,
      value
    }
  })
  // const originPath = points.map((point, index) => {
  //   return `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`
  // }).join(' ')
  // console.log(points)
  const smoothPath = 
    `M${-CIT.inner.r},${CIT.inner.r}` +
    createSmoothLine(points)?.map((point) => {
      return `L${point.x},${point.y}`
    }).join(' ') + 
    `L${CIT.inner.r},${CIT.inner.r} Z`

  const borderR = CI.resolvedIncidents.r + 2
  const riRadius = CI.resolvedIncidents.r + CI.resolvedIncidents.radiationSpan + CI.resolvedIncidents.radiationLength

  const total = props.openIncidents.low + props.openIncidents.middle + props.openIncidents.high + props.openIncidents.critical
  const oiRadiationVisual = [
    props.openIncidents.low / total,
    (props.openIncidents.low + props.openIncidents.middle) / total,
    (props.openIncidents.low + props.openIncidents.middle + props.openIncidents.high) / total
  ]

  return <g
    className="incident-comp"
    opacity="0"
  >
    <defs>
      <radialGradient id="svg_pt_ic_rm_rg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="68%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="svg_pt_icoi_rm_rg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="74%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="svg_pt_ici_rm_rg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="81%" stopColor="#fff" stopOpacity="0" />
        <stop offset="100%" stopColor="#fff" stopOpacity="1" />
      </radialGradient>
      <linearGradient id="svg_pt_ic_oi_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#00D5F5" stopOpacity="1" />
        <stop offset="18%" stopColor="#00D5F5" stopOpacity="0" />
        <stop offset="82%" stopColor="#00D5F5" stopOpacity="0" />
        <stop offset="100%" stopColor="#00D5F5" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_ic_L_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#00D5F5" stopOpacity="1" />
        <stop offset="100%" stopColor="#1DB440" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_ic_M_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#00D5F5" stopOpacity="1" />
        <stop offset="100%" stopColor="#F7C034" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_ic_H_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#00D5F5" stopOpacity="1" />
        <stop offset="100%" stopColor="#F77E45" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_ic_C_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#00D5F5" stopOpacity="1" />
        <stop offset="100%" stopColor="#F54E4E" stopOpacity="1" />
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
      <mask id="svg_pt_ic_oi_radiation_mask">
        <circle
          r={CI.openIncidents.r + CI.openIncidents.radiationLength}
          fill="url(#svg_pt_icoi_rm_rg)"
        />
      </mask>
      <mask id="svg_pt_ic_oii_radiation_mask">
        <circle
          r={CI.openIncidents.innerR}
          fill="url(#svg_pt_ici_rm_rg)"
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
      dur={`${CI.anime.fadeInDuration}s`}
      begin={`${svgTime + CI.anime.fadeInDelay}s`}
      repeatCount="1"
      fill="freeze"
    />
    <Back text="Incident Overview" />
    <g className="incident-main" transform={`scale(${DC.global.size.width / CI.size.width}) translate(${CI.size.width * -0.5}, 0)`}>
      <GlowBezier
        k={'sta'}
        start={{ x: CI.curve.start.x, y: CI.curve.start.span * -0.5 }}
        end={CI.curve.automated}
        extendS={40}
        extendE={70}
        bezier={[20, 0, 20, 0]}
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
        bezier={[20, 0, 20, 0]}
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
        end={{ x: CI.curve.resolvedIncidents.x, y: CI.curve.resolvedIncidents.y - 1 }}
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
        extendE={300}
        bezier={[20, 0, 20, 0]}
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
        end={{ x: CI.curve.openIncidents.x, y: CI.curve.openIncidents.y + 12 }}
        extendS={200}
        extendE={170}
        bezier={[20, 0, 20, 0]}
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
        end={{ x: CI.curve.resolvedIncidents.x, y: CI.curve.resolvedIncidents.y + 20 }}
        extendS={80}
        extendE={0}
        bezier={[20, 0, 0, 0]}
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
          d={smoothPath}
          fill="#008FFF"
          fillOpacity="0.1"
          stroke="#008FFF"
          strokeWidth="2"
          mask="url(#svg_pt_ic_curve_mask)"
        />
        {
          points.map((point, index) => {
            return <g className="trend-hover-group" key={`point_${index}`}>
              <rect
                className="hover-area"
                x={point.x}
                y={0}
                width={pointWidth}
                height={CIT.inner.r}
                fill="#fff"
                fillOpacity={0}
                mask="url(#svg_pt_ic_curve_mask)"
              />
              <g className="hover-info">
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="2"
                  fill="#008FFF"
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="none"
                  stroke="#008FFF"
                />
                <rect
                  x={point.x - 0.5}
                  y={point.y - 24}
                  width={1}
                  height={20}
                  fill="#008FFF"
                />
                <rect
                  x={point.x - 68}
                  y={point.y - 74}
                  width={136}
                  height={50}
                  fill="#1D2129"
                />
                <text
                  fontSize={12}
                  fontFamily={'PingFang SC, Nunito'}
                  fill={'#C5C5C5'}
                  dominantBaseline={'middle'}
                  textAnchor={'middle'}
                  x={point.x}
                  y={point.y - 60}
                >
                  { point.time }
                </text>
                <text
                  fontSize={14}
                  fontFamily={'PingFang SC, Nunito'}
                  fill={'#ffffff'}
                  dominantBaseline={'middle'}
                  textAnchor={'middle'}
                  x={point.x}
                  y={point.y - 39}
                >
                  { point.value }
                </text>
              </g>
            </g>
          })
        }
        {
          totalRate === 1 ? <circle
            r={CIT.inner.r}
            strokeWidth={CIT.inner.width}
            stroke="#00DEFE"
            strokeLinecap="round"
            fill="none"
            style={{
              filter: `drop-shadow(0px 0px 8px #00DEFE)`
            }}
          /> : (totalRate === 0 ? '' : <path
            className="rate-border"
            d={`M${totalStart[0]},${totalStart[1]} A${CIT.inner.r},${CIT.inner.r} 0 ${P1angle > Math.PI ? 1 : 0} 1 ${totalP1[0]},${totalP1[1]}`}
            strokeWidth={CIT.inner.width}
            stroke="#00DEFE"
            strokeLinecap="round"
            fill="none"
            style={{
              filter: `drop-shadow(0px 0px 8px #00DEFE)`
            }}
          />)
          
        }
        {
          totalRate === 0 ? <circle
            r={CIT.inner.r}
            strokeWidth={CIT.inner.width}
            stroke="#008FFF"
            strokeLinecap="round"
            fill="none"
            style={{
              filter: `drop-shadow(0px 0px 8px #008FFF)`
            }}
          /> : (totalRate === 1 ? '' : <path
            className="rate-border"
            d={`M${totalP2[0]},${totalP2[1]} A${CIT.inner.r},${CIT.inner.r} 0 ${P2angle > Math.PI ? 0 : 1} 1 ${totalEnd[0]},${totalEnd[1]}`}
            strokeWidth={CIT.inner.width}
            stroke="#008FFF"
            strokeLinecap="round"
            fill="none"
            style={{
              filter: `drop-shadow(0px 0px 8px #008FFF)`
            }}
          />)
        }
        <text
          {...CIT.mainText as React.SVGProps<SVGTextElement>}
        >{ props.total }</text>
        <text
          className="hovable-text"
          {...CIT.subText as React.SVGProps<SVGTextElement>}
        >Total Incidents</text>
      </g>
      <g className="resolve-incidents" transform={`translate(${CI.resolvedIncidents.x}, ${CI.resolvedIncidents.y})`} mask="url(#svg_pt_ic_ri_radiation_mask)">
        {
          new Array(CI.resolvedIncidents.num).fill(1).map((_item, index) => {
            return <line
              key={`line_${index}`}
              x1={CI.resolvedIncidents.r + CI.resolvedIncidents.radiationSpan}
              y1="0"
              x2={CI.resolvedIncidents.r + CI.resolvedIncidents.radiationSpan + CI.resolvedIncidents.radiationLength}
              y2="0"
              stroke={"#0089F5"}
              strokeWidth="1"
              strokeOpacity="0.4"
              transform={`rotate(${index / CI.resolvedIncidents.num * 360} 0, 0)`}
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
          r={CI.resolvedIncidents.r}
          cx={0}
          cy={0}
          fill="#000"
          stroke="none"
          style={{
            filter: `drop-shadow(0px 0px 20px rgba(0,143,255,0.5))`
          }}
        />
        <text
          {...CI.resolvedIncidents.percent as React.SVGProps<SVGTextElement>}
        >
          <tspan>{ Math.round(props.resolvedIncidents / props.total * 100) }</tspan>
          <tspan fontWeight="normal" fontSize="14" dx="4" dy="3">%</tspan>
        </text>
        <text
          className="hovable-text"
          {...CI.resolvedIncidents.subtext as React.SVGProps<SVGTextElement>}
        >
          <tspan x="0">Resolved</tspan>
          <tspan x="0" dy="20">Incidents</tspan>
        </text>
        <text
          {...CI.resolvedIncidents.number as React.SVGProps<SVGTextElement>}
        >{ props.resolvedIncidents }</text>
      </g>
      <g className="oepn-incidents" transform={`translate(${CI.openIncidents.x}, ${CI.openIncidents.y})`} mask="url(#svg_pt_ic_oi_radiation_mask)">
        {
          new Array(CI.openIncidents.num).fill(1).map((_item, index) => {
            return <line
              key={`line_${index}`}
              x1={CI.openIncidents.r}
              y1="0"
              x2={CI.openIncidents.r + CI.openIncidents.radiationLength}
              y2="0"
              stroke={"#00D5F5"}
              strokeWidth="1"
              strokeOpacity="0.4"
              transform={`rotate(${index / CI.openIncidents.num * 360} 0, 0)`}
            />
          })
        }
        <circle
          r={CI.openIncidents.r}
          stroke="url(#svg_pt_ic_oi_lg)"
          strokeWidth="4"
          fill="#000"
        />
        <g mask="url(#svg_pt_ic_oii_radiation_mask)">
          {
            new Array(CI.openIncidents.innerNum).fill(1).map((_item, index) => {
              return <line
                key={`line_${index}`}
                x1={CI.openIncidents.innerR - CI.openIncidents.innerWidth}
                y1="0"
                x2={CI.openIncidents.innerR}
                y2="0"
                stroke={
                  (() => {
                    let d = 1 - index / CI.openIncidents.innerNum - 0.25
                    if(d < 0) d = 1 + d
                    if (d > oiRadiationVisual[2]) return '#F54E4E'
                    if (d > oiRadiationVisual[1]) return '#F77E45'
                    if (d > oiRadiationVisual[0]) return '#F7C034'
                    return '#1DB440'
                  })()
                }
                strokeWidth="1"
                strokeOpacity="0.8"
                transform={`rotate(${index / CI.openIncidents.innerNum * 360} 0, 0)`}
              />
            })
          }
        </g>
        <text
          {...CI.openIncidents.percent as React.SVGProps<SVGTextElement>}
        >
          <tspan>{ Math.round(total / props.total * 100) }</tspan>
          <tspan fontWeight="normal" fontSize="14" dx="4" dy="6">%</tspan>
        </text>
        <text
          className="hovable-text"
          {...CI.openIncidents.subtext as React.SVGProps<SVGTextElement>}
        >
          Open Incidents
        </text>
        <text
          {...CI.openIncidents.number as React.SVGProps<SVGTextElement>}
        >{ total } Incidents</text>
      </g>
      <IncidentType
        props={{
          openIncidents: props.openIncidents,
          attackList: props.attackList
        }}
      />
      {/* <g className="safe-level">
        {
          [
            { text: 'C', type: 'critical', color: '#F54E4E', number: props.openIncidents.critical },
            { text: 'H', type: 'high', color: '#F77E45', number: props.openIncidents.high },
            { text: 'M', type: 'middle', color: '#F7C034', number: props.openIncidents.middle },
            { text: 'L', type: 'low', color: '#1DB440', number: props.openIncidents.low },
          ].map(({ text, type, color, number }, index) => {
            return <g className="safe-level-item" key={`linel${index}`}>
              <path
                d={
                  getBezier({
                    start: { x: CI.details.startX, y: (index - 1.5) * CI.details.lineStartSpan },
                    end: { x: CI.details.startX + CI.details.lineLength, y: (index - 1.5) * CI.details.lineEndSpan },
                    extendS: 15,
                    extendE: 15,
                    bezier: [4, 0, 4, 0]
                  })
                }
                stroke={`url(#svg_pt_ic_${text}_lg)`}
                strokeWidth="1"
                fill="none"
              />
              <g
                className="safe-type"
                onMouseEnter={() => setHoveringSafe(type)}
                onMouseLeave={() => setHoveringSafe('')}
              >
                <circle
                  cx={CI.details.startX + CI.details.lineLength + CI.details.outerCR}
                  cy={(index - 1.5) * CI.details.lineEndSpan}
                  fill="none"
                  stroke={color}
                  strokeWidth={CI.details.outerWidth}
                  r={CI.details.outerCR}
                />
                <circle
                  cx={CI.details.startX + CI.details.lineLength + CI.details.outerCR}
                  cy={(index - 1.5) * CI.details.lineEndSpan}
                  fill={color}
                  r={CI.details.innerCR}
                />
                <text
                  {...CI.details.text as React.SVGProps<SVGTextElement>}
                  y={(index - 1.5) * CI.details.lineEndSpan + 1}
                >{text}</text>
                <text
                  className="type-num"
                  {...CI.details.number as React.SVGProps<SVGTextElement>}
                  y={(index - 1.5) * CI.details.lineEndSpan + 1}
                >{number}</text>
              </g>
            </g>
          })
        }
        <text
          {...CI.details.attackList as React.SVGProps<SVGTextElement>}
          x={CI.details.attackListX}
          y={(-1 - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight}
          fontSize="14"
          fill="#fff"
        >MITRE ATT&CK®</text>
        {
          props.attackList.map(({ type, num, name }, index) => {
            return <g key={`linel${index}`}>
              <text
                {...CI.details.attackList as React.SVGProps<SVGTextElement>}
                x={CI.details.attackListX}
                y={(index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight}
              >{ num }</text>
              <text
                {...CI.details.attackList as React.SVGProps<SVGTextElement>}
                x={CI.details.attackListNameX}
                y={(index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight}
              >{ name }</text>
              {
                customSort(type).map((t, tIndex) => {
                  // tIndex - (type.length - 1) * 0.5
                  if (t === 'critical') return <path
                    key={`linel_${index}_${tIndex}`}
                    d={
                      getBezier({
                        start: { x: CI.details.rlineStartX, y: -54 },
                        end: { x: CI.details.rlineStartX + CI.details.lineLength, y: (index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight + (tIndex - (type.length - 1) * 0.5) * CI.details.lineEndTypeSpan },
                        extendS: 12,
                        extendE: 12,
                        bezier: [7, 0, 7, 0]
                      })
                    }
                    stroke="#F54E4E"
                    strokeWidth="1"
                    fill="none"
                  />
                  if (t === 'high') return <path
                    key={`linel_${index}_${tIndex}`}
                    d={
                      getBezier({
                        start: { x: CI.details.rlineStartX, y: -18 },
                        end: { x: CI.details.rlineStartX + CI.details.lineLength, y: (index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight + (tIndex - (type.length - 1) * 0.5) * CI.details.lineEndTypeSpan },
                        extendS: 12,
                        extendE: 12,
                        bezier: [7, 0, 7, 0]
                      })
                    }
                    stroke="#F77E45"
                    strokeWidth="1"
                    fill="none"
                  />
                  if (t === 'middle') return <path
                    key={`linel_${index}_${tIndex}`}
                    d={
                      getBezier({
                        start: { x: CI.details.rlineStartX, y: 18 },
                        end: { x: CI.details.rlineStartX + CI.details.lineLength, y: (index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight + (tIndex - (type.length - 1) * 0.5) * CI.details.lineEndTypeSpan },
                        extendS: 12,
                        extendE: 12,
                        bezier: [7, 0, 7, 0]
                      })
                    }
                    stroke="#F7C034"
                    strokeWidth="1"
                    fill="none"
                  />
                  if (t === 'low') return <path
                    key={`linel_${index}_${tIndex}`}
                    d={
                      getBezier({
                        start: { x: CI.details.rlineStartX, y: 54 },
                        end: { x: CI.details.rlineStartX + CI.details.lineLength, y: (index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight + (tIndex - (type.length - 1) * 0.5) * CI.details.lineEndTypeSpan },
                        extendS: 12,
                        extendE: 12,
                        bezier: [7, 0, 7, 0]
                      })
                    }
                    stroke="#1DB440"
                    strokeWidth="1"
                    fill="none"
                  />
                })
              }
            </g>
          })
        }
      </g> */}
    </g>
  </g>
})

export default Incident