# 开发文档
本项目为交互式动态数据展示大屏，出于项目进度需要考虑采用的原生SVG + React实现。本文档用于梳理内容的组织构成，并且说明一些关键内容的技术实现思路，以协助后续接手者扩展内容、修改细节、解决问题。

## 路由
本大屏只具备一个很简单的下钻关系：（组件相关文件在`lib/comps`的一级）
```
main(MainLeft、MainCenter、MainRight)
 ├── Data Inventory(LeftLeft、LeftRight)
 └── Incident Overview(Incident、IncidentType)
```
路由在项目中是在`index.tsx`中通过`digArray`来控制的
```
main
 ├── dataInventory
 └── incident
```
比如下钻到`incident`时，`digArray`为`['main', 'incident']`。下钻或者返回时，会出现页面过渡动画，使用`CSSTransition`实现。

当路由切换时，组件会向外抛出`onDig`事件，该事件是一个同步回调函数，需要用户根据路由变化返回数据更新内容，来更新数据。

此外，`lib/comps/comp`，则是项目中的一些复用组件，比如`GlowBezier`组件就是多个页面中用到的贝塞尔流动线组件。

## 样式配置
本项目中绝大多数的样式配置都被抽取放在了一个配置表中，也就是`defaultConfig.ts`，可以用于迅速调整样式参数。

## 事件系统
本项目中为了防止出现不受控的内容刷新，并没有很多地使用react原生的数据绑定去触发更新，而是谨慎地使用一套订阅发布模式的事件系统`Subscriber（utils/Subscriber)`。这套系统能传递的东西包括事件`Event`和全局变量`Value`，可以通过这套系统进行跨组件的通信和变量传递。

本项目目前包含了如下事件：

`UPDATE_LINE_TARGET` 用于向`RandomLeftFlowline`系统传递需要控制动画的连线，具体使用在动画部分会详细说明。

`LINE_ANIME` 用于控制某一条连线的流线动画触发。

`DIG` 下钻状态变更。

本项目包含了如下全局变量：

`SVG_START_TIME` svg动画开始时间，svg默认动画系统的开始时间是从页面渲染开始的，因此需要控制开始时间来精细调整，这是svg动画的特性，不用深究。

## SVG技术栈需要关注的地方
本项目使用了大量SVG实现内容，这里简单讲一下和技术栈相关的点。

### defs和id
SVG中使用线性渐变linearGradient、径向渐变radialGradient、剪辑区域clipPath、蒙层mask、滤镜filter时，需要在defs标签中进行定义，并且命名一个id，然后在其他地方进行引用。例如：
```
<defs>
  <linearGradient id="svg_pt_lg_lc_ato_p5">
    <stop offset="0%" stopColor="#0167B6" stopOpacity="0.5" />
    <stop offset="100%" stopColor="#00DEFE" stopOpacity="0.5" />
  </linearGradient>
</defs>
<rect
  x="0"
  y="0"
  width="100"
  height="100"
  fill="url(#svg_pt_lg_lc_ato_p5)"
/>
```
可以看到本项目中任何涉及到defs内的内容，都用了一套极其复杂的id定义，嵌套了好多层，这是为了保证你的id和本项目其他地方，或者是html中加载的其他svg中的id不重复。以下是一个会出现问题的反例：
```
<!--svg1-->
<svg>
  <defs>
    <linearGradient id="lg">
      <stop offset="0%" stopColor="#f00" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#f00" stopOpacity="0.5" />
    </linearGradient>
  </defs>
  <rect
    x="0"
    y="0"
    width="100"
    height="100"
    fill="url(#lg)"
  />
</svg>
<!--svg2-->
<svg>
  <defs>
    <linearGradient id="lg">
      <stop offset="0%" stopColor="#00f" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#00f" stopOpacity="0.5" />
    </linearGradient>
  </defs>
  <rect
    x="0"
    y="0"
    width="100"
    height="100"
    fill="url(#lg)"
  />
</svg>
```
后者的同名id的linearGradient会被前者覆盖，导致显示错误。因此，基于我多年的经验，一个好的习惯是写这些内容时，需要根据本项目的项目名编写一套复杂的id规范，保证项目间、项目内不会出现问题。

### GlowBezier的曲线问题
`GlowBezier`组件提供了项目中的流线，根据设计，`GlowBezier`不是一个三次贝塞尔曲线，而是起点 - 横向线段 - 二次贝塞尔曲线 - 斜向线段 - 二次贝塞尔曲线 - 横向线段 - 终点。

而这个系统中涉及到一个技术问题，SVG在完全水平的横向连线上使用mask时会出现消失的问题，为了解决这个问题，横向连线尽量不要存在，至少起点和终点要有1px的竖向差距。入下面所示的处理：
```
<GlowBezier
  k={'mr_atr'}
  start={CR.automatedPosition.icon}
  end={{ x: CR.resolvedIncidentsPosition.icon.x, y: CR.resolvedIncidentsPosition.icon.y - 1}}
  extendS={0}
  extendE={0}
  bezier={[20, 0, 20, 0]}
  className="hover-thick-8"
  styleAttr={{
    innerLine: {
      fill: 'none',
      stroke: "#84dcff",
      strokeWidth: 3,
      strokeOpacity: 0.4
    },
    outerLine: {
      fill: 'none',
      stroke: 'url(#svg_pt_lg_lc_atr)',
      strokeWidth: 8,
      strokeLinecap: 'round',
      strokeOpacity: 0.6
    },
    flowLine: {
      fill: 'none',
      stroke: "#84dcff",
      strokeWidth: 3,
      strokeLinecap: 'round'
    }
  }}
  startAnimeBegin={`${svgTime + CR.anime.lineBegin2}s`}
  anime={Event.LINE_ANIME}
/>
```
这是项目中摘取的一段代码，`CR.automatedPosition.icon.y`和`CR.resolvedIncidentsPosition.icon.y`相同，因此需要手动做一点差值。

## 动画
本项目中最为复杂的一个系统就是动画，动画由路由过渡动画、交互动效、进入动画、更新动画、视觉特效组成，这里说一些比较复杂的部分。

### 关联流线动画
首先就是首页的流线关联动画，它是要求随机从左侧的数据源发出流线 - incidents到automated/manual - automated/manual到Resolved/Open这样的三级联动动画。为了实现这个，在animation.ts种开发了一个类RandomLeftFlowline。三级名为`left`、`right1`、`right2`。

在页面组件中，你需要配置这样的代码来确认哪些流线是这三级，如下所示：

```
subscriber.broadcast(Event.UPDATE_LINE_TARGET, items.map((_item, index) => `ml_${index}`), 'left')
subscriber.broadcast(Event.UPDATE_LINE_TARGET, ['mr_sta', 'mr_stm'], 'right1')
subscriber.broadcast(Event.UPDATE_LINE_TARGET, ['mr_atr', 'mr_ato', 'mr_mtr', 'mr_mto'], 'right2')
```

其中的`mr_atr`这样的id，需要配置给相应的`GlowBezier`组件的`k`属性，这样就会自动帮你处理三级关联流线动画。

### 进入动画
首页的左侧内容、流线、中间内容、右侧内容是逐级进入的，这是通过动画的开始时间、持续时间配置出来的视觉效果。