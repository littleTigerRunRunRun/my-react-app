import { useRef, useEffect } from 'react'
import './index.scss'
import { init, destroy } from './main'
 
function Main() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) init(containerRef.current)
    else console.warn('不存在容器')
    return () => {}
  }, [])

  return <>
    <div className="diagram-container" ref={containerRef}></div>
  </>
}

export default Main