import { type Tick, type Callback } from './tick'
import { Easing, type EasingType } from './easing'

const threshold = 0.000001

// 数值缓冲释放，类似于css里的transition，传入的数据会在设定的时间中逐步向目标靠近，而不是直接设置值
export class Transition {
  public get value(): number { return this._value }
  public set value(val: number) {
    if (Math.abs(val - this._value) < threshold) return
    this.to = val
    this.from = this._value
    this.tick.setActivate(this.tickId, true)
  }
  protected _value: number = 0
  protected tick: Tick
  protected tickId: number
  public duration: number
  protected ease: EasingType
  protected startTime: number = 0
  protected from: number = 0
  protected to: number = 0
  protected onUpdate: Callback
  protected callback: Callback
  constructor(tick: Tick, value: number, duration: number, ease?: EasingType, onUpdate?: Callback, callback?: Callback) {
    this.tick = tick
    this._value = value
    this.from = value
    this.tickId = tick.add(this.ticker)
    this.duration = duration
    this.ease = ease || 'linear'
    this.startTime = Date.now()
    this.onUpdate = onUpdate || (() => {})
    this.callback = callback || (() => {})
  }

  public reset(value: number) {
    this._value = value
  }

  public destroy() {
    this.tick.delete(this.tickId)
    this.tick = undefined as any
  }

  protected ticker = () => {
    this._value = Easing[this.ease](Math.min(Date.now() - this.startTime, this.duration), this.from, this.to, this.duration)
    this.onUpdate(this._value)

    if (Date.now() - this.startTime > this.duration) {
      this.callback()
      this.destroy()
    }
  }
}

export class TransitionGroup {
  public get value(): Record<string, number> { return this._value }
  public set value(val: Record<string, number>) {
    let shouldGo = false
    for (const key in val) {
      if (Math.abs(this._value[key] - val[key]) > threshold) shouldGo = true
    }
    if (!shouldGo) return

    this.from = this.getValue(this._value)
    this.to = this.getValue(val)
    this.startTime = Date.now()
    this.tick.setActivate(this.tickId, true)
    // this.count = 0
  }
  protected _value: Record<string, number> = {}
  protected tick: Tick
  protected tickId: number
  public duration: number
  protected ease: EasingType
  protected startTime: number = 0
  protected from: Record<string, number> = {}
  protected to: Record<string, number> = {}
  protected onUpdate: Callback
  protected callback: Callback
  constructor(tick: Tick, value: Record<string, number>, duration: number, ease?: EasingType, onUpdate?: Callback, callback?: Callback) {
    this.tick = tick
    this.tickId = tick.add(this.ticker)
    this.reset(value)
    this.duration = duration
    this.ease = ease || 'linear'
    this.onUpdate = onUpdate || (() => {})
    this.callback = callback || (() => {})
  }

  public reset(value: Record<string, number>) {
    for (const key in value) { this._value[key] = value[key] }
  }

  public destroy() {
    this.tick.delete(this.tickId)
    this.tick = undefined as any
  }

  protected ticker = () => {
    for (const key in this._value) {
      this._value[key] = Easing[this.ease](Math.min(Date.now() - this.startTime, this.duration), this.from[key], this.to[key], this.duration)
    }
    this.onUpdate(this._value)

    if (Date.now() - this.startTime > this.duration) {
      this.callback()
      this.destroy()
    }
  }

  protected getValue(value: Record<string, number>): Record<string, number> {
    const result: Record<string, number> = {}
    for (const key in value) { result[key] = value[key] }
    return result
  }
}
