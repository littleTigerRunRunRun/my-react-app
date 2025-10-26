import { useRef } from 'react'
import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import pic_cl from '../../assets/center_left.png'
import pic_cm from '../../assets/center_main.png'
import pic_cr from '../../assets/center_right.png'
import video_cm from '../../assets/center.mp4'

function CenterComp({ props }:{
  props: {
    alerts: number,
    incidents: number
  }
}) {
  const CC = DC.center
  const videoRef = useRef<HTMLVideoElement>(null);
  setTimeout(() => {
    if (videoRef.current) videoRef.current.play()
  }, CC.anime.videoPlayDelay)

  return <g
    className="center-comp"
    transform={`translate(${CC.position.x + CC.size.width * -0.5}, ${CC.position.y + CC.size.height * -0.5})`}
    style={{
      animationDuration: DC.center.anime.duration,
      animationDelay: DC.center.anime.delay
    }}
  >
    <defs>
      <linearGradient id="svg_pt_csn_mask_lg" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#fff " stopOpacity="0" />
        <stop offset="16.7%" stopColor="#fff" stopOpacity="1" />
        <stop offset="83.3%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff " stopOpacity="0" />
      </linearGradient>
      <mask
        id="svg_pt_csn_mask"
        // maskUnits="userSpaceOnUse"
        // width="25"
        // height="68"
      >
        <rect
          x="-13"
          y="-33"
          width="26"
          height="66"
          fill="url(#svg_pt_csn_mask_lg)"
        />
      </mask>
    </defs>
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
      height="140"
    />
    <image
      href={pic_cr}
      x={CC.size.width - 176}
      y={CC.size.height * 0.5 - 70}
      width="176"
      height="140"
    />
    <LabelCount 
      count={props.alerts}
      labels={['Alerts']}
      labelAttr={CC.label as React.SVGProps<SVGTextElement>}
      countAttr={CC.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CC.alertsPosition}, ${CC.size.height * 0.5})`}
    />
    <LabelCount 
      count={props.incidents}
      labels={['Incidents']}
      labelAttr={CC.label as React.SVGProps<SVGTextElement>}
      countAttr={CC.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CC.incidentsPosition}, ${CC.size.height * 0.5})`}
    />
  </g>
}

export default CenterComp