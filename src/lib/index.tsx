// import { useRef, useEffect } from 'react'
import './index.scss'
import DC from './defaultConfig'
import CenterComp from './comps/CenterComp'
 
function Main() {
  const DCGSize = DC.global.size
  const CCOC = DC.center.bgOuterCircle

  const centerProps = {
    bgStatusColor: '#01FEF7',
    points: [],
    leftColumn: {
      label: 'ISSUES',
      count: 999
    },
    rightColumn: {
      label: 'CASES',
      count: 999
    }
  }

  return <>
    <div className="diagram-container">
      <svg
        width="100%"
        height="100%"
        viewBox={`${DCGSize.width * -0.5} ${DCGSize.height * -0.5} ${DCGSize.width} ${DCGSize.height}`}
      >
        <defs>
          <linearGradient
            id="svg_pt_lg_centerCircleMask"
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="1"
          >
            <stop offset="19.6%" stopColor="#fff" stopOpacity="1" />
            <stop offset="28%" stopColor="#fff" stopOpacity="0" />
            <stop offset="72%" stopColor="#fff" stopOpacity="0" />
            <stop offset="80.4%" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask
            // 用于给中央圈制造渐变剔除效果的遮罩层
            id="svg_pt_centerCircleMask"
          >
            <rect
              fill="url(#svg_pt_lg_centerCircleMask)"
              x={-CCOC.r * 1.4 - CCOC.width * 0.5}
              y={-CCOC.r * 1.4 - CCOC.width * 0.5}
              width={CCOC.r * 2.8 + CCOC.width}
              height={CCOC.r * 2.8 + CCOC.width}
            />
          </mask>
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
        <CenterComp
          props={centerProps}
        />
      </svg>
    </div>
  </>
}

export default Main