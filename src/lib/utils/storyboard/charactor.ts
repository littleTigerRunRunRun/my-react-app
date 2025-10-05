export type CharactorEngrave = 'start' | 'now' | 'end'

export type CharactorDescription = {
  name: string
  masses: boolean
  num: number
  engrave?: Record<string, CharactorEngrave> // 动画如果被中途截断，是否需要记住数值，start是回退到起点，now是保持当前，end是行进到终点
}

export class Charactor {
  name: string
  masses: boolean
  num: number
  engrave: Record<string, CharactorEngrave> = {}
  constructor(charactor:CharactorDescription) {
    this.name = charactor.name
    this.num = charactor.num || 1
    this.masses = charactor.masses || false
    if (charactor.engrave) {
      for (let key in charactor.engrave) {
        this.engrave[key] = charactor.engrave[key]
      }
    }
  }
}

export type PropDescription = {
  name: string
  value?: any
}
class Prop {
  name:string = ''
  isFunction = false
  value = null
  constructor(prop:PropDescription) {
    this.name = prop.name
    this.isFunction = typeof prop.value === 'function'
    this.value = prop.value
  }
  // 根据某个规则获取值，value可以是固定值，当value传入是一个函数时，isFunction将是true
  // 对于固定值的前者，getValue不需要传入任何值返回value即可，否则将需要传入一个参数，这个参数依据Prop的定义而定
  getValue(key) {
    if (!this.value) {
      console.error(`名为${this.name}的道具未就位`)
      return
    }
    if (this.type === 'function') return this.value(index)
    else if (this.value instanceof Array) return this.value[index]
    else return this.value
  }
}

let directorLastestId = 0 // 全局有多个剧本的情况下，用这个id区分演员池和道具池
const _charactors:Record<string, Charactor> = {} // 演员池
const _props:Record<string, any> = {} // 道具集，道具包含了数据和通过序列生成数据的工具函数
// 一个抽象类，它会存储最近的directorId作为指针，并且将自动找寻自己对应的props和charactors
class IdObject {
  directorId:string
  constructor(directorId:string) {
    this.directorId = directorId
  }
  get charactors() { return _charactors[this.directorId] }
  get props() { return _props[this.directorId] }
}