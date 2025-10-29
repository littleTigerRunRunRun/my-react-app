// import DC from '../../defaultConfig'
import { limit4 } from '../../utils/index'
import ScrollNumber from './ScrollNumber'

function LabelCount(props: {
  count:number,
  labels: Array<string>,
  transform?: string,
  labelAttr: React.SVGProps<SVGTextElement>,
  countAttr: React.SVGProps<SVGTextElement>,
  clipPath?: string
}) {

  return <g
    className="infoShow right"
    clipPath={props.clipPath}
    transform={props.transform}
  >
    <g className="hover-g">
      <ScrollNumber
        count={limit4(props.count)}
        attr={props.labelAttr}
      />
      {
        props.labels.map((label, index) => {
          return <text
            className="label"
            key={index}
            {...props.countAttr}
          >{label}</text>
        })
      }
    </g>
  </g>
}

export default LabelCount