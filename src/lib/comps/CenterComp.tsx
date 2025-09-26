import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'

function CenterComp({ props }:{
    props: {
      bgStatus: 'safe' | 'low' | 'middle' | 'high' | 'critical',
      points: Array<{ status: 'safe' | 'low' | 'middle' | 'high' | 'critical' }>,
      [key:string]: any
    }
  }) {
  const CC = DC.center
  const CCFC = CC.bgFenceCircle
  const CCFCRectArray:Array<number> = []
  const CCOC = CC.bgOuterCircle
  const CCIC = CC.bgInnerCircle
  const CCOP = CC.pointsLayer
  const CCOPArray:Array<Array<{ angle: number, color: string }>> = []
  const CCC = CC.column
  const statusColor = DC.global.color[props.bgStatus]

  for (let i = 0; i < CCFC.num; i++) CCFCRectArray.push(360 / CCFC.num * i)
  let layerStart = 0
  for (let l = 0; l < CCOP.length; l++) {
    const layer = CCOP[l]
    const layerArray:Array<{ angle: number, color: string }> = []
    for (let i = 0; i < layer.num; i++) {
      layerArray.push({
        angle: 360 / layer.num * i,
        // @ts-ignore
        color: DC.global.color[props.points[layerStart + i]]
      })
    }
    CCOPArray.push(layerArray)
    layerStart += layer.num
  }
  // console.log(CCOPArray)

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
            fill={statusColor}
            fillOpacity={CCFC.opacity[props.bgStatus]}
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
          stroke={statusColor}
          strokeWidth={CCOC.width}
          strokeOpacity={CCOC.opacity}
          // filter="url(#basicGlow)"
        />
        <circle
          cx="0"
          cy="0"
          r={CCIC.r}
          fill="transparent"
          stroke={statusColor}
          strokeWidth={CCIC.width}
          strokeOpacity={CCIC.opacity}
          // filter="url(#basicGlow)"
        />
      </g>
      <g className="case-points">
        {
          CCOPArray.map((layer, index) => {
            return <g key={index} className="points-layer">
              {
                layer.map((item, iIndex) => {
                  return <circle
                    key={`${index}_${iIndex}`}
                    r={CCOP[index].size}
                    fill={item.color}
                    cx={CCOP[index].r}
                    cy="0"
                    transform={`rotate(${item.angle} 0 0)`}
                  />
                })
              }
            </g>
          })
        }
      </g>
      <LabelCount 
        count={props.leftCount}
        labels={['ISSUES']}
        align="middle"
        transform={`translate(${CCC.leftPosition.x}, 0)`}
      />
      <LabelCount 
        count={props.rightCount}
        labels={['CASES']}
        align="middle"
        transform={`translate(${CCC.rightPosition.x}, 0)`}
      />
    </g>
  </g>
}

export default CenterComp