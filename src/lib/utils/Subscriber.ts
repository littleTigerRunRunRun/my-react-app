export type Callback = (...argus: any[]) => void

export interface CallPrepare {
  callback: Callback,
  params?: unknown[]
}

export interface SubscriberInterface {
  list: Record<string, Callback[]>
  onceList: Record<string, Callback[]>
  nextList: Record<string, Callback[]>
  nowList: CallPrepare[]
  history: Record<string, Array<unknown[]>>
  sets: Record<string, unknown>
  check(): void
  register(eventName: string | number, useHistory?: boolean): void
  cancel(eventName: string | number): void
  listen(eventName: string | number, callback: Callback): void
  once(eventName: string | number, callback: Callback): void
  next(eventName: string | number, callback: Callback): void
  remove(eventName: string | number, callback: Callback): void
  broadcast(eventName: string | number, ...argus: unknown[]): void
  hear(eventName: string | number, callback: Callback): void
  tell(eventName: string | number, ...argus: unknown[]): any
  clear(): void
  set(key: string | number, value: unknown): void
  get(key: string | number): unknown
  delete(key: string | number): void
  start(): void
  stop(): void
}

// 事件分发和全局变量管理器
class Subscriber implements SubscriberInterface {
  public list: Record<string, Callback[]> = {}
  public onceList: Record<string, Callback[]> = {}
  public nextList: Record<string, Callback[]> = {}
  public nowList: CallPrepare[] = []
  public hearList: Record<string, Callback> = {}
  public history: Record<string, Array<unknown[]>> = {}
  public sets: Record<string, unknown> = {}
  public onBroadcast: Callback|undefined

  protected _runningStatus: boolean = true

  public set(key: string|number, value: unknown) {
    this.sets[key] = value
  }

  public get(key: string|number) {
    // console.log('get', key)
    return this.sets[key]
  }

  public delete(key: string|number) {
    if (this.sets[key]) { delete this.sets[key] }
  }

  public check() {
    // 调试时查看订阅情况
    console.log('list:', this.list)
    console.log('onceList:', this.onceList)
    console.log('nextList:', this.nextList)
    console.log('hearList', this.hearList)
    // console.log('history:', history)
  }

  // 注册一种新类型的事件
  public register(eventName: string|number, useHistory?: boolean) {
    if (!this.list[eventName]) { this.list[eventName] = [] }
    if (!this.onceList[eventName]) { this.onceList[eventName] = [] }
    if (!this.nextList[eventName]) { this.nextList[eventName] = [] }
    if (!this.history[eventName] && useHistory) { this.history[eventName] = [] }
  }

  // 取消某个事件名的所有订阅
  public cancel(eventName: string|number) {
    if (this.list[eventName]) {
      this.list[eventName].splice(0, this.list[eventName].length)
      delete this.list[eventName]
    }
    if (this.onceList[eventName]) {
      this.onceList[eventName].splice(0, this.onceList[eventName].length)
      delete this.onceList[eventName]
    }
    if (this.nextList[eventName]) {
      this.nextList[eventName].splice(0, this.nextList[eventName].length)
      delete this.nextList[eventName]
    }
    if (this.hearList[eventName]) {
      delete this.hearList[eventName]
    }
  }

  // 参与监听一种事件
  public listen(eventName: string|number, callback: Callback) {
    if (!this.list[eventName]) { this.list[eventName] = [] }
    // if (readHistory) {
    //   // 如果需要在创建时阅读历史推送
    //   for (const message of history[eventName]) {
    //     callback.apply(this, message)
    //   }
    // }

    this.list[eventName].push(callback)
  }

  // 与listen不同，是一次性的事件监听，即用即丢
  public once(eventName: string|number, callback: Callback) {
    if (this.history[eventName] && this.history[eventName].length > 0) {
      for (const item of this.history[eventName]) {
        callback.apply(this, item)
      }
      return
    }
    if (!this.onceList[eventName]) { this.onceList[eventName] = [] }
    this.onceList[eventName].push(callback)
  }

  // 下一帧触发且只触发一次
  public next(eventName: string|number, callback: Callback): void {
    if (this.history[eventName] && this.history[eventName].length > 0) {
      for (const item of this.history[eventName]) {
        callback.apply(this, item)
      }
      return
    }
    if (!this.nextList[eventName]) { this.nextList[eventName] = [] }
    this.nextList[eventName].push(callback)
  }

