export { Tween, Timeline } from './tween'
export { Transition, TransitionGroup } from './transition'
export { Tick } from './tick'

// 动画系统是怎么样组成的呢？以电影拍摄为例，假如我们把自己放到导演的位置上，我们需要一个描述了所有的电影内容的剧本storyborad，它描述了我们需要演出的内容，演出所需的基础物料是演员和道具
// 所谓演员charactor，代表的是我们定义的动画可操作对象，其中包括主演（有自己专门的操作），和群演（根据某个要求进行可计算的协同动画）
// 对于演员，他的动画剧本是固定可描述的，但是对于群演，它们的动画数据往往是根据index或者某个配置参数通过一个公式计算出来的