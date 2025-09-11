// import { useRef, useEffect } from 'react'
import './index.scss'
import DC from './defaultConfig'
import LeftComp from './comps/LeftComp'
import CenterComp from './comps/CenterComp'
import pic1 from '../assets/automatenspieler.png'
import pic2 from '../assets/devexpress.png'
import pic3 from '../assets/famoid.png'
import pic5 from '../assets/laravel.png'
import pic6 from '../assets/leofame.png'
 
function Main() {
  const DCGSize = DC.global.size
  const CCOC = DC.center.bgOuterCircle

  const leftProps = {
    endpoints: 41732, // 需要自行转成k、m单位
    dataSources: 68,
    sources: [
      { pic: pic1, status: 'safe', width: 78, height: 32 },
      { pic: pic2, status: 'safe', width: 192, height: 32 },
      { pic: pic3, status: 'safe', width: 32, height: 32 },
      { pic: pic5, status: 'safe', width: 109, height: 32 },
      { pic: pic5, status: 'danger', width: 109, height: 32 },
      { pic: pic6, status: 'safe', width: 120, height: 32 },
      { pic: pic3, status: 'safe', width: 32, height: 32 }
    ]
  }

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
        viewBox={`${DCGSize.width * -0.5 - DCGSize.hp} ${DCGSize.height * -0.5 - DCGSize.vp} ${DCGSize.width + DCGSize.hp * 2} ${DCGSize.height + DCGSize.vp * 2}`}
      >
        <defs>
          <linearGradient id="svg_pt_lg_centerCircleMask" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="19.6%" stopColor="#fff" stopOpacity="1" />
            <stop offset="28%" stopColor="#fff" stopOpacity="0" />
            <stop offset="72%" stopColor="#fff" stopOpacity="0" />
            <stop offset="80.4%" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_leftMask" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="94%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="svg_pt_rg_dangerPoint" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FE191E" stopOpacity="1" />
            <stop offset="65%" stopColor="#FE191E" stopOpacity="0.9" />
            <stop offset="68%" stopColor="#FE191E" stopOpacity="0.2" />
            <stop offset="77%" stopColor="#FE191E" stopOpacity="0.2" />
            <stop offset="80%" stopColor="#FE191E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FE191E" stopOpacity="0.5" />
          </radialGradient>
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
          <mask
            // 用于给中央圈制造渐变剔除效果的遮罩层
            id="svg_pt_leftMask"
          >
            <rect
              fill="url(#svg_pt_lg_leftMask)"
              x={-500}
              y={DC.left.size.height * -0.5}
              width={DC.left.source.width + 500}
              height={DC.left.size.height}
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
        <LeftComp
          props={leftProps}
        />
        <CenterComp
          props={centerProps}
        />
      </svg>
    </div>
  </>
}

export default Main