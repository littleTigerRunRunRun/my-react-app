import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import pic_cl from '../../assets/center_left.png'
import pic_cm from '../../assets/center_main.png'
import pic_cr from '../../assets/center_right.png'

function CenterComp({ props }:{
  props: {
    alerts: number,
    incidents: number
  }
}) {
  const CC = DC.center

  return <g
    className="center-comp"
    transform={`translate(${CC.position.x + CC.size.width * -0.5}, ${CC.position.y + CC.size.height * -0.5})`}
  >
    <image
      href={pic_cm}
      x={CC.size.width * 0.5 - 270}
      y={CC.size.height * 0.5 - 270}
      width="540"
      height="540"
    />
    <image
      href={pic_cl}
      x={0}
      y={CC.size.height * 0.5 - 70}
      width="216"
      height="140"
    />
    <image
      href={pic_cr}
      x={CC.size.width - 176}
      y={CC.size.height * 0.5 - 70}
      width="176"
      height="140"
    />
    <LabelCount 
      count={props.alerts}
      labels={['Alerts']}
      labelAttr={CC.label as React.SVGProps<SVGTextElement>}
      countAttr={CC.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CC.alertsPosition}, ${CC.size.height * 0.5})`}
    />
    <LabelCount 
      count={props.incidents}
      labels={['Incidents']}
      labelAttr={CC.label as React.SVGProps<SVGTextElement>}
      countAttr={CC.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CC.incidentsPosition}, ${CC.size.height * 0.5})`}
    />
  </g>
}

export default CenterComp