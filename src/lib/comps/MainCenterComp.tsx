import React, { useRef } from 'react'
import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import { getGreeting, formatNumberTo4SignificantDigits } from '../utils'
import pic_cl from '../../assets/center_left.png'
// import pic_cm from '../../assets/center_main.png'
import pic_cr from '../../assets/center_right.png'
import video_cm from '../../assets/center.mp4'
import pic_data from '../../assets/data.png'
import pic_event from '../../assets/event.png'
import pic_alert from '../../assets/alert.png'
import pic_prevented from '../../assets/prevented.png'

const byteUnits = [
  { threshold: 1024 * 1024 * 1024 * 1024, unit: 'T' },
  { threshold: 1024 * 1024 * 1024, unit: 'G' },
  { threshold: 1024 * 1024, unit: 'M' },
  { threshold: 1024, unit: 'K' }
]

const CenterComp = React.memo(function CenterComp({ props }:{
  props: {
    alerts: number,
    rules: number,
    incidents: number,
    userName: string,
    day: number,
    dataIngestion: number,
    eventIngestion: number,
    alertAnalysis: number,
    preventedAlerts: number
  }
}) {
  const CC = DC.center
  const videoRef = useRef<HTMLVideoElement>(null);
  setTimeout(() => {
    if (videoRef.current) videoRef.current.play()
  }, CC.anime.videoPlayDelay)

  let dataNum
  let dataUnit
  if (props) {
    const formatedData = formatNumberTo4SignificantDigits(props.dataIngestion, byteUnits)
    dataNum = parseFloat(formatedData)
    dataUnit = formatedData.replace(`${dataNum}`, '') + 'B/24H'
  } else {
    dataNum = '--'
    dataUnit = 'B/24H'
  }

  let eventNum
  let eventUnit
  if (props) {
    const formatedEvent = formatNumberTo4SignificantDigits(props.eventIngestion, byteUnits)
    eventNum = parseFloat(formatedEvent)
    eventUnit = formatedEvent.replace(`${eventNum}`, '') + '/24H'
  } else {
    eventNum = '--'
    eventUnit = '/24H'
  }

  let preventedNum
  let preventedUnit
  if (props) {
    const formatedPrevented = formatNumberTo4SignificantDigits(props.preventedAlerts)
    preventedNum = parseFloat(formatedPrevented)
    preventedUnit = formatedPrevented.replace(`${preventedNum}`, '')
  } else {
    preventedNum = '--'
    preventedUnit = ''
  }

  return <g
    className="center-comp"
    style={{
      animationDuration: `${DC.center.anime.duration}s`,
      animationDelay: `${DC.center.anime.delay}s`
    }}
  >
    <defs>
      <linearGradient id="svg_pt_mc_icon_bg_lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#17171A " stopOpacity="1" />
        <stop offset="100%" stopColor="#2E2E30 " stopOpacity="1" />
      </linearGradient>
      <linearGradient id="svg_pt_mc_interval_bg_lg" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#fff " stopOpacity="0" />
        <stop offset="50%" stopColor="#fff " stopOpacity="1" />
        <stop offset="100%" stopColor="#fff " stopOpacity="0" />
      </linearGradient>
      <clipPath
        id="svg_pt_ctext_cp"
        clipPathUnits="userSpaceOnUse"
        x="-80"
        y="-50"
        width="160"
        height="100"
      >
        <rect 
          x="-80"
          y="-50"
          width="160"
          height="100"
        />
      </clipPath>
      <filter id="svg_pt_mc_text_glow" x="-100%" y="-100%" width="400%" height="400%">

        <feFlood floodColor="#000" floodOpacity="1" result="glowColor"/>
        <feComposite in="glowColor" in2="SourceAlpha" operator="atop" result="colorResult"/>
        <feMorphology in="colorResult" operator="dilate" radius="4" result="extendResult" />
        <feGaussianBlur in="extendResult" stdDeviation="6" result="blurResult"/>
        
        <feMerge>
          <feMergeNode in="blurResult"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g transform={`translate(${CC.position.x + CC.size.width * -0.5}, ${CC.position.y + CC.size.height * -0.5})`}>
      <foreignObject
        x={CC.size.width * 0.5 - 270}
        y={CC.size.height * 0.5 - 270}
        width="540"
        height="540"
        >
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            muted
            loop
          >
          <source src={video_cm} type="video/mp4" />
        </video>
      </foreignObject>
      <image
        href={pic_cl}
        x={0}
        y={CC.size.height * 0.5 - 70}
        width="216"
        height="220"
      />
      <image
        href={pic_cr}
        x={CC.size.width - 176}
        y={CC.size.height * 0.5 - 70}
        width="176"
        height="140"
      />
      {/* <rect 
        x="-80"
        y="-50"
        width="160"
        height="100"
        fill="rgba(255, 255, 255, 0.4)"
      /> */}
      <LabelCount 
        count={props ? props.alerts : undefined}
        labels={['Alerts']}
        labelAttr={CC.label as React.SVGProps<SVGTextElement>}
        countAttr={CC.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CC.alertsPosition}, ${CC.size.height * 0.5})`}
        clipPath="url(#svg_pt_ctext_cp)"
      />
      <text
        fill="#FFFFFF"
        fontSize="16"
        x="63"
        y="426"
        filter="url(#svg_pt_mc_text_glow)"
      >
        <tspan>{props ? props.rules : '--'}</tspan>
        <tspan dx="5" fill="#929293">Rules</tspan>
      </text>
      <LabelCount 
        count={props ? props.incidents : undefined}
        labels={['Incidents']}
        labelAttr={CC.label as React.SVGProps<SVGTextElement>}
        countAttr={CC.count as React.SVGProps<SVGTextElement>}
        transform={`translate(${CC.incidentsPosition}, ${CC.size.height * 0.5})`}
        clipPath="url(#svg_pt_ctext_cp)"
      />
    </g>
    <text
      {...DC.global.textAttr.mainTitle as React.SVGProps<SVGTextElement>}
    >
      {getGreeting()}{props ? (', ' + props.userName) : ''}!
    </text>
    <text
      {...DC.global.textAttr.mainSubtitle as React.SVGProps<SVGTextElement>}
    >
      At your service for {props ? props.day : '--'} days.
    </text>
    <g className="bottom-info" transform="translate(-757, 344)">
      <rect
        width="40"
        height="40"
        rx="4"
        stroke="#484849"
        strokeWidth="1"
        fill="svg_pt_mc_icon_bg_lg"
      />
      <image
        href={pic_data}
        width="22.5"
        height="24"
        x="9"
        y="8"
      />
      <text
        fill="#C5C5C5"
        fontSize="20"
        dominantBaseline="middle"
        textAnchor="start"
        x="60"
        y="20"
      >Data Ingestion</text>
      <text
        fill="#ffffff"
        fontSize="36"
        dominantBaseline="alphabetic"
        textAnchor="start"
        x="60"
        y="86"
      >
        <tspan>{dataNum}</tspan>
        <tspan fill="#C5C5C5" fontSize="16" dx="6">{dataUnit}</tspan>
      </text>
    </g>
    <rect x="-404" y="344" width="2" height="91" fill="url(#svg_pt_mc_interval_bg_lg)" />
    <g className="bottom-info" transform="translate(-364, 344)">
      <rect
        width="40"
        height="40"
        rx="4"
        stroke="#484849"
        strokeWidth="1"
        fill="svg_pt_mc_icon_bg_lg"
      />
      <image
        href={pic_event}
        width="22.5"
        height="24"
        x="9"
        y="8"
      />
      <text
        fill="#C5C5C5"
        fontSize="20"
        dominantBaseline="middle"
        textAnchor="start"
        x="60"
        y="20"
      >Event Ingestion</text>
      <text
        fill="#ffffff"
        fontSize="36"
        dominantBaseline="alphabetic"
        textAnchor="start"
        x="60"
        y="86"
      >
        <tspan>{eventNum}</tspan>
        <tspan fill="#C5C5C5" fontSize="16" dx="6">{eventUnit}</tspan>
      </text>
    </g>
    <rect x="-10" y="344" width="2" height="91" fill="url(#svg_pt_mc_interval_bg_lg)" />
    <g className="bottom-info" transform="translate(30, 344)">
      <rect
        width="40"
        height="40"
        rx="4"
        stroke="#484849"
        strokeWidth="1"
        fill="svg_pt_mc_icon_bg_lg"
      />
      <image
        href={pic_alert}
        width="22.5"
        height="24"
        x="9"
        y="8"
      />
      <text
        fill="#C5C5C5"
        fontSize="20"
        dominantBaseline="middle"
        textAnchor="start"
        x="60"
        y="20"
      >Alert Analysis Coverage</text>
      <text
        fill="#ffffff"
        fontSize="36"
        dominantBaseline="alphabetic"
        textAnchor="start"
        x="60"
        y="86"
      >
        <tspan>{props ? props.alertAnalysis : '--'}</tspan>
        <tspan fill="#C5C5C5" fontSize="16" dx="6">%</tspan>
      </text>
    </g>
    <rect x="383" y="344" width="2" height="91" fill="url(#svg_pt_mc_interval_bg_lg)" />
    <g className="bottom-info" transform="translate(423, 344)">
      <rect
        width="40"
        height="40"
        rx="4"
        stroke="#484849"
        strokeWidth="1"
        fill="svg_pt_mc_icon_bg_lg"
      />
      <image
        href={pic_prevented}
        width="22.5"
        height="24"
        x="9"
        y="8"
      />
      <text
        fill="#C5C5C5"
        fontSize="20"
        dominantBaseline="middle"
        textAnchor="start"
        x="60"
        y="20"
      >Prevented Alerts</text>
      <text
        fill="#ffffff"
        fontSize="36"
        dominantBaseline="alphabetic"
        textAnchor="start"
        x="60"
        y="86"
      >
        <tspan>{preventedNum}</tspan>
        <tspan fill="#C5C5C5" fontSize="16" dx="6">{preventedUnit}</tspan>
      </text>
    </g>
  </g>
})

export default CenterComp