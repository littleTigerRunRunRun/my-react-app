// import DC from '../../defaultConfig'
import { formatNumberTo4SignificantDigits } from '../../utils/index'
import ScrollNumber from './ScrollNumber'

function LabelCount(props: {
  count:number,
  labels: Array<string>,
  transform?: string,
  labelAttr: React.SVGProps<SVGTextElement>,
  countAttr: React.SVGProps<SVGTextElement>
}) {

  return <g className="infoShow right" transform={props.transform}>
    <ScrollNumber
      count={formatNumberTo4SignificantDigits(props.count)}
      attr={props.labelAttr}
    />
    {
      props.labels.map((label, index) => {
        return <text
          key={index}
          {...props.countAttr}
        >{label}</text>
      })
    }
  </g>
}

export default LabelCount