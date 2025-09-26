import { type Tick, type Callback } from './tick'
import { Easing, type EasingFunction, type EasingType } from './easing'

interface TweenConfig {
  target: Record<string, any> // 一个数据视图对象， 通过对数字补间并且赋值给它来操作视图，从而实现动画
  duration?: number // 动画一轮持续时间，单位ms
  delay?: number // 动画延迟时间, 单位ms
  repeat?: number|undefined|'infinite' // 是否重复
  ease?: EasingType // 缓动类型
  from?: Record<string, number> // 和target类似，描述要变化的起点到终点的变量,例如 { x: 0, y: 0 }
  to?: Record<string, number> // { x: 100, y: 100 }
  groupIndex?: number
  // setMapFuncs
  // getMapFuncs 这两个个人认为需要去除，因为target必须是数据视图对象，因此不应该是非number
  onUpdate?(): void // update响应，将中间补间值传回
}
export class Tween {
  get repeatDuration(): number {
    if (!this.config.repeat) return this.config.duration
    else if (typeof this.config.repeat === 'number') return this.config.duration * this.config.repeat
    else return this.config.duration
  }
  get repeatLoop(): boolean { return this.config.repeat === 'infinite' }

  set duration(duration: number) { this.config.duration = duration }

  get easing(): EasingFunction { return Easing[this.config.ease] }
  public groupIndex: number // 这个是用于timeline来选择哪些动画需要播放的一个id值
  protected config: {
    target: Record<string, any>
    duration: number
    delay: number
    repeat: number|undefined|'infinite'
    ease: EasingType
    from: Record<string, number>
    to: Record<string, number>
    onUpdate(): void
  }
  protected tick: Tick
  protected tickId: number

  protected _pausing: boolean = false
  protected _startTime: number = 0
  protected _pauseTime: number = 0
  protected _lastTime: number = 0

  constructor(tick: Tick, { target, duration = 0, delay = 0, repeat = 1, ease = 'linear', from = {}, to = {}, groupIndex = -1, onUpdate = () => {} }: TweenConfig) {
    this.tick = tick
    this.config = { target, duration, delay, repeat, ease, from, to, onUpdate }
    this.tickId = this.tick.add(this.update)
    this.groupIndex = groupIndex
    this.onUpdate = onUpdate
  }

  // 设置from，如果在初始化时没有的话
  public from(from: Record<string, any>): Tween {
    if (from) { this.config.from = from }
    return this
  }

  // 设置去向但是并不直接开始
  public to(to: Record<string, any>, duration: number, delay: number = 0, ease: EasingType = 'linear') {
    this.config.to = to
    this.config.duration = duration
    this.config.delay = delay
    this.config.ease = ease
    return this
  }
  public play() {
    // 动画启动
    this._pausing = false
    this._startTime = this.tick.current
    this._pauseTime = 0
    this._lastTime = this._startTime
    this.tick.setActivate(this.tickId, true) // 动画启动
    return this
  }

  public resume() {
    this._pausing = false
    return this
  }

  public pause() {
    this._pausing = true
    return this
  }

  public stop() {
    this._pausing = true
    this.tick.setActivate(this.tickId, false) // 动画启动
    return this
  }
  public callback(callback: Callback) {
    this.onCallback = callback
    return this
  }

  // 等待一段时间，属于一个异步操作
  public wait(_duration: number) {
    return this
  }

  // 自定义执行点什么，尤其是动画同步操作时
  public call(callback: Callback): Tween {
    callback()
    return this
  }
  public prevFrame() {
    if (!this._pausing) { return }
    this._pauseTime -= -16
    this.updateFrame(this.tick.current)
  }
  public nextFrame() {
    if (!this._pausing) { return }
    this._pauseTime -= 16
    this.updateFrame(this.tick.current)
  }

  protected onUpdate: Callback = (_lerps: Record<string, number>) => {}

  protected update = (now: number) => {
    if (this._pausing) {
      this._pauseTime += (now - this._lastTime)
      this._lastTime = now
      return
    }

    this.updateFrame(now)
    this._lastTime = now
  }

  protected updateFrame(now:number) {
    // 最终的动画运行时间 = 到现在停了多久 - 动画延迟 - 暂停时间（包含了偏移量）
    let total = now - this._startTime - this.config.delay - this._pauseTime
    total = Math.min(this.repeatDuration, total)
    // 动画还未开始
    if (total <= 0) { return }
    // 或者非无限循环已经结束
    if (!this.repeatLoop && this.repeatDuration === total) {
      this.lerp(this.config.duration)
      // 这句如果不注释掉，动画结束后将不会停止计算，但是注释掉后，因为不再计算_pauseTime，将无法使用前进后退的功能
      // 需要做一些合理的改动来解决这个矛盾
      // this.tick.setActivate(this.tickId, false)
      if (this.onCallback) { this.onCallback() }
      this._pausing = true
      return
    }
    // if (this.repeatLoop || total > this.config.duration)
    total = total % this.config.duration // 无限循环或者正处在多轮循环中

    this.lerp(total)
  }

  protected lerp(total: number) {
    const lerps: Record<string, number> = {}
    for (const key in this.config.to) {
      lerps[key] = this.easing(total, this.config.from[key], this.config.to[key], this.config.duration)
      this.config.target[key] = lerps[key]
    }
    if (this.onUpdate) { this.onUpdate(lerps) }
  }

  protected onCallback: Callback = () => {}

  public destroy() {
    this.stop()
    this.tick.delete(this.tickId)
  }
}

export type TimelineCode = 'pause' | 'resume' | 'stop' | 'prev' | 'next'

export class Timeline {
  protected tweens: Tween[] = []
  protected playingList: Tween[] = []
  constructor() {}

  public add(tween: Tween) {
    this.tweens.push(tween)
  }

  public play(gather?: number[]) {
    const all: Array<Promise<void>> = []
    this.tweens.map((tween) => {
      // 无分组或者分组中没有这tween
      if (!gather || (gather.indexOf(tween.groupIndex) > -1)) {
        if (!this.playingList.includes(tween)) { this.playingList.push(tween) }
        // console.log(gather, tween.groupIndex)
        all.push(new Promise((resolve) => {
          tween.play().callback(() => {
            resolve()
          })
        }))
      }
    })
    return all
  }

  public timelineControl(code: TimelineCode) {
    for (const tween of this.playingList) {
      switch (code) {
        case 'resume': {
          tween.resume()
          break
        }
        case 'pause': {
          tween.pause()
          break
        }
        case 'stop': {
          tween.stop()
          break
        }
        case 'prev': {
          tween.prevFrame()
          break
        }
        case 'next': {
          tween.nextFrame()
          break
        }
      }
    }
  }

  public destroy() {
    this.tweens.forEach((tween) => tween.destroy())
    this.tweens.splice(0, this.tweens.length)
  }
}
