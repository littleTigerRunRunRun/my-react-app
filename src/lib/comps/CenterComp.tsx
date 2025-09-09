import DC from '../defaultConfig'

function CenterComp({ props }:{ props: Record<string, any> }) {
  const CC = DC.center
  const CCFC = CC.bgFenceCircle
  const CCFCRectArray:Array<number> = []
  const CCOC = CC.bgOuterCircle
  const CCIC = CC.bgInnerCircle

  for (let i = 0; i < CCFC.num; i++) {
    CCFCRectArray.push(360 / CCFC.num * i)
  }

  console.log(props)

  return <g
    className="center-comp"
    transform={`translate(${CC.position.x}, ${CC.position.y})`}
  >
    <g className="center-comp-bg">
      {
        CCFCRectArray.map((angle, index) => (
          <rect
            key={index}
            x={CCFC.r - CCFC.width * 0.5}
            y={CCFC.thickness * -0.5}
            width={CCFC.width}
            height={CCFC.thickness}
            fill={props.bgStatusColor}
            fillOpacity={CCFC.opacity}
            transform={`rotate(${angle} 0 0)`}
          />
        ))
      }
      <g mask="url(#svg_pt_centerCircleMask)">
        <circle
          cx="0"
          cy="0"
          r={CCOC.r}
          fill="transparent"
          stroke={props.bgStatusColor}
          strokeWidth={CCOC.width}
          strokeOpacity={CCOC.opacity}
          filter="url(#basicGlow)"
        />
        <circle
          cx="0"
          cy="0"
          r={CCIC.r}
          fill="transparent"
          stroke={props.bgStatusColor}
          strokeWidth={CCIC.width}
          strokeOpacity={CCIC.opacity}
          filter="url(#basicGlow)"
        />
      </g>
    </g>
  </g>
}

export default CenterComp