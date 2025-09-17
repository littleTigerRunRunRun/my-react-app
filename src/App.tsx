import DiagramMain from './lib/index'
import './App.css'
import pic1 from './assets/automatenspieler.png'
import pic2 from './assets/devexpress.png'
import pic3 from './assets/famoid.png'
import pic5 from './assets/laravel.png'
import pic6 from './assets/leofame.png'
import { useState } from 'react'

function App() {
  // 可视化交互组件所需数据结构
  const [data, setData] = useState({
    left: {
      endpoints: 41732, // 需要自行转成k、m单位
      dataSources: 77, // 总数据源数量
      // 权重前9的数据源
      sources: [
        { pic: pic1, status: 'safe', width: 78, height: 32 },
        { pic: pic2, status: 'safe', width: 192, height: 32 },
        { pic: pic3, status: 'danger', width: 32, height: 32 },
        { pic: pic5, status: 'safe', width: 109, height: 32 },
        { pic: pic5, status: 'safe', width: 109, height: 32 },
        { pic: pic6, status: 'safe', width: 120, height: 32 },
        { pic: pic3, status: 'safe', width: 32, height: 32 },
        { pic: pic3, status: 'safe', width: 32, height: 32 },
        { pic: pic3, status: 'safe', width: 32, height: 32 }
      ]
    },
    center: {
      // 中间环背景的状态色显示
      bgStatus: 'safe', // 'safe' | 'low' | 'middle' | 'high' | 'critical‌'
      // 中间100个状态点的状态
      points: (() => {
        const arr = new Array<{ status: 'safe' | 'low' | 'middle' | 'high' | 'critical‌' }>()
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
