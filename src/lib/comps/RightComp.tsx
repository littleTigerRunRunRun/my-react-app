import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import Node from './comp/Node'
import { GlowBezier } from './comp/GlowBezier'
import ic_automated from '../../assets/ic_automated.png'
import ic_resolved from '../../assets/ic_resolved.png'
import ic_manual from '../../assets/ic_manual.png'
import ic_open from '../../assets/ic_open.png'
import { Event } from '../utils/Subscriber'

function RightComp({ props }:{ props: {
  automated: number,
  resolvedIncidents: number,
  manual: number,
  openIncidents: number
} }) {
  const CR = DC.right

  return <g className='right-comp' transform={`translate(${DC.center.size.width * 0.5 + CR.position.x}, 0)`}>
    <defs>
      <linearGradient id="svg_pt_lg_lc_sta">
        <stop offset="0%" stopColor="#0167B6" stopOpacity="0" />
        <stop offset="100%" stopColor="#0167B6" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_stm">
        <stop offset="0%" stopColor="#019DB3" stopOpacity="0" />
        <stop offset="100%" stopColor="#019DB3" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_atr">
        <stop offset="0%" stopColor="#0167B6" stopOpacity="1" />
        <stop offset="100%" stopColor="#008FFF" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_mto">
        <stop offset="0%" stopColor="#019DB3" stopOpacity="1" />
        <stop offset="100%" stopColor="#00DEFE" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_ato_p5">
        <stop offset="0%" stopColor="#0167B6" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#00DEFE" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_ato">
        <stop offset="0%" stopColor="#0167B6" stopOpacity="1" />
        <stop offset="100%" stopColor="#00DEFE" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_mtr_p5">
        <stop offset="0%" stopColor="#019DB3" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#008FFF" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_mtr">
        <stop offset="0%" stopColor="#019DB3" stopOpacity="1" />
        <stop offset="100%" stopColor="#008FFF" stopOpacity="1" />
      </linearGradient>
    </defs>
    <GlowBezier
      k={'sta'}
      start={{ x: 0, y: -6 }}
      end={CR.automatedPosition.icon}
      extendS={20}
      extendE={40}
      bezier={[50, 0, 50, 0]}
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
      startAnimeBegin={CR.anime.lineBegin1}
      anime={Event.LINE_ANIME('sta')}
    />
    <GlowBezier
      k={'stm'}
      start={{ x: 0, y: 6 }}
      end={CR.manualPosition.icon}
      extendS={20}
      extendE={40}
      bezier={[50, 0, 50, 0]}
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
      startAnimeBegin={CR.anime.lineBegin1}
    />
    <GlowBezier
      k={'atr'}
      start={CR.automatedPosition.icon}
      end={{ x: CR.resolvedIncidentsPosition.icon.x, y: CR.resolvedIncidentsPosition.icon.y - 1}}
      extendS={0}
      extendE={0}
      bezier={[20, 0, 20, 0]}
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
      startAnimeBegin={CR.anime.lineBegin2}
    />
    <GlowBezier
      k={'mto'}
      start={CR.manualPosition.icon}
      end={{ x: CR.openIncidentsPosition.icon.x, y: CR.openIncidentsPosition.icon.y + 1}}
      extendS={0}
      extendE={0}
      bezier={[20, 0, 20, 0]}
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
      startAnimeBegin={CR.anime.lineBegin2}
    />
    <GlowBezier
      k={'ato'}
      start={{ x: CR.automatedPosition.icon.x, y: CR.automatedPosition.icon.y + 12 }}
      end={{ x: CR.openIncidentsPosition.icon.x, y: CR.openIncidentsPosition.icon.y - 12 }}
      extendS={40}
      extendE={40}
      bezier={[40, 0, 40, 0]}
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
      startAnimeBegin={CR.anime.lineBegin2}
    />
    <GlowBezier
      k={'mtr'}
      start={{ x: CR.manualPosition.icon.x, y: CR.manualPosition.icon.y - 12 }}
      end={{ x: CR.resolvedIncidentsPosition.icon.x, y: CR.resolvedIncidentsPosition.icon.y + 12 }}
      extendS={40}
      extendE={40}
      bezier={[40, 0, 40, 0]}
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
      startAnimeBegin={CR.anime.lineBegin2}
    />
    <g className="type-node" opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur={CR.anime.nodeDuration}
        begin={CR.anime.nodeBegin1}
        fill="freeze"
      />
      {/* <animateTransform
        attributeName="transform"
        type="translate"
        from={'0,20'}
        to={'0,0'}
        dur={CR.anime.nodeDuration}
        begin="1s"
        fill="freeze"
      /> */}
      <LabelCount 
        count={props.automated}
        labels={['Automated']}
        labelAttr={CR.label as React.SVGProps<SVGTextElement>}
        countAttr={CR.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CR.automatedPosition.text.x}, ${CR.automatedPosition.text.y})`}
      />
      <Node
        keyword="automated"
        style="blue"
        icon={ic_automated}
        x={CR.automatedPosition.icon.x}
        y={CR.automatedPosition.icon.y}
      />
    </g>
    <g className="type-node" opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur={CR.anime.nodeDuration}
        begin={CR.anime.nodeBegin2}
        fill="freeze"
      />
      <LabelCount 
        count={props.resolvedIncidents}
        labels={['Resolved Incidents']}
        labelAttr={CR.label as React.SVGProps<SVGTextElement>}
        countAttr={CR.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CR.resolvedIncidentsPosition.text.x}, ${CR.resolvedIncidentsPosition.text.y})`}
      />
      <Node
        keyword="resolved"
        style="blue"
        icon={ic_resolved}
        x={CR.resolvedIncidentsPosition.icon.x}
        y={CR.resolvedIncidentsPosition.icon.y}
      />
    </g>
    <g className="type-node" opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur={CR.anime.nodeDuration}
        begin={CR.anime.nodeBegin1}
        fill="freeze"
      />
      <LabelCount 
        count={props.manual}
        labels={['Manual']}
        labelAttr={CR.label as React.SVGProps<SVGTextElement>}
        countAttr={CR.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CR.manualPosition.text.x}, ${CR.manualPosition.text.y})`}
      />
      <Node
        keyword="manual"
        style="cyan"
        icon={ic_manual}
        x={CR.manualPosition.icon.x}
        y={CR.manualPosition.icon.y}
      />
    </g>
    <g className="type-node" opacity="0">
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur={CR.anime.nodeDuration}
        begin={CR.anime.nodeBegin2}
        fill="freeze"
      />
      <LabelCount 
        count={props.openIncidents}
        labels={['Open Incidents']}
        labelAttr={CR.label as React.SVGProps<SVGTextElement>}
        countAttr={CR.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CR.openIncidentsPosition.text.x}, ${CR.openIncidentsPosition.text.y})`}
      />
      <Node
        keyword="open"
        style="cyan"
        icon={ic_open}
        x={CR.openIncidentsPosition.icon.x}
        y={CR.openIncidentsPosition.icon.y}
      />
    </g>
  </g>
}

export default RightComp