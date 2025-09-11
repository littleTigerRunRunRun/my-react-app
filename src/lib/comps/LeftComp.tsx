import DC from '../defaultConfig'

function LeftComp({ props }:{ props: {
  endpoints: number,
  dataSources: number,
  sources: Array<{ pic: string, status: string, width: number, height: number }>
} }) {
  const CL = DC.left
  const CLS = CL.source
  const CLA = CL.arc

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

  return <g
    className="left-comp"
    transform={`translate(${CL.position.x - DC.center.size.width * 0.5 - CLS.width}, ${CL.position.y})`}
  >
    <g
      className="sources"
      mask="url(#svg_pt_leftMask)"
    >
      <path
        d={`M${arcsPosition[0].x},${arcsPosition[0].y} A${CLA.r},${CLA.r} 0 0 1 ${arcsPosition[arcsPosition.length - 1].x},${arcsPosition[arcsPosition.length - 1].y}`}
        fill="none"
        stroke={CLA.stroke}
        strokeWidth={CLA.strokeWidth}
        strokeOpacity={CLA.opacity}
      />
      {
        props.sources.map((source, index) => {
          const style = source.status === 'safe' ? CLS.normalPoint : CLS.dangerPoint
          return <g className="source" key={index}>
            <image
              x={-source.width * CLS.picHeight / source.height + CLS.x + arcsPosition[index].x}
              y={arcsPosition[index].y - CLS.picHeight * 0.5}
              width={source.width * CLS.picHeight / source.height}
              height={CLS.picHeight}
              href={source.pic}
              key={index}
            />
            {/* <path
              // d={`M${arcsPosition[index].x},${arcsPosition[index].y} C${-CL.position.x * 0.6},${arcsPosition[index].y * 1.1} ${-CL.position.x * 0.8},${arcsPosition[index].y * CLS.lineEndRate * 1.1} ${-CL.position.x},${arcsPosition[index].y * CLS.lineEndRate}`}
              d={`M${arcsPosition[index].x},${arcsPosition[index].y} C${-CL.position.x * 0.6},${arcsPosition[index].y * 1.1} ${-CL.position.x * 0.4},${arcsPosition[index].ey * 1.1} ${-CL.position.x},${arcsPosition[index].ey}`}
              fill="none"
              stroke={style.lineStroke}
              strokeWidth={CLA.strokeWidth}
            /> */}
            <path
              d={`M${arcsPosition[index].x},${arcsPosition[index].y} C${CLS.width * 0.6},${arcsPosition[index].y * 1.1} ${CLS.width * 0.4},${arcsPosition[index].ey * 1.1} ${CLS.width},${arcsPosition[index].ey}`}
              fill="none"
              // stroke={CLA.stroke}
              stroke={style.lineStroke}
              strokeWidth={CLA.outerLineStrokeWidth}
              strokeOpacity={CLA.outerLineOpacty}
            />
            <circle
              cx={arcsPosition[index].x}
              cy={arcsPosition[index].y}
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