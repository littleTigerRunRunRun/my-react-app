import { useEffect } from 'react'
import './index.scss'
import DC from './defaultConfig'
import LeftComp from './comps/LeftComp'
import CenterComp from './comps/CenterComp'
import RightComp from './comps/RightComp'
import './animation'
 
function Main({ data }:{ data: Record<string, any> }) {
  const DCGSize = DC.global.size

  useEffect(() => {
    console.log('挂载')

    return () => {
      console.log('卸载')
    }
  }, [])

  return <>
    <div className="diagram-container">
      <svg
        width="100%"
        height="100%"
        viewBox={`${DCGSize.width * -0.5 - DCGSize.hp} ${DCGSize.height * -0.5 - DCGSize.vp} ${DCGSize.width + DCGSize.hp * 2} ${DCGSize.height + DCGSize.vp * 2}`}
      >
        <defs>
          <linearGradient id="svg_pt_lg_centerCircleMask" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="19.6%" stopColor="#fff" stopOpacity="1" />
            <stop offset="28%" stopColor="#fff" stopOpacity="0" />
            <stop offset="72%" stopColor="#fff" stopOpacity="0" />
            <stop offset="80.4%" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_rightAutomated" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#01FEF7" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#01FEF7" stopOpacity="0.6" />
            <stop offset="90%" stopColor="#D6E9FE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D6E9FE" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_rightManual" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#97ACBD" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#97ACBD" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#D6E9FE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D6E9FE" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_right_critical" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#D6E9FE" stopOpacity="1" />
            <stop offset="40%" stopColor="#D6E9FE" stopOpacity="1" />
            <stop offset="80%" stopColor="#8A0207" stopOpacity="1" />
            <stop offset="100%" stopColor="#8A0207" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_right_high" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#D6E9FE" stopOpacity="1" />
            <stop offset="40%" stopColor="#D6E9FE" stopOpacity="1" />
            <stop offset="80%" stopColor="#CD3737" stopOpacity="1" />
            <stop offset="100%" stopColor="#CD3737" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_right_middle" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#D6E9FE" stopOpacity="1" />
            <stop offset="40%" stopColor="#D6E9FE" stopOpacity="1" />
            <stop offset="80%" stopColor="#EB9600" stopOpacity="1" />
            <stop offset="100%" stopColor="#EB9600" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_right_low" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#D6E9FE" stopOpacity="1" />
            <stop offset="40%" stopColor="#D6E9FE" stopOpacity="1" />
            <stop offset="80%" stopColor="#0F8CF0" stopOpacity="1" />
            <stop offset="100%" stopColor="#0F8CF0" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="svg_pt_rg_dangerPoint" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FE191E" stopOpacity="1" />
            <stop offset="65%" stopColor="#FE191E" stopOpacity="0.9" />
            <stop offset="68%" stopColor="#FE191E" stopOpacity="0.2" />
            <stop offset="77%" stopColor="#FE191E" stopOpacity="0.2" />
            <stop offset="80%" stopColor="#FE191E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FE191E" stopOpacity="0.5" />
          </radialGradient>
         <filter id="basicGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
            
            {/* <feFlood flood-color="#01FEF7" flood-opacity="0.8" result="glowColor"/> */}
            <feFlood floodColor="#fff" floodOpacity="1" result="glowColor"/>
            
            <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur"/>
            
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <LeftComp
          props={data.left}
        />
        <CenterComp
          props={data.center}
        />
        <RightComp
          props={data.right}
        />
      </svg>
    </div>
  </>
}

export default Main  