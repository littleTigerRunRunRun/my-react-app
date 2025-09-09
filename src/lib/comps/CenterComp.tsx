import DC from '../defaultConfig'

function CenterComp({ props }:{ props: Record<string, any> }) {
  const CC = DC.center
  const CCOC = CC.bgOuterCircle
  const CCIC = CC.bgInnerCircle

  console.log(props)

  return <g
    className="center-comp"
    transform={`translate(${CC.position.x}, ${CC.position.y})`}
  >
    <g className="center-comp-bg">
      <circle
        cx="0"
        cy="0"
        r={CCOC.r}
        fill="transparent"
        stroke={props.bgStatusColor}
        strokeWidth={CCOC.width}
      />
      <circle
        cx="0"
        cy="0"
        r={CCIC.r}
        fill="transparent"
        stroke={props.bgStatusColor}
        strokeWidth={CCIC.width}
      />
    </g>
  </g>
}

export default CenterComp