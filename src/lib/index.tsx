import { useEffect, useState, useRef } from 'react'
import './index.scss'
import DC from './defaultConfig'
import BackComp from './comps/BackComp'
import MainLeftComp from './comps/MainLeftComp'
import MainCenterComp from './comps/MainCenterComp'
import MainRightComp from './comps/MainRightComp'
import LeftLeftComp from './comps/LeftLeftComp'
import LeftRightComp from './comps/LeftRightComp'
import IncidentComp from './comps/IncidentComp'
import { RandomLeftFlowline } from './animation'
import { CSSTransition } from 'react-transition-group'
import { subscriber, Event, Value } from './utils/Subscriber'
// import { useNavigate } from 'react-router-dom'

function Main({
  data,
  onDig
}:{
  data: Record<string, any>,
  onDig?: (digArray: Array<string>) => any
}) {
  const DCGSize = DC.global.size
  const [digArray, setDigArray] = useState(['main']) //, 'dataInventory' 'incident'
  const mainRef = useRef<SVGGElement>(null)
  const dataInventoryRef = useRef<SVGGElement>(null)
  const incidentRef = useRef<SVGGElement>(null)
  if (!subscriber.get(Value.SVG_START_TIME)) {
    subscriber.set(Value.SVG_START_TIME, Date.now())
  }
  // const navigate = useNavigate()

  const [dataInventory, setDataInventory] = useState({
    keywords: [
      ['AI'],
      ['Correlation', 'Analysis'],
      ['IOC'],
      ['Threat', 'Intelligence'],
      ['Machine', 'Learning'],
    ],
    ruleHealthPercent: 98,
    dangerRate: 0.25,
    optimized: 20,
    optimizedRate: 0.2,
    recommendations: 11
  })

  const [incident, setIncident] = useState<any>({
    total: 204,
    trend: new Array(11).fill(0).map(() => Math.round(Math.random())),
    automated: 251,
    manual: 96,
    resolvedIncidents: 112,
    openIncidents: {
      low: 21,
      middle: 36,
      high: 32,
      critical: 3,
    },
    attackList: [
      { num: 3, name: 'Collection', type: ['critical'] },
      { num: 1, name: 'Command and Control', type: ['normal'] },
      { num: 11, name: 'Credential Access', type: ['high'] },
      { num: 1, name: 'Defense Evasion', type: ['middle'] },
      { num: 2, name: 'Discovery', type: ['normal'] },
      { num: 1, name: 'Exeution', type: ['middle'] },
      { num: 0, name: 'Exfiltration', type: ['normal'] },
      { num: 0, name: 'Impact', type: ['normal'] },
      { num: 2, name: 'Initial Access', type: ['high'] },
      { num: 4, name: 'Lateral Movement', type: ['high'] },
      { num: 2, name: 'Persistence', type: ['middle'] },
      { num: 2, name: 'Privilege Escalation', type: ['normal'] },
      { num: 2, name: 'Reconnaissance', type: ['middle'] },
      { num: 4, name: 'Resouce Development', type: ['low', 'middle'] },
    ]
  })

  const dig = async (dt:Array<string>) => {
    if (onDig) {
      const data = await onDig(dt)
      switch (dt.join('-')) {
        case 'main-dataInventory':
          setDataInventory(data)
          break
        case 'main-incident':
          setIncident(data)
          break
      }
    }
    setDigArray(dt)
  }

  useEffect(() => {
    // console.log('挂载')
    subscriber.listen(Event.DIG, dig)
 
    const rlfl = new RandomLeftFlowline({
      duration: 3000,
      frequency: 2,
      parallelLimit: 4
    })
    
    // setTimeout(() => {
    //   dig(['main'])
    // }, 5000)

    return () => {
      // console.log('卸载')
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
          {/* 屏1和屏3共用的线条渐变色 */}
          <linearGradient id="svg_pt_lg_lc_sta">
            <stop offset="0%" stopColor="#0167B6" stopOpacity="0" />
            <stop offset="100%" stopColor="#0167B6" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_lc_stm">
            <stop offset="0%" stopColor="#019DB3" stopOpacity="0" />
            <stop offset="100%" stopColor="#019DB3" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_lc_atr">
            <stop offset="0%" stopColor="#0167B6" stopOpacity="1" />
            <stop offset="100%" stopColor="#008FFF" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_lc_mto">
            <stop offset="0%" stopColor="#019DB3" stopOpacity="1" />
            <stop offset="100%" stopColor="#00DEFE" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_lc_ato_p5">
            <stop offset="0%" stopColor="#0167B6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00DEFE" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_lc_ato">
            <stop offset="0%" stopColor="#0167B6" stopOpacity="1" />
            <stop offset="100%" stopColor="#00DEFE" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_lc_mtr_p5">
            <stop offset="0%" stopColor="#019DB3" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#008FFF" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="svg_pt_lg_lc_mtr">
            <stop offset="0%" stopColor="#019DB3" stopOpacity="1" />
            <stop offset="100%" stopColor="#008FFF" stopOpacity="1" />
          </linearGradient>
          {/* 屏1和屏3共用的线条渐变色 */}
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
            x="-20"
            y="-30"
            width="40"
            height="60"
          >
            <rect
              x="-20"
              y="-30"
              width="40"
              height="60"
              fill="url(#svg_pt_csn_mask_lg)"
            />
          </mask>
        </defs>
        {/* 首页组件 */}
        {
          <CSSTransition
            in={digArray.join('-') === 'main'}
            timeout={1000}
            nodeRef={mainRef as any}
            classNames="fade"
            unmountOnExit={true}
          >
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
          </CSSTransition>
        }
        {
          <CSSTransition
            in={digArray.join('-') === 'main-dataInventory'}
            timeout={1000}
            nodeRef={dataInventoryRef as any}
            classNames="fadeleft"
            unmountOnExit={true}
          >
            <g className="data-inventory" ref={dataInventoryRef}>
              <LeftRightComp
                center={data.center}
                props={dataInventory}
                Back={BackComp}
              />
              <LeftLeftComp
                props={data.left}
              />
            </g>
          </CSSTransition>
        }
        {
          <CSSTransition
            in={digArray.join('-') === 'main-incident'}
            timeout={1000}
            nodeRef={incidentRef as any}
            classNames="fadeleft"
            unmountOnExit={true}
          >
            <g className="incident" ref={incidentRef}>
              <IncidentComp
                props={incident}
                Back={BackComp}
              />
            </g>
          </CSSTransition>
        }
      </svg>
      {/* <div style={{
        position: 'absolute',
        right: '100px',
        top: '50px',
        color: '#fff',
        cursor: 'pointer'
      }} onClick={() => navigate('./home')}>跳转测试(临时）</div> */}
    </div>
  </>
}

export default Main  