  // 对某种事件广播信息
  public broadcast(eventName: string|number, ...argus: unknown[]) {
    // console.log(eventName, ...argus)
    if (!this._runningStatus) {
      // console.log('can not broadcast:', eventName, ...argus, ', for it was stopped')
      return
    }
    if (this.onBroadcast) this.onBroadcast(eventName, ...argus)
    // 对listen类型的监听者广播
    if (this.list[eventName] && this.list[eventName].length > 0) {
      for (const listener of this.list[eventName]) {
        listener.apply(this, argus)
      }
    }
    // 对once类型的监听者广播
    if (this.onceList[eventName] && this.onceList[eventName].length > 0) {
      for (const listener of this.onceList[eventName]) {
        listener.apply(this, argus)
      }
      this.onceList[eventName].splice(0, this.onceList[eventName].length)
    }
    // 对next类型的广播
    if (this.nextList[eventName] && this.nextList[eventName].length > 0) {
      for (const listener of this.nextList[eventName]) {
        this.nowList.push({
          callback: listener,
          params: argus
        })
      }
      this.nextList[eventName].splice(0, this.nextList[eventName].length)
      requestAnimationFrame(() => {
        for (const compute of this.nowList) {
          compute.callback.apply(this, argus)
        }
        this.nowList.splice(0, this.nowList.length)
      })
    }

    if (this.history[eventName]) { this.history[eventName].push(argus) }
  }

  // hear是一种一对一的特殊listen，因为唤起这种响应的tell只会对应一个hear，而不是可以进行广泛广播
  public hear(eventName: string|number, callback: Callback) {
    this.hearList[eventName] = callback
  }

  // 直连，相比起broadcast一对多广播，tell是保证一对一通信的，因此，也可以放心地直接返回返回值、
  public tell(eventName: string|number, ...argus: unknown[]):any {
    if (!this.hearList[eventName]) {
      console.warn('不存在这样的hear对象', eventName)
      return
    }

    return this.hearList[eventName].apply(this, argus)
  }

  // 相比broadcast会永远覆盖上一条也就是只会有最后一条历史记录
  // function cover(eventName)

  // 不建议remove掉once
  public remove(eventName: string|number, callback: Callback) {
    if (!this.list[eventName]) { return }
    const li = this.list[eventName].indexOf(callback)
    if (li > -1) { this.list[eventName].splice(li, 1) }
    if (li === -1) {
      const oi = this.list[eventName].indexOf(callback)
      if (oi > -1) { this.list[eventName].splice(oi, 1) }
    }
    // 空的数组清掉
    if (this.list[eventName].length === 0) { delete this.list[eventName] }
  }
  
  public start() {
    this._runningStatus = true
  }

  public stop() {
    this._runningStatus = false
  }

  public clear() {
    for (const key in this.list) {
      this.list[key].splice(0, this.list[key].length)
      delete this.list[key]
    }
    for (const key in this.onceList) {
      this.onceList[key].splice(0, this.onceList[key].length)
      delete this.onceList[key]
    }
    for (const key in this.nextList) {
      this.nextList[key].splice(0, this.nextList[key].length)
      delete this.nextList[key]
    }
    for (const key in this.history) {
      this.history[key].splice(0, this.history[key].length)
      delete this.history[key]
    }
    for (const key in this.sets) {
      this.sets[key] = null
      delete this.sets[key]
    }
    this.list = {}
    this.onceList = {}
    this.nextList = {}
    this.history = {}
    this.sets = {}
  }
}

export const subscriber = new Subscriber()

// Subscriber相关的事件名定义，任何在系统中使用的事件都要在Event里面定义，不推荐直接命名
// 按钮的指令也和这里的定义相关，你可以用subscriber绑定一个触发函数，并定义一个Event.YOUR_EVENT_NAME: eventName, 这时将按钮的command设置为eventName就可以触发这个事件绑定的对应触发函数
// 而不需要在command中使用的事件，则建议设置为一个小数字，来减小缓存
export const Event = {
  LEFT_LINE_ANIME: (i:number) => `left_anime_${i}`
}

export const Value = {
}

// command是一个由|分隔的由调用名和参数组成的字符串，该方法需要帮助用户把里面的数字参数自动从字符串转成数字
export const resolveCommand = (command:string):Array<any> => {
  const [commandName, ...commandArgus] = command.split('|')
  return [commandName, ...commandArgus.map((argu:string) => {
    if (argu === 'true') return true
    else if (argu === 'false') return false
    else if (argu === 'undefined') return undefined
    else if (argu === 'null') return null
    else if (argu === `${parseFloat(argu)}`) return parseFloat(argu)
    return argu
  })]
}
