// 动画控制工具
import { Tick } from './utils/storyboard'
import { Event, subscriber } from './utils/Subscriber'

// 整个系统复杂动画的控制系统
const tick = new Tick()
// console.log('tick', tick)

export class RandomLeftFlowline {
  tickNum:number
  flowlines:Array<{ index: string, active: boolean }> = []
  rightFlowlinesLevel1:Array<{ index: string, active: boolean }> = []
  rightFlowlinesLevel2:Array<{ index: string, active: boolean }> = []
  duration:number
  frequency:number
  parallelLimit: number
  constructor(props:{
    duration:number, // ms
    frequency:number, // 平均1秒触发多少次
    parallelLimit: number // 并行上限，最低为1，最高不得高于targetNumber
  }) {
    // this.flowlines.push({
    //   index: i,
    //   active: false
    // })
    this.duration = props.duration
    this.frequency = props.frequency
    this.parallelLimit = props.parallelLimit

    // this.starttime = Date.now()
    this.tickNum = tick.add(this.randomAnime, true)

    subscriber.listen(Event.UPDATE_LINE_TARGET, this.updateLineTarget)
  }

  public updateLineTarget = (targets: Array<string>, part: 'left' | 'right1' | 'right2') => {
    if (part === 'left') {
      this.flowlines.splice(0, this.flowlines.length, ...(targets.map((str) => ({
        index: str,
        active: false
      }))))
    }
    if (part === 'right1') {
      this.rightFlowlinesLevel1.splice(0, this.rightFlowlinesLevel1.length, ...(targets.map((str) => ({
        index: str,
        active: false
      }))))
    }
    if (part === 'right2') {
      this.rightFlowlinesLevel2.splice(0, this.rightFlowlinesLevel2.length, ...(targets.map((str) => ({
        index: str,
        active: false
      }))))
    }
  }
  // starttime = 0
  // count = 0
  level1Active = false
  level2Active = false
  randomAnime = (delt:number) => {
    if (this.flowlines.length === 0) return
    // 比如frequency = 2000ms，意味着每秒平均出现0.5(1000 / frequency)次动画，也就是说当前帧出现的概率是delt / 1000 * (1000 / frequency)
    if (Math.random() < (delt / 1000 * this.frequency)) {
      const actives = this.flowlines.filter((fl) => fl.active)
      if (actives.length >= this.parallelLimit) return // 并行动画数量到达上限

      const inactives = this.flowlines.filter((fl) => !fl.active)
      const index = Math.floor(Math.random() * inactives.length)
      const inactive = inactives[index]
      inactive.active = true
      // this.count++
      // console.log((Date.now() - this.starttime) / this.count)
      subscriber.broadcast(Event.LINE_ANIME(inactive.index))
      setTimeout(() => {
        inactive.active = false
        if (this.rightFlowlinesLevel1.length > 0) {
          this.level1Active = true
        }
      }, this.duration + 200)
    }
    if (this.level1Active) {
      this.level1Active = false
      const inactives = this.rightFlowlinesLevel1.filter((fl) => !fl.active)
      if (inactives.length > 0) {
        const index = Math.floor(Math.random() * inactives.length)
        const inactive = inactives[index]
        inactive.active = true

        subscriber.broadcast(Event.LINE_ANIME(inactive.index))
        setTimeout(() => {
          inactive.active = false
          if (this.rightFlowlinesLevel2.length > 0) {
            this.level2Active = true
          }
        }, this.duration + 100)
      }
    }
    if (this.level2Active) {
      this.level2Active = false
      const inactives = this.rightFlowlinesLevel2.filter((fl) => !fl.active)
      if (inactives.length > 0) {
        const index = Math.floor(Math.random() * inactives.length)
        const inactive = inactives[index]
        inactive.active = true

        subscriber.broadcast(Event.LINE_ANIME(inactive.index))
        setTimeout(() => {
          inactive.active = false
        }, this.duration + 100)
      }
    }
  }
  destroy() {
    // console.log('delete', this.tickNum)
    tick.delete(this.tickNum)
    subscriber.remove(Event.UPDATE_LINE_TARGET, this.updateLineTarget)
  }
}
