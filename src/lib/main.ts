import { Leafer, Rect, ResizeEvent } from 'leafer-ui'
import { CenterGroup } from './comps/CenterComp'

let leafer:Leafer|undefined

export function init(container:HTMLDivElement) {
  if (!leafer) {
    // const { width, height } = container.getBoundingClientRect()
    leafer = new Leafer({
      view: container,
      // width,
      // height,
      fill: '#000505'
    })
    leafer.on(ResizeEvent.RESIZE, function (e: ResizeEvent) {
      // resize
      console.log(e.width, e.height, e.old)
    })

    leafer.add(new CenterGroup())
  }
}

export function destroy() {

}