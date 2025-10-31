import DC from '../defaultConfig'
import { Event, subscriber, Value } from '../utils/Subscriber'
import { GlowBezier } from './comp/GlowBezier'
import { formatNumberTo4SignificantDigits, textLengthLimit } from '../utils'
import { useEffect } from 'react'

const byteUnits = [
  { threshold: 1024 * 1024 * 1024 * 1024, unit: 'T' },
  { threshold: 1024 * 1024 * 1024, unit: 'G' },
  { threshold: 1024 * 1024, unit: 'M' },
  { threshold: 1024, unit: 'K' }
]

function LeftComp({ props }:{ props: {
  extraSource: number,
  sources: Array<{ pic?: string, name: string, status: string, size: number }>
} }) {
  const CL = DC.left
  const CLAI = CL.anime.itemsBegin
  const height = props.sources.length * CL.height + CL.iconMaxHeight
  const svgTime = subscriber.get(Value.MAIN_LEFT_ANIME) ? -10000 : (Date.now() - (subscriber.get(Value.SVG_START_TIME) as number)) / 1000
  
  useEffect(() => {
    subscriber.set(Value.MAIN_LEFT_ANIME, true)
    
    return () => {
      subscriber.set(Value.MAIN_LEFT_ANIME, false)
    }
  }, [])

  const items:Array<{
    pic?: string,
    count?: number,
    name: string,
    status: string,
    size: number
  }> = props.sources.map((item) => {
    return {
      pic: item.pic,
      name: item.name,
      status: item.status,
      size: item.size
    }
  })
  
  if (props.extraSource > 0) {
    items.push({
      name: 'Date Sources',
      count: props.extraSource,
      status: 'normal',
      size: 0
    })
  }
  
  subscriber.broadcast(Event.UPDATE_LINE_TARGET, items.map((_item, index) => `ml_${index}`))

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
        <rect
          width={CL.lineWidth + 12}
          height={height + 40}
          fill="url(#svg_pt_lg_left_mask)"
          x={CL.lineStartPosition - 12}
          y={height * -0.5 - 40}
        />
      </mask>
    </defs>
    {
      items.map((item, i) => {
        return <g
          className='left-item'
          opacity="0"
          transform={`translate(-20, ${CL.height * (i - (items.length - 1) * 0.5)})`}
          key={i}
          onClick={() => subscriber.broadcast(Event.DIG, ['main', 'dataInventory'])}
        >
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur={`${CL.anime.itemsOpacityDuration}s`}
            begin={`${svgTime + CLAI(i)}s`}
            fill="freeze"
          />
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            from={`-20,${CL.height * (i - (items.length - 1) * 0.5)}`}
            to={`0,${CL.height * (i - (items.length - 1) * 0.5)}`}
            dur={`${CL.anime.itemsMoveDuration}s`}
            begin={`${svgTime + CLAI(i)}s`}
            fill="freeze"
          />
          {
            item.pic ? <image
              href={item.pic}
              width={CL.iconMaxWidth}
              height={CL.iconMaxHeight}
              x={0}
              y={CL.iconMaxHeight * -0.5}
            /> : ''
          }
          {
            item.count ? <text
              x={CL.iconMaxWidth * 0.5 - 20}
              {...CL.nameAttr as React.SVGProps<SVGTextElement>}
              fontSize={22}
            >
              +{ item.count }
            </text> : ''
          }
          <text
            x={CL.nameStartPosition}
            {...CL.nameAttr as React.SVGProps<SVGTextElement>}
          >
            { textLengthLimit(item.name, CL.nameAttr.fontSize, 106, 6) }
          </text>
        </g>
      })
    }
    <g className="line-group" mask="url(#svg_pt_mask_left_line)">
      {
        items.map((item, i) => {
          const size = formatNumberTo4SignificantDigits(item.size, byteUnits)
          const sizeNum = parseFloat(size)
          const sizeUnit = size.replace(`${sizeNum}`, '') + 'B/24H'
          return <g className="left-line" key={`line_${i}`}>
            <g className="traffic" transform={`translate(${CL.lineStartPosition}, ${CL.height * (i - (items.length - 1) * 0.5)})`}>
              <text
                fontSize="12"
                x={20}
                y={-30}
                dominantBaseline="middle"
                textAnchor="start"
              >
                <tspan fill="#fff">{ sizeNum }</tspan>
                <tspan dx="3" fill="#C5C5C5">{ sizeUnit }</tspan>
              </text>
              <circle
                cx={28}
                cy={0}
                r="2"
                fill="#fff"
              />
              <circle
                cx={28}
                cy={0}
                r="4"
                stroke="#fff"
                strokeWidth="0.8"
                fill="none"
              />
              <line
                x1={28}
                y1={-4}
                x2={28}
                y2={-20}
                stroke="#fff"
                strokeWidth="2"
              />
            </g>
            {
              item.status === 'danger' ? <>
                <GlowBezier
                  k={`ml_${i}`}
                  start={{ x: CL.lineStartPosition, y: CL.height * (i - (items.length - 1) * 0.5) }}
                  end={{ x: CL.lineStartPosition + CL.lineWidth, y: CL.lineEndHeight * (i - (items.length - 1) * 0.5) }}
                  extendS={0.4 * CL.lineWidth}
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
                  startAnimeBegin={`${svgTime + 0.1 * i + 0.8}s`}
                  anime={Event.LINE_ANIME}
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
                    begin={`${svgTime + 0.1 * i + 0.8}s`}
                    repeatCount="1"
                    fill="freeze"
                  />
                </circle>
              </> : <>
                <GlowBezier
                  k={`ml_${i}`}
                  start={{ x: CL.lineStartPosition, y: CL.height * (i - (items.length - 1) * 0.5) }}
                  end={{ x: CL.lineStartPosition + CL.lineWidth, y: CL.lineEndHeight * (i - (items.length - 1) * 0.5) }}
                  extendS={0.4 * CL.lineWidth}
                  extendE={0.1 * CL.lineWidth}
                  bezier={[0.2 * CL.lineWidth, 0, 0.2 * CL.lineWidth, 0]}
                  styleAttr={{
                    outerLine: CL.outerLineAttr as React.SVGProps<SVGPathElement>,
                    innerLine: Object.assign({}, CL.innerLineAttr)  as React.SVGProps<SVGPathElement>,
                    flowLine: CL.flowLineAttr as React.SVGProps<SVGPathElement>
                  }}
                  startAnimeBegin={`${svgTime + CL.anime.lineBegin(i)}s`}
                  anime={Event.LINE_ANIME}
                />
                {
                  item.count ? <>
                    <GlowBezier
                      k={`ml_${i}`}
                      start={{ x: CL.lineStartPosition, y: CL.height * (i - (items.length - 1) * 0.5) - 2 }}
                      end={{ x: CL.lineStartPosition + CL.lineWidth, y: CL.lineEndHeight * (i - (items.length - 1) * 0.5) }}
                      extendS={0.4 * CL.lineWidth}
                      extendE={0.1 * CL.lineWidth}
                      bezier={[0.2 * CL.lineWidth, 0, 0.2 * CL.lineWidth, 0]}
                      styleAttr={{
                        innerLine: Object.assign({}, CL.innerLineAttr)  as React.SVGProps<SVGPathElement>,
                        flowLine: CL.flowLineAttr as React.SVGProps<SVGPathElement>
                      }}
                      startAnimeBegin={`${svgTime + CL.anime.lineBegin(i)}s`}
                      anime={Event.LINE_ANIME}
                    />
                    <GlowBezier
                      k={`ml_${i}`}
                      start={{ x: CL.lineStartPosition, y: CL.height * (i - (items.length - 1) * 0.5) + 2 }}
                      end={{ x: CL.lineStartPosition + CL.lineWidth, y: CL.lineEndHeight * (i - (items.length - 1) * 0.5) }}
                      extendS={0.4 * CL.lineWidth}
                      extendE={0.1 * CL.lineWidth}
                      bezier={[0.2 * CL.lineWidth, 0, 0.2 * CL.lineWidth, 0]}
                      styleAttr={{
                        innerLine: Object.assign({}, CL.innerLineAttr)  as React.SVGProps<SVGPathElement>,
                        flowLine: CL.flowLineAttr as React.SVGProps<SVGPathElement>
                      }}
                      startAnimeBegin={`${svgTime + CL.anime.lineBegin(i)}s`}
                      anime={Event.LINE_ANIME}
                    />
                  </> : ''
                }
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
                    dur={`${CL.anime.lineStartDuration}s`}
                    begin={`${svgTime + CL.anime.lineBegin(i)}s`}
                    repeatCount="1"
                    fill="freeze"
                  />
                </circle>
              </>
            }
          </g>
        })
      }
    </g> 
  </g>
}

export default LeftComp 