export type Callback = (...argus: any[]) => void

export interface TickProcess {
  callback: Callback
  activate: boolean
  id: number
}

class Debounce {
  protected Tick:Tick
  protected tickId:number
  protected activate:boolean = false
  protected current = 0
  protected interval = 0
  protected callback:Callback
  protected argus:Array<any>|undefined
  constructor(tick: Tick, callback: Callback, interval: number) {
    this.callback = callback
    this.interval = interval
    this.Tick = tick
    this.tickId = this.Tick.add(this.tick, false)
  }

  public call(...argus:Array<any>) {
    this.argus = argus
    if (!this.activate) {
      this.callback(...this.argus)
      this.activate = true
      this.Tick.setActivate(this.tickId, true)
    }
  }

  public tick = (now:number, delt:number) => {
    if (delt > 200) return
    this.current += delt
    if (this.current > this.interval) this.current -= this.interval
    else return
    // 这代表限流触发了
    if (this.argus) {
      // 如果有参数, 则触发
      this.callback(...this.argus)
      this.argus = undefined
    } else {
      // 没有的话就把自己这个监听取消激活
      this.activate = false
      this.Tick.setActivate(this.tickId, false)
    }
  }

  public destroy() {
    this.Tick.delete(this.tickId);
    (this.Tick as any) = undefined;
    (this.callback as any) = undefined
    this.argus = undefined
  }
}

// 帧管理器
// 相比起requestAnimationFrame，可以添加任务，并且为任务返回时间，此外可以切换任务的激活状态
export class Tick {
  protected tickEnd: boolean = false
  protected processId: number = 0
  protected hash: Record<string, TickProcess> = {}
  protected activates: Callback[] = []
  protected nows: Callback[] = []
  protected onces: Callback[] = []
  protected nexts: Callback[] = []
  protected startTime = 0
  constructor() {
    this.startTime = this.lastNow = Date.now()
    requestAnimationFrame(this.tick)
  }

  public get current() {
    return Date.now() - this.startTime
  }

  public add(callback: Callback, activate: boolean = false): number {
    const id = this.processId++
    this.hash[id] = { callback, activate, id }
    if (activate) this.activates.push(callback)
    return id
  }

  public once(callback: Callback):void {
    this.onces.push(callback)
  }

  public next(call: Callback) {
    this.nexts.push(call)
  }

  public addTickDebounce(callback: Callback, interval: number) {
    return new Debounce(this, callback, interval)
  }

  public setActivate(id: number, activate: boolean): void {
    try {
      const process = this.hash[id]
      if (activate === process.activate) return
      process.activate = activate
      if (activate) this.activates.push(process.callback)
      else this.activates.splice(this.activates.indexOf(process.callback), 1)
    } catch (e) {
      console.log(e)
      console.log(id, this.hash[id], activate)
    }
  }

  public delete(tickId: number): void {
    this.setActivate(tickId, false)
    delete this.hash[tickId]
  }

  protected lastNow:number = 0
  protected tick = () => {
    if (this.tickEnd) return
    const now = Date.now()
    if (now - this.lastNow > 200) {
      this.lastNow = now
      requestAnimationFrame(this.tick)
      return
    }

    this.activates.map((callback) => callback(now - this.lastNow, now - this.startTime))

    if (this.nows.length > 0) {
      for (const nowCall of this.nows) nowCall()
      this.nows.splice(0, this.nows.length)
    }
    if (this.nexts.length > 0) {
      this.nows.splice(0, 0, ...this.nexts)
      this.nexts.splice(0, this.nexts.length)
    }
    if (this.onces.length) {
      for (const onceCall of this.onces) { onceCall() }
      this.onces.splice(0, this.onces.length)
    }

    this.lastNow = now
    requestAnimationFrame(this.tick)
  }

  public destroy(): void {
    this.tickEnd = true
    for (const key in this.hash) delete this.hash[key]
    this.activates.splice(0, this.activates.length)
  }
}

export interface Tick {
  current: number
  add(callback: Callback, activate?: boolean): number
  once(callback: Callback):void
  setActivate(id: number, activate: boolean): void
  delete(tickId: number): void
  destroy(): void
}