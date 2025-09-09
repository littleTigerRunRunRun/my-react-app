// import { useRef, useEffect } from 'react'
import './index.scss'
import DC from './defaultConfig'
import CenterComp from './comps/CenterComp'
 
function Main() {
  const DCGSize = DC.global.size

  const centerProps = {
    bgStatusColor: '#01FEF7'
  }

  return <>
    <div className="diagram-container">
      <svg
        width="100%"
        height="100%"
        // style={}
        viewBox={`${DCGSize.width * -0.5} ${DCGSize.height * -0.5} ${DCGSize.width} ${DCGSize.height}`}
      >
        <CenterComp
          props={centerProps}
        />
      </svg>
    </div>
  </>
}

export default Main