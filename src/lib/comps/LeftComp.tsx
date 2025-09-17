import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'

function LeftComp({ props }:{ props: {
  endpoints: number,
  dataSources: number,
  sources: Array<{ pic?: string, labels?:Array<string>, count?:number, status: string, width: number, height: number }>
} }) {
  const CL = DC.left
  const CLS = CL.source
  const CLA = CL.arc

  console.log(props)
  const arcsPosition = props.sources.map((_source, index) => {
    const y = (index - (props.sources.length - 1) * 0.5) * CLS.height
    const x = CLA.cx + Math.sqrt(CLA.r * CLA.r - y * y)
    const ey = index === (props.sources.length - 1) * 0.5 ? 0 : (index < (props.sources.length - 1) * 0.5 ? (0 - index) * CLS.height * CLS.lineEndRate : (props.sources.length - 1 - index) * CLS.height * CLS.lineEndRate)
    return {
      x,
      y,
      ey
    }
  })
  // 其他数据源的合并项
  const combineY = (9 - (props.sources.length - 1) * 0.5) * CLS.height
  const combineX = CLA.cx + Math.sqrt(CLA.r * CLA.r - combineY * combineY)
  arcsPosition.push({
    y: combineY,
    x: combineX,
    ey: (props.sources.length - 1 - 9) * CLS.height * CLS.lineEndRate
  })
  
  const endpointsY = (-1 - (props.sources.length - 1) * 0.5) * CLS.height
  const endpointsX = CLA.cx + Math.sqrt(CLA.r * CLA.r - combineY * combineY)
  const epp = {
    y: endpointsY - 20,
    x: endpointsX,
    ey: arcsPosition[5].ey
  }

  return <g
    className="left-comp"
    transform={`translate(${CL.position.x - DC.center.size.width * 0.5 - CLS.width}, ${CL.position.y})`}
  >
    <g
      className="sources"
      mask="url(#svg_pt_leftMask)"
    >
      <path
        d={`M${arcsPosition[0].x},${arcsPosition[0].y} A${CLA.r},${CLA.r} 0 0 1 ${arcsPosition[arcsPosition.length - 2].x},${arcsPosition[arcsPosition.length - 2].y}`}
        fill="none"
        stroke={CLA.stroke}
        strokeWidth={CLA.strokeWidth}
        strokeOpacity={CLA.opacity}
      />
      <g>
        <path
          d={`M${epp.x},${epp.y} L${epp.x + CLS.width * (0.1 + 0.04 * Math.abs(-1 - (props.sources.length - 1) * 0.5))},${epp.y * 1} C${CLS.width * 0.3},${epp.y * 1} ${CLS.width * 0.4},${epp.ey * 1.1} ${CLS.width},${epp.ey}`}
          fill="none"
          // stroke={CLA.stroke}
          stroke={CLS.normalPoint.lineStroke}
          strokeWidth={16}
          strokeOpacity={0.4}
        />
        <LabelCount
          labels={['ENDPOINTS']}
          count={props.endpoints}
          align="start"
          transform={`translate(${epp.x - 120}, ${epp.y + 18})`}
        />
      </g>
      {
        arcsPosition.map((position, index) => {
          const source = props.sources[index] || { labels: ['DATE SOURCES'], count: props.dataSources - 9, status: 'safe' }
          const style = source.status === 'safe' ? CLS.normalPoint : CLS.dangerPoint
          return <g className="source" key={index}>
            {
              source.pic ? <image
                x={-source.width * CLS.picHeight / source.height + CLS.x + position.x}
                y={position.y - CLS.picHeight * 0.5}
                width={source.width * CLS.picHeight / source.height}
                height={CLS.picHeight}
                href={source.pic}
                key={index}
              />: <></>
            }
            {
              source.labels && source.count ? <LabelCount
                labels={source.labels}
                count={source.count}
                align="start"
                transform={`translate(${position.x - 90}, ${position.y + 18})`}
                showPositive={true}
              />: <></>
            }
            <path
              d={`M${position.x},${position.y} L${position.x + CLS.width * (0.1 + 0.04 * Math.abs(index - (props.sources.length - 1) * 0.5))},${position.y * 1} C${CLS.width * 0.3},${position.y * 1} ${CLS.width * 0.4},${position.ey * 1.1} ${CLS.width},${position.ey}`}
              fill="none"
              // stroke={CLA.stroke}
              stroke={style.lineStroke}
              strokeWidth={2}
              strokeOpacity={0.3}
            />
            <path
              d={`M${position.x},${position.y} L${position.x + CLS.width * (0.1 + 0.04 * Math.abs(index - (props.sources.length - 1) * 0.5))},${position.y * 1} C${CLS.width * 0.3},${position.y * 1} ${CLS.width * 0.4},${position.ey * 1.1} ${CLS.width},${position.ey}`}
              fill="none"
              // stroke={CLA.stroke}
              stroke={style.lineStroke}
              strokeWidth={CLA.outerLineStrokeWidth}
              strokeOpacity={CLA.outerLineOpacty}
            />
            <circle
              cx={position.x}
              cy={position.y}
              r={style.r}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
            />
          </g>
        })
      }
    </g>
  </g>
}

export default LeftComp 