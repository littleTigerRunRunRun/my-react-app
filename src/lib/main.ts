import { Leafer, Rect } from 'leafer-ui'

let leafer:Leafer|undefined

export function init(container:HTMLDivElement) {
  if (!leafer) {
    const { width, height } = container.getBoundingClientRect()
    leafer = new Leafer({
      view: container,
      width,
      height,
      fill: '#000505'
    })

    leafer.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
  }
}

export function destroy() {

}