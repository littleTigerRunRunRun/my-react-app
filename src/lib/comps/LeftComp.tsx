import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import './index.scss'
import { subscriber, Event } from '../utils/Subscriber'
import type { Attributes, SVGAttributes } from 'react'
import { getBezier } from '../utils'

function LeftComp({ props }:{ props: {
  endpoints: number,
  dataSources: number,
  showLength: number,
  sources: Array<{ pic?: string, name: string, status: string, width: number, height: number }>
} }) {
  const CL = DC.left
  const height = (props.sources.length - 1) * CL.height + CL.iconMaxHeight

  const items = props.sources.map((item) => {
    let rate = 1
    let pwidth
    let pheight
    if (item.width > CL.iconMaxWidth) {
      pwidth = CL.iconMaxWidth
      rate = CL.iconMaxWidth / item.width
    } else pwidth = item.width

    if (item.height * rate > CL.iconMaxHeight) {
      pheight = CL.iconMaxHeight
      // rate = CL.iconMaxHeight / (item.height * rate)
    } else pheight = item.height * rate

    return {
      src: item.pic,
      pwidth,
      pheight,
      name: item.name,
      status: item.status
    }
  })

  return <g
    className="left-comp"
    transform={`translate(${-CL.width - DC.center.size.width * 0.5 + DC.center.position.x}, 0)`}
  >
    <defs>
      <linearGradient id="svg_pt_lg_leftMask" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
        <stop offset="60%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_flow_line" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
        <stop offset="50%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <mask id="svg_pt_mask_left_line">
        <rect
          width={CL.lineWidth}
          height={height}
          fill="url(#svg_pt_lg_leftMask)"
          x={CL.lineStartPosition}
          y={height * -0.5}
        />
      </mask>
    </defs>
    {
      items.map((item, i) => {
        return <g
          className='left-item'
          transform={`translate(0, ${CL.height * (i - (items.length - 1) * 0.5)})`}
          key={i}
        >
          <image
            href={item.src}
            width={item.pwidth}
            height={item.pheight}
            x={CL.iconMaxWidth * 0.5 - item.pwidth * 0.5}
            y={item.pheight * -0.5}
          />
          <text
            x={CL.nameStartPosition}
            {...CL.nameAttr as React.SVGProps<SVGTextElement>}
          >{ item.name }</text>
            
              {/* start={{ x: position.x, y: position.y }}
              end={{ x: CLS.width, y: position.ey }}
              extendS={CLS.width * (0.1 + 0.04 * Math.abs(index - (props.sources.length - 1) * 0.5))}
              bezier={[CLS.width * (0.2 - 0.04 * Math.abs(index - (props.sources.length - 1) * 0.5)) - position.x, 0, CLS.width * 0.6, 0]}
              fill="none"
              stroke={style.lineStroke}
              strokeWidth={2}
              strokeOpacity={0.3} */}
        </g>
      })
    }
    <g className="line-group" mask="url(#svg_pt_mask_left_line)">
      {/* <rect
        id="circle"
        x="-20"
        y="-4"
        width="40"
        height="8"
        fill="url(#lineFlowGradient)"
      />
      <animateMotion
        ref="motion"
        xlink:href="#circle"
        dur="5s"
        begin="0s"
        fill="remove"
        repeatCount="indefinite"
        rotate="auto"
        path="linePath"
      /> */}
      {
        items.map((item, i) => {
          const path = getBezier({
            start: { x: CL.lineStartPosition, y: CL.height * (i - (items.length - 1) * 0.5) },
            end: { x: CL.lineStartPosition + CL.lineWidth, y: CL.lineEndHeight * (i - (items.length - 1) * 0.5) },
            extendS: 0.3 * CL.lineWidth,
            extendE: 0.1 * CL.lineWidth,
            bezier: [0.2 * CL.lineWidth, 0, 0.2 * CL.lineWidth, 0]
          })

          return <>
            <defs>
              <mask id={`flowline_${i}`}>
                <path
                  key={`il_mask_${i}`}
                  d={path}
                  {...{
                    fill: 'none',
                    stroke: '#fff',
                    strokeWidth: 2,
                    strokeLinecap: 'round'
                  }}
                />
              </mask>
            </defs>
            <rect
              key={`rect_${i}`}
              mask={`url(#flowline_${i})`}
              x={CL.lineStartPosition}
              y={CL.height * (i - (items.length - 1) * 0.5) - 50}
              width="100"
              height="100"
              fill="url(#svg_pt_lg_lc_flow_line)"
            />
            <path
              key={`ol_${i}`}
              d={path}
              {...{
                fill: 'none',
                stroke: 'rgba(255, 255, 255, 0.2)',
                strokeWidth: 8,
                strokeLinecap: 'round'
              }}
            />
          </>
        })
      }
    </g> 
  </g>
}

export default LeftComp 