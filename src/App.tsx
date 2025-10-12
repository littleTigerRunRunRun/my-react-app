import DiagramMain from './lib/index'
import './App.css'
import amazon from './assets/amazon.png'
import google_cloud from './assets/google_cloud.png'
import microsoft from './assets/microsoft.png'
import office from './assets/office.png'
import { useState } from 'react'

function App() {
  // 可视化交互组件所需数据结构
  const [data, setData] = useState({
    left: {
      endpoints: 41732, // 需要自行转成k、m单位
      dataSources: 77, // 总数据源数量
      // 权重前9的数据源
      sources: [
        { pic: amazon, name: 'Amazon', status: 'safe', width: 745, height: 200 },
        { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
        { pic: microsoft, name: 'Microsort', status: 'danger', width: 200, height: 200 },
        { pic: office, name: 'Microsort 365', status: 'safe', width: 621, height: 200 },
        { pic: amazon, name: 'Amazon', status: 'safe',  width: 745, height: 200 },
        { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
        { pic: microsoft, name: 'Microsort', status: 'safe', width: 200, height: 200 },
        { pic: office, name: 'Microsort 365', status: 'safe', width: 621, height: 200 },
        // { pic: amazon, name: 'Amazon', status: 'safe',  width: 745, height: 200 },
        // { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
        // { pic: microsoft, name: 'Microsort', status: 'danger', width: 200, height: 200 },
        // { pic: office, name: 'Microsort 365', status: 'safe', wwidth: 621, height: 200 }
      ]
    },
    center: {
      // 中间环背景的状态色显示
      bgStatus: 'safe', // 'safe' | 'low' | 'middle' | 'high' | 'critical'
      // 中间100个状态点的状态
      points: (() => {
        const arr = new Array<{ status: 'safe' | 'low' | 'middle' | 'high' | 'critical' }>()
        for (let i = 0; i < 100; i++) {
          // @ts-ignore
          arr.push((['safe', 'low', 'middle', 'high', 'critical'])[Math.floor(Math.random() * 4)])
        }
        return arr
      })(),
      // 数据展示
      leftCount: 999,
      rightCount: 999
    },
    right: {
      // 数据展示
      automated: 991,
      resolvedCases: 992,
      manual: 993,
      openCases: {
        critical: 999,
        high: 998,
        middle: 997,
        low: 999
      }
    }
  })

  return (
    <>
      <DiagramMain data={data} />
    </>
  )
}

export default App
