import DC from '../defaultConfig'
import { Event, Value, subscriber } from '../utils/Subscriber'
import LabelCount from './comp/LabelCount'
import video_fl from '../../assets/flowlines.mp4'
import pic_back from '../../assets/back.png'
import { useRef } from 'react'
import { getTextWidth } from '../utils'

function LeftRightComp({ props, center }: { props: {
  keywords: Array<Array<string>>,
  ruleHealthPercent: number,
  dangerRate: number,
  optimized: number,
  optimizedRate: number,
  recommendations: number
}, center: {
  alerts: number,
  rules: number,
  incidents: number,
  userName: string,
  day: number
}}) {
  const CLR = DC.leftRight
  const radiationNums = 200
  const radiations = []
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const svgTime = (Date.now() - (subscriber.get(Value.SVG_START_TIME) as number)) / 1000

  for (let i = 0; i < radiationNums; i++) {
    if (i / radiationNums < props.dangerRate) radiations.push(0)
    else radiations.push(1)
  }
  
  setTimeout(() => {
    if (videoRef1.current) videoRef1.current.play()
    if (videoRef2.current) videoRef2.current.play()
  }, 1000)

  return <g
    className="left-right-comp"
    opacity="0"
  >
    <defs>
      <linearGradient id="svg_pt_lr_ir_lg" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#ffffff " stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="svg_pt_lr_mr_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#0089F5" stopOpacity="1" />
        <stop offset="18%" stopColor="#0089F5" stopOpacity="0" />
        <stop offset="82%" stopColor="#00D5F5" stopOpacity="0" />
        <stop offset="100%" stopColor="#00D5F5" stopOpacity="1" />
      </linearGradient>
      <radialGradient id="svg_pt_lr_rm_rg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="68%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="svg_pt_lr_radar_lg" x1="0" y1="0.15" x2="0.85" y2="1">
        <stop offset="40%" stopColor="#008FFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#008FFF" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="svg_pt_lr_radar_start_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#008FFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#008FFF" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="svg_pt_lr_radar_circle_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="90%" stopColor="#008FFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#008FFF" stopOpacity="0.9" />
      </linearGradient>
      <mask id="svg_pt_lr_radiation_mask">
        <circle
          r={CLR.outerEndRadius}
          fill="url(#svg_pt_lr_rm_rg)"
        />
      </mask>
    </defs>
    <animate
      attributeName="opacity"
      from="0"
      to="1"
      dur={`${CLR.anime.fadeInDuration}s`}
      begin={`${svgTime + CLR.anime.fadeInDelay}s`}
      repeatCount="1"
      fill="freeze"
    />
    <g transform={`translate(${CLR.size.width * 0.5}, 0)`}>
      <foreignObject
        x={CLR.size.width * -0.5 - 100}
        y={-39}
        width="200"
        height="78"
      >
        <video
          ref={videoRef1}
          width="100%"
          height="100%"
          muted
          loop
        >
        <source src={video_fl} type="video/mp4" />
        </video>
      </foreignObject>
      <foreignObject
        x={CLR.size.width * 0.5 - 100}
        y={-39}
        width="200"
        height="78"
      >
        <video
          ref={videoRef2}
          width="100%"
          height="100%"
          muted
          loop
        >
        <source src={video_fl} type="video/mp4" />
        </video>
      </foreignObject>
      <g className="innerCircle">
        <circle
          r={CLR.innerRadius}
          stroke="url(#svg_pt_lr_ir_lg)"
          strokeWidth="2"
          fill="none"
        />
        <circle
          r={CLR.mediumRadius}
          stroke="url(#svg_pt_lr_mr_lg)"
          strokeWidth="4"
          fill="none"
        />
        <g className="radiation-lines" mask="url(#svg_pt_lr_radiation_mask)">
          {
            radiations.map((radia, index) => {
              return <line
                key={`line_${index}`}
                x1={CLR.outerStartRadius}
                y1="0"
                x2={CLR.outerEndRadius}
                y2="0"
                stroke={radia ? "#0089F5" : "#F54E4E"}
                strokeWidth="1"
                strokeOpacity="0.5"
                transform={`rotate(${index / radiationNums * 360} 0, 0)`}
              />
            })
          }
        </g>
        <text
          {...CLR.textAttr.percentNumber as React.SVGProps<SVGTextElement>}
        >{props.ruleHealthPercent}</text>
        <text
          {...CLR.textAttr.percent as React.SVGProps<SVGTextElement>}
        >%</text>
        <text
          {...CLR.textAttr.name as React.SVGProps<SVGTextElement>}
        >Rule Health</text>
        <text
          {...CLR.textAttr.num as React.SVGProps<SVGTextElement>}
        >{center.rules} Rules</text>
      </g>
      <g className="anime-effect-layer">
        <g className="radar">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from={`0 0 0`}
            to={`360 0 0`}
            dur="4s"
            begin={`${svgTime}s`}
            fill="freeze"
            repeatCount="indefinite"
          />
          <circle
            r={CLR.innerRadius}
            stroke="url(#svg_pt_lr_radar_circle_lg)"
            strokeWidth="2"
            fill="none"
          />
          <path
            fill="url(#svg_pt_lr_radar_lg)"
            d={`
              M0,${-CLR.innerRadius}
              L0,${-CLR.mediumRadius}
              A${CLR.mediumRadius},${CLR.mediumRadius} 0 0 1 ${CLR.mediumRadius},0 
              L${CLR.innerRadius},0 
              A${CLR.innerRadius},${CLR.innerRadius} 1 0 0 0,${-CLR.innerRadius}
              Z
            `}
          >
          </path>
          <rect
            fill="url(#svg_pt_lr_radar_start_lg)"
            x={CLR.innerRadius}
            y="-1"
            width={CLR.mediumRadius - CLR.innerRadius}
            height="2"
          />
        </g>
        {
          props.keywords.map((_kw, index) => {
            const angle = index * Math.PI * 2 / props.keywords.length
            const x = Math.sin(angle) * CLR.outerStartRadius
            const y = -Math.cos(angle) * CLR.outerStartRadius
            return <circle
              key={`kw_${index}`}
              className="keyword-glow"
              cx={x}
              cy={y}
              r={CLR.keywordRadius}
              fill="#000"
              stroke="#008FFF"
              strokeWidth="1"
              style={{
                animationDelay: `${index * 4 / props.keywords.length - 2.5}s`
              }}
            />
          })
        }
      </g>
      {
        props.keywords.map((kw, index) => {
          const angle = index * Math.PI * 2 / props.keywords.length
          const x = Math.sin(angle) * CLR.outerStartRadius
          const y = -Math.cos(angle) * CLR.outerStartRadius

          // 最大size是64
          const size = kw.length === 1 ? CLR.textAttr.keywordOneLine.fontSize : CLR.textAttr.keywordTwoLine.fontSize
          const kwMaxLength = kw.map((w) => getTextWidth(w, CLR.textAttr.keywordOneLine.fontFamily, size)).sort((a, b) => b - a)[0]
          const kwSize = kwMaxLength > 64 ? size * 64 / kwMaxLength : size

          return <g
            key={`kw_${index}`}
            className="keyword"
            transform={`translate(${x}, ${y})`}
          >
            <circle
              r={CLR.keywordRadius}
              fill="#000"
              stroke="#008FFF"
              strokeWidth="1"
            />
            <text
              {...(kw.length === 1 ? CLR.textAttr.keywordOneLine : CLR.textAttr.keywordTwoLine) as React.SVGProps<SVGTextElement>}
            >
              {
                kw.map((w, windex) => {
                  return <tspan
                    key={`word_${windex}`}
                    {...(kw.length === 2 ? (windex === 0 ? CLR.textAttr.ktlOne : CLR.textAttr.ktlTwo) : {})}
                    fontSize={kwSize}
                  >{ w }</tspan>
                })
              }
            </text>
          </g>
        })
      }
      <LabelCount 
        count={center.alerts}
        labels={['Alerts']}
        labelAttr={DC.center.label as React.SVGProps<SVGTextElement>}
        countAttr={DC.center.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CLR.size.width * -0.5}, 0)`}
        // clipPath="url(#svg_pt_ctext_cp)"
      />
      <LabelCount 
        count={center.incidents}
        labels={['Incidents']}
        labelAttr={DC.center.label as React.SVGProps<SVGTextElement>}
        countAttr={DC.center.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CLR.size.width * 0.5}, 0)`}
        // clipPath="url(#svg_pt_ctext_cp)"
      />
      <g className="suggest">
        <text
          {...CLR.textAttr.suggestion1 as React.SVGProps<SVGTextElement>}
        >
          <tspan>{props.optimized}</tspan>
          <tspan {...CLR.textAttr.suggestionSpan as React.SVGProps<SVGTextElement>}>Rules can be optimized</tspan>
        </text>
        <rect
          x="0"
          y="240"
          width="260"
          height="8"
          fill="rgba(255, 255, 255, 0.15)"
        />
        <rect
          x="0"
          y="240"
          width="0"
          height="8"
          fill="#F54E4E"
        >
          <animate
            attributeName="width"
            from={0}
            to={260 * props.optimizedRate}
            dur={`${CLR.anime.suggestionBarDur}s`}
            begin={`${svgTime + CLR.anime.suggestionBarDelay}s`}
            repeatCount="1"
            fill="freeze"
          />
        </rect>
        <text
          {...CLR.textAttr.suggestion2 as React.SVGProps<SVGTextElement>}
        >By {props.recommendations} recommendations</text>
      </g>
    </g>
    
    <g className="inventory-back">
      <image
        x="-730"
        y="-368"
        href={pic_back}
        width="11"
        height="18"
      />
      <text
        x="-706"
        y="-355"
        fontSize="28"
        fill="#fff"
        dominantBaseline="middle"
        textAnchor="start"
        onClick={() => {
          subscriber.broadcast(Event.DIG, ['main'])
        }}
      >Data Inventory</text>
      <rect
        fill="rgba(0, 0, 0, 0)"
        x="-738"
        y="-377"
        width="246"
        height="41"
        style={{ cursor: 'pointer' }}
        onClick={() => subscriber.broadcast(Event.DIG, ['main'])}
      />
    </g>
    {/* innerRadius: 90,
    mediumRadius: 140,
    outerStartRadius: 154,
    outerEndRadius: 227, */}
    <path
      fill="#fff"
      d={`
        M-250,0
      `}
    />
  </g>
}

export default LeftRightComp 