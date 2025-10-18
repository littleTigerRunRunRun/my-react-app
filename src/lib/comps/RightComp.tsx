import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import Node from './comp/Node'
import ic_automated from '../../assets/ic_automated.png'
import ic_resolved from '../../assets/ic_resolved.png'
import ic_manual from '../../assets/ic_manual.png'
import ic_open from '../../assets/ic_open.png'

function RightComp({ props }:{ props: {
  automated: number,
  resolvedIncidents: number,
  manual: number,
  openIncidents: number
} }) {
  const CR = DC.right

  return <g className='right-comp' transform={`translate(${DC.center.size.width * 0.5 + CR.position.x}, 0)`}>
    <LabelCount 
      count={props.automated}
      labels={['Automated']}
      labelAttr={CR.label as React.SVGProps<SVGTextElement>}
      countAttr={CR.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CR.automatedPosition.text.x}, ${CR.automatedPosition.text.y})`}
    />
    <LabelCount 
      count={props.resolvedIncidents}
      labels={['Resolved Incidents']}
      labelAttr={CR.label as React.SVGProps<SVGTextElement>}
      countAttr={CR.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CR.resolvedIncidentsPosition.text.x}, ${CR.resolvedIncidentsPosition.text.y})`}
    />
    <LabelCount 
      count={props.manual}
      labels={['Manual']}
      labelAttr={CR.label as React.SVGProps<SVGTextElement>}
      countAttr={CR.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CR.manualPosition.text.x}, ${CR.manualPosition.text.y})`}
    />
    <LabelCount 
      count={props.openIncidents}
      labels={['Open Incidents']}
      labelAttr={CR.label as React.SVGProps<SVGTextElement>}
      countAttr={CR.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CR.openIncidentsPosition.text.x}, ${CR.openIncidentsPosition.text.y})`}
    />
    <Node
      keyword="automated"
      style="blue"
      icon={ic_automated}
      x={CR.automatedPosition.icon.x}
      y={CR.automatedPosition.icon.y}
    />
    <Node
      keyword="resolved"
      style="blue"
      icon={ic_resolved}
      x={CR.resolvedIncidentsPosition.icon.x}
      y={CR.resolvedIncidentsPosition.icon.y}
    />
    <Node
      keyword="manual"
      style="cyan"
      icon={ic_manual}
      x={CR.manualPosition.icon.x}
      y={CR.manualPosition.icon.y}
    />
    <Node
      keyword="open"
      style="cyan"
      icon={ic_open}
      x={CR.openIncidentsPosition.icon.x}
      y={CR.openIncidentsPosition.icon.y}
    />
  </g>
}

export default RightComp