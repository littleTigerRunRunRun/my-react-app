import DC from '../../defaultConfig'
import { formatNumber } from '../../utils/index'

function LabelCount(props: { count:number, labels: Array<string>, align: 'start'|'middle'|'end', transform?: string, showPositive?: boolean }) {
  const LCC = DC.global.comp.LabelCount

  return <g className="infoShow right" transform={props.transform}>
    <text
      fontSize={LCC.count.size}
      fill={LCC.count.color}
      x={LCC.count.position.x}
      y={LCC.count.position.y}
      textAnchor={props.align}
      dominantBaseline="middle"
      fontWeight="bold"
      letterSpacing={LCC.count.spacing}
    >{(props.showPositive ? '+' : '')+ formatNumber(props.count)}</text>
    {
      props.labels.map((label, index) => {
        return <text
          key={index}
          fontSize={LCC.label.size}
          fill={LCC.label.color}
          x={LCC.label.position.x}
          y={LCC.label.position.y + LCC.label.nextLine * index}
          textAnchor={props.align}
          dominantBaseline="middle"
          fontWeight="bold"
          letterSpacing={LCC.label.spacing}
        >{label}</text>
      })
    }
  </g>
}

export default LabelCount