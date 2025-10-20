import { getBezier } from '../../utils'

// 发光贝塞尔曲线，相比起一般的贝塞尔曲线，包含了一个内置的流线动画功能，可以经由外部手动驱动执行
// 此外还搭配了自带的淡入绘制动画
// 从一个起点到一个终点连一根线
export function GlowBezier(props: {
  k: string
  start: { x:number, y:number },
  end: { x:number, y:number },
  extendS: number,
  extendE: number,
  bezier: [number, number, number, number]
  styleAttr: {
    outerLine: React.SVGProps<SVGPathElement>
    innerLine: React.SVGProps<SVGPathElement>
  },
  startAnimeBegin: string,
  random: boolean
}) {
  const path = getBezier({
    start: { x: 0, y: 0 },
    end: { x: props.end.x - props.start.x, y: props.end.y - props.start.y },
    extendS: props.extendS,
    extendE: props.extendE,
    bezier: props.bezier
  })
  const pk = props.k
  const fms = { w: 100, h: 80 } // flowMaskSize
  const sas = { w: 20, h: 20} // start anime size
  const moveGlowPath = path + `l${fms.w}, 0`

  return <g className="comp-glow-bezier" key={`line_${pk}`}>
    <defs>
      <mask
        id={`start_anime_${pk}`}
        maskUnits="userSpaceOnUse"
        width={props.end.x - props.start.x + sas.w * 2}
        height={Math.abs(props.end.y - props.start.y) + sas.h * 2}
        x={props.start.x - sas.w}
        y={Math.min(props.start.y, props.end.y) - sas.h}
      >
        <rect
          x={props.start.x - sas.w}
          y={Math.min(props.start.y, props.end.y) - sas.h}
          width={0}
          height={Math.abs(props.end.y - props.start.y) + sas.h * 2}
          fill="#fff"
        >
          <animate
            attributeName="width"
            from={0}
            to={props.end.x - props.start.x + sas.w * 2}
            dur="0.6s"
            begin={props.startAnimeBegin}
            repeatCount="1"
            fill="freeze"
          />
        </rect>
      </mask>
      <mask id={`flowline_${pk}`}>
        <rect
          id={`move_glow_${pk}`}
          width={fms.w}
          height={fms.h}
          x={-fms.w}
          y={fms.h * -0.5}
          fill="url(#svg_pt_lg_lc_flow_line)"
        >
          <animateMotion
            xlinkHref={`#move_glow_${pk}`}
            dur="2s"
            begin={`accessKey(move_glow_${pk})`}
            fill="freeze"
            rotate="auto"
            path={moveGlowPath}
          />
        </rect>
      </mask>
    </defs>
    <g className="bezier-content" mask={`url(#start_anime_${pk})`}>
      <path
        d={path}
        transform={`translate(${props.start.x}, ${props.start.y})`}
        {...props.styleAttr.outerLine}
      />
      <path
        d={path}
        transform={`translate(${props.start.x}, ${props.start.y})`}
        mask={props.random ? `url(#flowline_${pk})` : ''}
        {...props.styleAttr.innerLine}
      />
    </g>
  </g>
}
