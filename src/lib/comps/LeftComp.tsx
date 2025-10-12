import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import Bezier from './comp/Bezier'
import './index.scss'
import { subscriber, Event } from '../utils/Subscriber'
import type { Attributes, SVGAttributes } from 'react'

function LeftComp({ props }:{ props: {
  endpoints: number,
  dataSources: number,
  showLength: number,
  sources: Array<{ pic?: string, name: string, status: string, width: number, height: number }>
} }) {
  const CL = DC.left
  const height = 0

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
    transform={`translate(${-CL.width - DC.center.size.width * 0.5 + DC.center.position.x}, ${height * -0.5})`}
  >
    {
      items.map((item, i) => {
        return <g
          className='left-item'
          transform={`translate(0, ${CL.height * (i - items.length *0.5)})`}
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
    <g className="line-group">
      {
        items.map((item, i) => {
          return <Bezier
            key={i}
            start={{ x: CL.lineStartPosition, y: CL.height * (i - items.length *0.5) }}
            end={{ x: CL.lineStartPosition + CL.lineWidth, y: CL.lineEndHeight * (i - items.length *0.5) }}
            extendS={0.3 * CL.lineWidth}
            extendE={0.1 * CL.lineWidth}
            bezier={[0.2 * CL.lineWidth, 0, 0.2 * CL.lineWidth, 0]}
            pathAttr={{
              fill: 'none',
              stroke: 'rgba(255, 255, 255, 0.3)',
              strokeWidth: 4
            }}
          />
        })
      }
    </g> 
  </g>
}

export default LeftComp 