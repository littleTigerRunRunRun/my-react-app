import { Event, Value, subscriber } from '../utils/Subscriber'
import pic_back from '../../assets/back.png'

function BackComp({ text }:{ text: string }) {
  return  <g className="inventory-back">
    <image
      x="-730"
      y="-368"
      href={pic_back}
      width="11"
      height="18"
    />
    <text
      x="-706"
      y="-355"
      fontSize="28"
      fill="#fff"
      dominantBaseline="middle"
      textAnchor="start"
      onClick={() => {
        subscriber.broadcast(Event.DIG, ['main'])
      }}
    >{text}</text>
    <rect
      fill="rgba(0, 0, 0, 0)"
      x="-738"
      y="-377"
      width="246"
      height="41"
      style={{ cursor: 'pointer' }}
      onClick={() => subscriber.broadcast(Event.DIG, ['main'])}
    />
  </g>
}

export default BackComp