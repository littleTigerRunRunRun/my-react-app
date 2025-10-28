// 动画控制工具
import { Tick } from './utils/storyboard'
import { Event, subscriber } from './utils/Subscriber'

// 整个系统复杂动画的控制系统
const tick = new Tick()

export class RandomLeftFlowline {
  flowlines:Array<{ index: number, active: boolean }> = []
  duration:number
  frequency:number
  parallelLimit: number
  constructor(props:{
    targetNumber:number,
    duration:number, // ms
    frequency:number, // 平均1秒触发多少次
    parallelLimit: number // 并行上限，最低为1，最高不得高于targetNumber
  }) {
    for (let i = 0; i < props.targetNumber; i++) {
      this.flowlines.push({
        index: i,
        active: false
      })
    }
    this.duration = props.duration
    this.frequency = props.frequency
    this.parallelLimit = props.parallelLimit

    tick.add(this.randomAnime, true)
  }

  randomAnime = (delt:number) => {
    // 比如frequency = 2000ms，意味着每秒平均出现0.5(1000 / frequency)次动画，也就是说当前帧出现的概率是delt / 1000 * (1000 / frequency)
    if (Math.random() < (delt / 1000 * this.frequency)) {
      const actives = this.flowlines.filter((fl) => fl.active)
      if (actives.length >= this.parallelLimit) return // 并行动画数量到达上限

      const inactives = this.flowlines.filter((fl) => !fl.active)
      const index = Math.floor(Math.random() * inactives.length)
      inactives[index].active = true
      subscriber.broadcast(Event.LINE_ANIME(`ml_${inactives[index].index}`))
      setTimeout(() => {
        inactives[index].active = false
      }, this.duration + 200)
    }
  }

  destroy() {

  }
}
