import { useEffect, useState, useRef } from 'react'
import './index.scss'
import DC from './defaultConfig'
import MainLeftComp from './comps/MainLeftComp'
import MainCenterComp from './comps/MainCenterComp'
import MainRightComp from './comps/MainRightComp'
import LeftLeftComp from './comps/LeftLeftComp'
import LeftRightComp from './comps/LeftRightComp'
import { RandomLeftFlowline } from './animation'
import { CSSTransition } from 'react-transition-group'
import { subscriber, Event, Value } from './utils/Subscriber'
 
function Main({ data }:{ data: Record<string, any> }) {
  const DCGSize = DC.global.size
  const [digTree, setDigTree] = useState(['main']) //, 'dataInventory'
  const mainRef = useRef<SVGGElement>(null)
  const mainLeftRef = useRef<SVGGElement>(null)
  if (!subscriber.get(Value.SVG_START_TIME)) subscriber.set(Value.SVG_START_TIME, Date.now())

  const dig = (dt:Array<string>) => {
    setDigTree(dt)
  }

  useEffect(() => {
    console.log('挂载')

    const rlfl = new RandomLeftFlowline({
      targetNumber: data.left.sources.length + 1,
      duration: 3000,
      frequency: 0.8,
      parallelLimit: 4
    })
    subscriber.listen(Event.DIG, dig)
    
    // setTimeout(() => {
    //   dig(['main'])
    // }, 5000)

    return () => {
      console.log('卸载')
      subscriber.clear()
      rlfl.destroy()
    }
  }, [])

  return <>
    <div className="diagram-container">
      <svg
        width="100%"
        height="100%"
        viewBox={`${DCGSize.width * -0.5 - DCGSize.hp} ${DCGSize.height * -0.5 - DCGSize.vp} ${DCGSize.width + DCGSize.hp * 2} ${DCGSize.height + DCGSize.vp * 2}`}
        // viewBox="-680 150 200 150"
        style={{
          animationDuration: `${DC.global.anime.duration}s`,
          animationDelay: `${DC.global.anime.delay}s`
        }}
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
         {/* <filter id="basicGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur"/>
            
            <feFlood floodColor="#008FFF" floodOpacity="1" result="glowColor"/>
            
            <feComposite in="glowColor" in2="blur" operator="in" result="coloredBlur"/>
            
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter> */}
          <linearGradient id="svg_pt_csn_mask_lg" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#fff " stopOpacity="0" />
            <stop offset="16.7%" stopColor="#fff" stopOpacity="1" />
            <stop offset="83.3%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff " stopOpacity="0" />
          </linearGradient>
          <mask
            id="svg_pt_csn_mask"
            maskUnits="userSpaceOnUse"
            x="-13"
            y="-30"
            width="26"
            height="60"
          >
            <rect
              x="-13"
            y="-30"
            width="26"
            height="60"
              fill="url(#svg_pt_csn_mask_lg)"
            />
          </mask>
        </defs>
        {/* 首页组件 */}
        {
          <CSSTransition
            in={digTree.join('-') === 'main'}
            timeout={1000}
            nodeRef={mainRef as any}
            classNames="fade"
            unmountOnExit={true}
          >
          {/* digTree.join('') === 'main' ? */}
            <g className="main" ref={mainRef}>
              <MainLeftComp
                props={data.left}
              />
              <MainRightComp
                props={data.right}
              />
              <MainCenterComp
                props={data.center}
              />
            </g>
             {/* : '' */}
          </CSSTransition>
        }
        {
          <CSSTransition
            in={digTree.join('-') === 'main-dataInventory'}
            timeout={1000}
            nodeRef={mainLeftRef as any}
            classNames="fadeleft"
            unmountOnExit={true}
          >
          {/* digTree.join('') === 'mainleft' ? */}
            <g className="data-inventory" ref={mainLeftRef}>
              <LeftRightComp
              />
              <LeftLeftComp
                props={data.left}
              />
            </g>
             {/* : '' */}
          </CSSTransition>
        }
      </svg>
    </div>
  </>
}

export default Main  