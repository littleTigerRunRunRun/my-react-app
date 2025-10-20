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
      extraSource: 12, // 总数据源数量
      // 权重前9的数据源
      sources: [
        { pic: amazon, name: 'Amazon', status: 'safe', width: 745, height: 200 },
        { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
        { pic: microsoft, name: 'Microsort', status: 'danger', width: 200, height: 200 },
        { pic: office, name: 'Microsort 365', status: 'safe', width: 621, height: 200 },
        { pic: amazon, name: 'Amazon', status: 'safe',  width: 745, height: 200 },
        { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
        { pic: microsoft, name: 'Microsort', status: 'safe', width: 200, height: 200 },
        { pic: office, name: 'Microsort 365', status: 'danger', width: 621, height: 200 },
        // { pic: amazon, name: 'Amazon', status: 'safe',  width: 745, height: 200 },
        // { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
        // { pic: microsoft, name: 'Microsort', status: 'danger', width: 200, height: 200 },
        // { pic: office, name: 'Microsort 365', status: 'safe', width: 621, height: 200 }
      ]
    },
    center: {
      alerts: 5493,
      incidents: 350
    },
    right: {
      // 数据展示
      automated: 252,
      resolvedIncidents: 258,
      manual: 98,
      openIncidents: 92
    }
  })

  return (
    <>
      <DiagramMain data={data} />
    </>
  )
}

export default App
