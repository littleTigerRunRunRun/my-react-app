import DiagramMain from './lib/index'
import './App.css'
import amazon from './assets/amazon.png'
import google_cloud from './assets/google_cloud.svg'
import microsoft from './assets/microsoft.png'
import office from './assets/office.png'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.tsx'
import { Menu, Button } from '@arco-design/web-react';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconBook,
} from '@arco-design/web-react/icon';
import "@arco-design/web-react/dist/css/arco.css";
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function App() {
  // const [centerAlerts, updateCenterAlert] = useState(0)
  // const [centerIncidents, updateCenterIncidents] = useState(0)

  // console.log('xxx!')
  // setTimeout(() => {
  //   updateCenterAlert(5493)
  //   updateCenterIncidents(350)
  //   console.log('update!')
  // }, 4000)

  // 可视化交互组件所需数据结构
  // const [data, setData] = useState({}) // 空数据状态传入一个空对象
  const [data, setData] = useState({
    left: {
      extraSource: 12, // 总数据源数量
      // 权重前9的数据源
      sources: [
        { pic: amazon, name: 'Amazon', status: 'safe', size: 121321 },
        { pic: google_cloud, name: 'Google Cloud', status: 'safe', size: 231 },
        { pic: microsoft, name: 'Microsort', status: 'danger', size: 1321321321 },
        { pic: office, name: 'Microsort 365', status: 'safe', size: 1313 },
        { pic: amazon, name: 'Amazon', status: 'safe', size: 44444 },
        { pic: google_cloud, name: 'Google Cloud', status: 'safe', size: 123 },
        { pic: microsoft, name: 'Microsort', status: 'safe', size: 1 },
        { pic: office, name: '标题长度测试测试测试测试测试xxxxxxxxxxxxxxxxxxxxxxxxx', status: 'danger', size: 11111111111111 },
        // { pic: amazon, name: 'Amazon', status: 'safe',  width: 745, height: 200 },
        // { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
        // { pic: microsoft, name: 'Microsort', status: 'danger', width: 200, height: 200 },
        // { pic: office, name: 'Microsort 365', status: 'safe', width: 621, height: 200 }
      ]
    },
    center: {
      alerts: 54932,
      incidents: 350,
      rules: 82,
      userName: 'Stellaa', // 首屏显示用户名
      day: 181, // 服务天数
      dataIngestion: 66,
      eventIngestion: 6666,
      alertAnalysis: 49,
      preventedAlerts: 286113
    },
    right: {
      // 数据展示
      automated: 252,
      resolvedIncidents: 258,
      manual: 98,
      openIncidents: 92
    }
  })

  const updateData = () => {
    setData({
      left: {
        extraSource: 24, // 总数据源数量
        // 权重前9的数据源
        sources: [
          { pic: amazon, name: 'Amazon2', status: 'safe', size: 121321 },
          { pic: google_cloud, name: 'Google Cloud2', status: 'safe', size: 231 },
          { pic: microsoft, name: 'Microsort2', status: 'danger', size: 1321321321 },
          { pic: microsoft, name: 'Microsort 3652', status: 'safe', size: 1313 },
          { pic: amazon, name: 'Amazon2', status: 'safe', size: 44444 },
          { pic: google_cloud, name: 'Google Cloud2', status: 'safe', size: 123 },
          { pic: office, name: '标题长度测试2测试测试测试测试xxxxxxxxxxxxxxxxxxxxxxxxx', status: 'safe', size: 1 },
          { pic: office, name: 'Microsort2', status: 'danger', size: 11111111111111 },
          // { pic: amazon, name: 'Amazon', status: 'safe',  width: 745, height: 200 },
          // { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
          // { pic: microsoft, name: 'Microsort', status: 'danger', width: 200, height: 200 },
          // { pic: office, name: 'Microsort 365', status: 'safe', width: 621, height: 200 }
        ]
      },
      center: {
        alerts: 5493,
        incidents: 3502,
        rules: 822,
        userName: 'Stellaa', // 首屏显示用户名
        day: 1821, // 服务天数
        dataIngestion: 662,
        eventIngestion: 66662,
        alertAnalysis: 982,
        preventedAlerts: 2861132
      },
      right: {
        // 数据展示
        automated: 2522,
        resolvedIncidents: 2258,
        manual: 982,
        openIncidents: 922
      }
    })
  }

  const onDig = async (digArray:Array<string>) => {
    console.log('下钻层级发生变化', digArray)
    if (digArray.join('-') === 'main-dataInventory') {
      // 从main下钻到的dataInventory一级的请求数据 {
      // 异步操作获取数据
      return {
        // 圆形关键词，有几行就会等分成几个
        // 逗号分隔用于控制换行
        keywords: [
          ['Threshold'],
          ['Correlation', 'Analysis'],
          ['IOC'],
          ['Threat', 'Intelligence'],
          ['Machine', 'Learning'],
        ],
        ruleHealthPercent: 96, // 中间的rule health百分比数值
        dangerRate: 0.35, // 背后放射状细线中红色占比多少，0.35就是35%，设计师的默认值是0.25，如果没有数据含义就固定设置一个0.25
        optimized: 41, // 可优化rules数值
        optimizedRate: 0.6, // 下方进度条百分比
        recommendations: 21 // 推荐数值
      }
    } else if (digArray.join('-') === 'main-incident') {
      // 请求数据，异步操作
      return {
        total: 640,
        trend: [
          { value: 0, time: '2025-09-25 00:00:00'}, 
          { value: 2, time: '2025-09-25 00:00:00'}, 
          { value: 12, time: '2025-09-25 00:00:00'}, 
          { value: 0, time: '2025-09-25 00:00:00'}, 
          { value: 1, time: '2025-09-25 00:00:00'}, 
          { value: 0, time: '2025-09-25 00:00:00'}, 
          { value: 4, time: '2025-09-25 00:00:00'}, 
          { value: 0, time: '2025-09-25 00:00:00'}, 
          { value: 11, time: '2025-09-25 00:00:00'},
        ], // new Array(11).fill(0).map(() => Math.round(Math.random())),
        automated: 251,
        manual: 96,
        resolvedIncidents: 548,
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
      }
    }
  }

  const addDataSource = () => {
    // 空数据时左侧的添加按钮点击事件
    setData({
      left: {
        extraSource: 24, // 总数据源数量
        // 权重前9的数据源
        sources: [
          { pic: amazon, name: 'Amazon2', status: 'safe', size: 121321 },
          { pic: google_cloud, name: 'Google Cloud2', status: 'safe', size: 231 },
          { pic: microsoft, name: 'Microsort2', status: 'danger', size: 1321321321 },
          { pic: microsoft, name: 'Microsort 3652', status: 'safe', size: 1313 },
          { pic: amazon, name: 'Amazon2', status: 'safe', size: 44444 },
          { pic: google_cloud, name: 'Google Cloud2', status: 'safe', size: 123 },
          { pic: office, name: '标题长度测试2测试测试测试测试xxxxxxxxxxxxxxxxxxxxxxxxx', status: 'safe', size: 1 },
          { pic: office, name: 'Microsort2', status: 'danger', size: 11111111111111 },
          // { pic: amazon, name: 'Amazon', status: 'safe',  width: 745, height: 200 },
          // { pic: google_cloud, name: 'Google Cloud', status: 'safe', width: 200, height: 200 },
          // { pic: microsoft, name: 'Microsort', status: 'danger', width: 200, height: 200 },
          // { pic: office, name: 'Microsort 365', status: 'safe', width: 621, height: 200 }
        ]
      },
      center: {
        alerts: 5493,
        incidents: 3502,
        rules: 822,
        userName: 'Stellaa', // 首屏显示用户名
        day: 1821, // 服务天数
        dataIngestion: 662,
        eventIngestion: 66662,
        alertAnalysis: 982,
        preventedAlerts: 2861132
      },
      right: {
        // 数据展示
        automated: 2522,
        resolvedIncidents: 2258,
        manual: 982,
        openIncidents: 922
      }
    })
  }

  const [collapse, setCollapse] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={
          <div className="main">
            {/* <div className="sidebar">
              <Button
                style={{
                  padding: '0 12px',
                  height: 30,
                  lineHeight: '30px',
                  marginBottom: 4,
                }}
                type='primary'
                onClick={() => setCollapse(!collapse)}
              >
                {collapse ? <IconMenuUnfold /> : <IconMenuFold />}
              </Button>
              <Menu
                style={{ width: 200, borderRadius: 4 }}
                theme='dark'
                collapse={collapse}
                defaultOpenKeys={['0']}
                defaultSelectedKeys={['0_2']}
              >
                <SubMenu
                  key='0'
                  title={
                    <>
                      <IconApps /> Navigation 1
                    </>
                  }
                >
                  <MenuItem key='0_0'>Menu 1</MenuItem>
                  <MenuItem key='0_1'>Menu 2</MenuItem>
                  <MenuItem key='0_2'>Menu 3</MenuItem>
                  <MenuItem key='0_3'>Menu 4</MenuItem>
                </SubMenu>
                <SubMenu
                  key='1'
                  title={
                    <>
                      <IconBug /> Navigation 2
                    </>
                  }
                >
                  <MenuItem key='1_0'>Menu 1</MenuItem>
                  <MenuItem key='1_1'>Menu 2</MenuItem>
                  <MenuItem key='1_2'>Menu 3</MenuItem>
                </SubMenu>
                <SubMenu
                  key='2'
                  title={
                    <>
                      <IconBulb /> Navigation 3
                    </>
                  }
                >
                  <MenuItem key='2_0'>Menu 1</MenuItem>
                  <MenuItem key='2_1'>Menu 2</MenuItem>
                </SubMenu>
              </Menu>
            </div> */}
            <DiagramMain
              data={data}
              onDig={onDig}
              addDataSource={addDataSource}
            />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
