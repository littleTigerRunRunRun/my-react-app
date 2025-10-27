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
      animationDuration: `${DC.center.anime.duration}s`,
      animationDelay: `${DC.center.anime.delay}s`
    }}
  >
    <defs>
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
    {/* <rect 
      x="-80"
      y="-50"
      width="160"
      height="100"
      fill="rgba(255, 255, 255, 0.4)"
    /> */}
    <LabelCount 
      count={props.alerts}
      labels={['Alerts']}
      labelAttr={CC.label as React.SVGProps<SVGTextElement>}
      countAttr={CC.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CC.alertsPosition}, ${CC.size.height * 0.5})`}
      clipPath="url(#svg_pt_ctext_cp)"
    />
    <LabelCount 
      count={props.incidents}
      labels={['Incidents']}
      labelAttr={CC.label as React.SVGProps<SVGTextElement>}
      countAttr={CC.count as React.SVGProps<SVGTextElement>}
      transform={`translate(${CC.incidentsPosition}, ${CC.size.height * 0.5})`}
      clipPath="url(#svg_pt_ctext_cp)"
    />
  </g>
}

export default CenterComp