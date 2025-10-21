import DC from '../defaultConfig'
import './index.scss'
import { Event } from '../utils/Subscriber'
import { GlowBezier } from './comp/GlowBezier'

function LeftComp({ props }:{ props: {
  extraSource: number,
  sources: Array<{ pic?: string, name: string, status: string, width: number, height: number }>
} }) {
  const CL = DC.left
  const height = props.sources.length * CL.height + CL.iconMaxHeight

  const items:Array<{
    pic?: {
      url?: string,
      width: number,
      height: number
    },
    count?: number,
    name: string,
    status: string
  }> = props.sources.map((item) => {
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
      pic: {
        url: item.pic,
        width: pwidth,
        height: pheight
      },
      name: item.name,
      status: item.status
    }
  })
  
  if (props.extraSource > 0) {
    items.push({
      name: 'Date Sources',
      count: props.extraSource,
      status: 'normal'
    })
  }

  return <g
    className="left-comp"
    transform={`translate(${-CL.width - DC.center.size.width * 0.5 + DC.center.position.x}, 0)`}
  >
    <defs>
      <linearGradient id="svg_pt_lg_left_mask" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
        <stop offset="60%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="svg_pt_lg_lc_flow_line" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#fff" stopOpacity="0" />
        <stop offset="50%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="svg_pt_lg_lc_danger_point" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#F54E4E" stopOpacity="0.8" />
        <stop offset="33%" stopColor="#F54E4E" stopOpacity="0.8" />
        <stop offset="33%" stopColor="#F54E4E" stopOpacity="0.5" />
        <stop offset="66%" stopColor="#F54E4E" stopOpacity="0.5" />
        <stop offset="66%" stopColor="#F54E4E" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#F54E4E" stopOpacity="0.2" />
      </radialGradient>
      <mask id="svg_pt_mask_left_line">
        {
          // 这里的12是用于流线开始的危险内容的圆形
        }
        <rect
          width={CL.lineWidth + 12}
          height={height}
          fill="url(#svg_pt_lg_left_mask)"
          x={CL.lineStartPosition - 12}
          y={height * -0.5}
        />
      </mask>
    </defs>
    {
      items.map((item, i) => {
        return <g
          className='left-item'
          opacity="0"
          transform={`translate(0, ${CL.height * (i - (items.length - 1) * 0.5)})`}
          key={i}
        >
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.4s"
            begin={`${0.1 * i + 0.5}s`}
            repeatCount="1"
            fill="freeze"
          />
          {
            item.pic ? <image
              href={item.pic.url}
              width={item.pic.width}
              height={item.pic.height}
              x={CL.iconMaxWidth * 0.5 - item.pic.width * 0.5 - 20}
              y={item.pic.height * -0.5}
            >
              <animate
                attributeName="x"
                from={CL.iconMaxWidth * 0.5 - item.pic.width * 0.5 - 20}
                to={CL.iconMaxWidth * 0.5 - item.pic.width * 0.5}
                dur="0.2s"
                begin={`${0.1 * i + 0.5}s`}
                repeatCount="1"
                fill="freeze"
              />
            </image> : ''
          }
          {
            item.count ? <text
              x={CL.iconMaxWidth * 0.5 - 20}
              {...CL.nameAttr as React.SVGProps<SVGTextElement>}
              fontSize={22}
            >
              +{ item.count }
              <animate
                attributeName="x"
                from={CL.iconMaxWidth * 0.5 - 20}
                to={CL.iconMaxWidth * 0.5 * 0.5}
                dur="0.2s"
                begin={`${0.1 * i + 0.5}s`}
                repeatCount="1"
                fill="freeze"
              />
            </text> : ''
          }
          <text
            x={CL.nameStartPosition - 20}
            {...CL.nameAttr as React.SVGProps<SVGTextElement>}
          >
            { item.name }
            <animate
              attributeName="x"
              from={CL.nameStartPosition - 20}
              to={CL.nameStartPosition}
              dur="0.2s"
              begin={`${0.1 * i + 0.5}s`}
              repeatCount="1"
              fill="freeze"
            />
          </text>
        </g>
      })
    }
    <g className="line-group" mask="url(#svg_pt_mask_left_line)">
      {
        items.map((item, i) => {
          if (item.status === 'danger') return <g key={`line_${i}`}>
            <GlowBezier
              k={`${i}`}
              start={{ x: CL.lineStartPosition, y: CL.height * (i - (items.length - 1) * 0.5) }}
              end={{ x: CL.lineStartPosition + CL.lineWidth, y: CL.lineEndHeight * (i - (items.length - 1) * 0.5) }}
              extendS={0.3 * CL.lineWidth}
              extendE={0.1 * CL.lineWidth}
              bezier={[0.2 * CL.lineWidth, 0, 0.2 * CL.lineWidth, 0]}
              styleAttr={{
                innerLine: Object.assign({}, CL.innerLineAttr, {
                  stroke: "#F54E4E",
                  strokeOpacity: 0.2
                }) as React.SVGProps<SVGPathElement>,
                outerLine: CL.outerLineAttr as React.SVGProps<SVGPathElement>,
                flowLine:  Object.assign({}, CL.flowLineAttr, {
                  stroke: "#F54E4E"
                }) as React.SVGProps<SVGPathElement>
              }}
              startAnimeBegin={`${0.1 * i + 0.8}s`}
              anime={Event.LINE_ANIME(i)}
            />
            <circle
              cx={CL.lineStartPosition}
              cy={CL.height * (i - (items.length - 1) * 0.5)}
              fill="url(#svg_pt_lg_lc_danger_point)"
              opacity="0"
              {...(CL.linePoint.danger)}
            >
              <animate
                attributeName="opacity"
                from={0}
                to={1}
                dur="0.5s"
                begin={`${0.1 * i + 0.8}s`}
                repeatCount="1"
                fill="freeze"
              />
            </circle>
          </g>
          else return <g key={`line_${i}`}>
            <GlowBezier
              k={`${i}`}
              start={{ x: CL.lineStartPosition, y: CL.height * (i - (items.length - 1) * 0.5) }}
              end={{ x: CL.lineStartPosition + CL.lineWidth, y: CL.lineEndHeight * (i - (items.length - 1) * 0.5) }}
              extendS={0.3 * CL.lineWidth}
              extendE={0.1 * CL.lineWidth}
              bezier={[0.2 * CL.lineWidth, 0, 0.2 * CL.lineWidth, 0]}
              styleAttr={{
                outerLine: CL.outerLineAttr as React.SVGProps<SVGPathElement>,
                flowLine: CL.flowLineAttr as React.SVGProps<SVGPathElement>
              }}
              startAnimeBegin={`${0.1 * i + 0.9}s`}
              anime={Event.LINE_ANIME(i)}
            />
            <circle
              cx={CL.lineStartPosition}
              cy={CL.height * (i - (items.length - 1) * 0.5)}
              opacity="0"
              {...(CL.linePoint.normalAttr)}
            >
              <animate
                attributeName="opacity"
                from={0}
                to={1}
                dur="0.5s"
                begin={`${0.1 * i + 0.8}s`}
                repeatCount="1"
                fill="freeze"
              />
            </circle>
          </g>
        })
      }
    </g> 
  </g>
}

export default LeftComp 