import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import Node from './comp/Node'
import { GlowBezier } from './comp/GlowBezier'
import ic_automated from '../../assets/ic_automated.png'
import ic_resolved from '../../assets/ic_resolved.png'
import ic_manual from '../../assets/ic_manual.png'
import ic_open from '../../assets/ic_open.png'
import { Event, Value, subscriber } from '../utils/Subscriber'
import React, { useEffect } from 'react'

const RightComp = React.memo(function RightComp({ props }:{ props: {
  automated: number,
  resolvedIncidents: number,
  manual: number,
  openIncidents: number
} }) {
  const CR = DC.right
  const svgTime = subscriber.get(Value.MAIN_RIGHT_ANIME) ? -10000 : (Date.now() - (subscriber.get(Value.SVG_START_TIME) as number)) / 1000
    
  useEffect(() => {
    subscriber.set(Value.MAIN_RIGHT_ANIME, true)
    requestAnimationFrame(() => {
      subscriber.broadcast(Event.UPDATE_LINE_TARGET, ['mr_sta', 'mr_stm'], 'right1')
      subscriber.broadcast(Event.UPDATE_LINE_TARGET, ['mr_atr', 'mr_ato', 'mr_mtr', 'mr_mto'], 'right2')
    })
    return () => {
      subscriber.set(Value.MAIN_RIGHT_ANIME, false)
    }
  }, [])

  return <g className='right-comp' transform={`translate(${DC.center.size.width * 0.5 + CR.position.x}, 0)`}>
    <defs>
      <clipPath
        id="svg_pt_rtext_cp"
        clipPathUnits="userSpaceOnUse"
        x="-100"
        y="-44"
        width="200"
        height="80"
      >
        <rect 
          x="-100"
          y="-44"
          width="200"
          height="80"
          fill="rgba(255,255,255,0.4)"
        />
      </clipPath>
    </defs>
    <GlowBezier
      k={'mr_sta'}
      start={{ x: 0, y: -6 }}
      end={CR.automatedPosition.icon}
      extendS={20}
      extendE={40}
      bezier={[20, 0, 20, 0]}
      className="hover-thick-8"
      styleAttr={{
        innerLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 3,
          strokeOpacity: 0.3
        },
        outerLine: {
          fill: 'none',
          stroke: 'url(#svg_pt_lg_lc_sta)',
          strokeWidth: 8,
          strokeLinecap: 'round'
        },
        flowLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 3,
          strokeLinecap: 'round'
        }
      }}
      startAnimeBegin={`${svgTime + CR.anime.lineBegin1}`}
      anime={Event.LINE_ANIME}
    />
    <GlowBezier
      k={'mr_stm'}
      start={{ x: 0, y: 6 }}
      end={CR.manualPosition.icon}
      extendS={20}
      extendE={40}
      bezier={[20, 0, 20, 0]}
      className="hover-thick-8"
      styleAttr={{
        innerLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 3,
          strokeOpacity: 0.3
        },
        outerLine: {
          fill: 'none',
          stroke: 'url(#svg_pt_lg_lc_stm)',
          strokeWidth: 8,
          strokeLinecap: 'round'
        },
        flowLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 3,
          strokeLinecap: 'round'
        }
      }}
      startAnimeBegin={`${svgTime + CR.anime.lineBegin1}`}
      anime={Event.LINE_ANIME}
    />
    <GlowBezier
      k={'mr_atr'}
      start={CR.automatedPosition.icon}
      end={{ x: CR.resolvedIncidentsPosition.icon.x, y: CR.resolvedIncidentsPosition.icon.y - 1}}
      extendS={0}
      extendE={0}
      bezier={[20, 0, 20, 0]}
      className="hover-thick-8"
      styleAttr={{
        innerLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 3,
          strokeOpacity: 0.4
        },
        outerLine: {
          fill: 'none',
          stroke: 'url(#svg_pt_lg_lc_atr)',
          strokeWidth: 8,
          strokeLinecap: 'round',
          strokeOpacity: 0.6
        },
        flowLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 3,
          strokeLinecap: 'round'
        }
      }}
      startAnimeBegin={`${svgTime + CR.anime.lineBegin2}s`}
      anime={Event.LINE_ANIME}
    />
    <GlowBezier
      k={'mr_mto'}
      start={CR.manualPosition.icon}
      end={{ x: CR.openIncidentsPosition.icon.x, y: CR.openIncidentsPosition.icon.y + 1}}
      extendS={0}
      extendE={0}
      bezier={[20, 0, 20, 0]}
      className="hover-thick-8"
      styleAttr={{
        innerLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 3,
          strokeOpacity: 0.4
        },
        outerLine: {
          fill: 'none',
          stroke: 'url(#svg_pt_lg_lc_mto)',
          strokeWidth: 8,
          strokeOpacity: 0.6,
          strokeLinecap: 'round'
        },
        flowLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 3,
          strokeLinecap: 'round'
        }
      }}
      startAnimeBegin={`${svgTime + CR.anime.lineBegin2}s`}
      anime={Event.LINE_ANIME}
    />
    <GlowBezier
      k={'mr_ato'}
      start={{ x: CR.automatedPosition.icon.x, y: CR.automatedPosition.icon.y + 12 }}
      end={{ x: CR.openIncidentsPosition.icon.x, y: CR.openIncidentsPosition.icon.y - 12 }}
      extendS={40}
      extendE={40}
      bezier={[10, 0, 10, 0]}
      className="hover-thick-6"
      styleAttr={{
        innerLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 2,
          strokeOpacity: 0.4
        },
        outerLine: {
          fill: 'none',
          stroke: 'url(#svg_pt_lg_lc_ato_p5)',
          strokeWidth: 6,
          strokeLinecap: 'round'
        },
        flowLine: {
          fill: 'none',
          stroke: "#84dcff",
          // stroke: 'url(#svg_pt_lg_lc_ato)',
          strokeWidth: 2,
          strokeLinecap: 'round'
        }
      }}
      startAnimeBegin={`${svgTime + CR.anime.lineBegin2}s`}
      anime={Event.LINE_ANIME}
    />
    <GlowBezier
      k={'mr_mtr'}
      start={{ x: CR.manualPosition.icon.x, y: CR.manualPosition.icon.y - 12 }}
      end={{ x: CR.resolvedIncidentsPosition.icon.x, y: CR.resolvedIncidentsPosition.icon.y + 12 }}
      extendS={40}
      extendE={40}
      bezier={[10, 0, 10, 0]}
      className="hover-thick-6"
      styleAttr={{
        innerLine: {
          fill: 'none',
          stroke: "#84dcff",
          strokeWidth: 2,
          strokeOpacity: 0.4
        },
        outerLine: {
          fill: 'none',
          stroke: 'url(#svg_pt_lg_lc_mtr_p5)',
          strokeWidth: 6,
          strokeLinecap: 'round'
        },
        flowLine: {
          fill: 'none',
          stroke: "#84dcff",
          // stroke: 'url(#svg_pt_lg_lc_mtr)',
          strokeWidth: 2,
          strokeLinecap: 'round'
        }
      }}
      startAnimeBegin={`${svgTime + CR.anime.lineBegin2}s`}
      anime={Event.LINE_ANIME}
    />
    <g className="type-node" opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur={`${CR.anime.nodeDuration}s`}
        begin={`${svgTime + CR.anime.nodeBegin1}s`}
        fill="freeze"
      />
      <LabelCount 
        count={props ? props.automated : undefined}
        labels={['Automated']}
        labelAttr={CR.label as React.SVGProps<SVGTextElement>}
        countAttr={CR.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CR.automatedPosition.text.x}, ${CR.automatedPosition.text.y})`}
        clipPath="url(#svg_pt_rtext_cp)"
      />
      <Node
        keyword="automated"
        style="blue"
        icon={ic_automated}
        x={CR.automatedPosition.icon.x}
        y={CR.automatedPosition.icon.y}
        onClick={() => subscriber.broadcast(Event.DIG, ['main', 'incident'])}
      />
    </g>
    <g className="type-node" opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur={`${CR.anime.nodeDuration}s`}
        begin={`${svgTime + CR.anime.nodeBegin2}s`}
        fill="freeze"
      />
      <LabelCount 
        count={props ? props.resolvedIncidents : undefined}
        labels={['Resolved Incidents']}
        labelAttr={CR.label as React.SVGProps<SVGTextElement>}
        countAttr={CR.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CR.resolvedIncidentsPosition.text.x}, ${CR.resolvedIncidentsPosition.text.y})`}
        clipPath="url(#svg_pt_rtext_cp)"
      />
      <Node
        keyword="resolved"
        style="blue"
        icon={ic_resolved}
        x={CR.resolvedIncidentsPosition.icon.x}
        y={CR.resolvedIncidentsPosition.icon.y}
        onClick={() => subscriber.broadcast(Event.DIG, ['main', 'incident'])}
      />
    </g>
    <g className="type-node" opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur={`${CR.anime.nodeDuration}s`}
        begin={`${svgTime + CR.anime.nodeBegin1}s`}
        fill="freeze"
      />
      <LabelCount 
        count={props ? props.manual : undefined}
        labels={['Manual']}
        labelAttr={CR.label as React.SVGProps<SVGTextElement>}
        countAttr={CR.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CR.manualPosition.text.x}, ${CR.manualPosition.text.y})`}
        clipPath="url(#svg_pt_rtext_cp)"
      />
      <Node
        keyword="manual"
        style="cyan"
        icon={ic_manual}
        x={CR.manualPosition.icon.x}
        y={CR.manualPosition.icon.y}
        onClick={() => subscriber.broadcast(Event.DIG, ['main', 'incident'])}
      />
    </g>
    <g className="type-node" opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur={`${CR.anime.nodeDuration}s`}
        begin={`${svgTime + CR.anime.nodeBegin2}s`}
        fill="freeze"
      />
      <LabelCount 
        count={props ? props.openIncidents : undefined}
        labels={['Open Incidents']}
        labelAttr={CR.label as React.SVGProps<SVGTextElement>}
        countAttr={CR.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CR.openIncidentsPosition.text.x}, ${CR.openIncidentsPosition.text.y})`}
        clipPath="url(#svg_pt_rtext_cp)"
      />
      <Node
        keyword="open"
        style="cyan"
        icon={ic_open}
        x={CR.openIncidentsPosition.icon.x}
        y={CR.openIncidentsPosition.icon.y}
        onClick={() => subscriber.broadcast(Event.DIG, ['main', 'incident'])}
      />
    </g>
  </g>
})

export default RightComp