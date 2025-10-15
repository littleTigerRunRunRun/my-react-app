import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'

function CenterComp({ props }:{
  props: {
    alerts: number,
    incidents: number
  }
}) {
  const CC = DC.center

  return <g
    className="center-comp"
    transform={`translate(${CC.position.x}, ${CC.position.y})`}
  >
    <LabelCount 
      count={props.alerts}
      labels={['Alerts']}
      labelAttr={CC.label as React.SVGProps<SVGTextElement>}
      countAttr={CC.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CC.alertsPosition}, 0)`}
    />
    <LabelCount 
      count={props.incidents}
      labels={['Incidents']}
      labelAttr={CC.label as React.SVGProps<SVGTextElement>}
      countAttr={CC.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CC.incidentsPosition}, 0)`}
    />
  </g>
}

export default CenterComp