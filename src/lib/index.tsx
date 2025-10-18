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
          <linearGradient id="svg_pt_comp_node_lg_1" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#008FFF " stopOpacity="1" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="75%" stopColor="#00DEFE" stopOpacity="1" />
            <stop offset="100%" stopColor="#008FFF " stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_comp_node_lg_2" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#00DEFE " stopOpacity="1" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="75%" stopColor="#00DEFE" stopOpacity="1" />
          </linearGradient>
         <filter id="basicGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur"/>
            
            {/* <feFlood flood-color="#01FEF7" flood-opacity="0.8" result="glowColor"/> */}
            <feFlood floodColor="#008FFF" floodOpacity="1" result="glowColor"/>
            
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
        <RightComp
          props={data.right}
        />
        <CenterComp
          props={data.center}
        />
      </svg>
    </div>
  </>
}

export default Main  