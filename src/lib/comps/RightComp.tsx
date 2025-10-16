import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import Bezier from './comp/Bezier'

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
  </g>
}

export default RightComp