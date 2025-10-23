import { useState } from "react"

function NumberUnit(props: {
  num: string,
  x: number,
  height: number,
  mask: string,
  attr: React.SVGProps<SVGTextElement>
}) {
  const nums = ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const position = nums.indexOf(props.num)
  console.log(position)

  return <g className="number-unit" transform={`translate(${props.x}, 0)`} mask={props.mask}>
     {/* mask={props.mask} */}
    <g className="move" style={{
      transform: `translate(0, ${position * -props.height}px)`
    }}>
      {
        nums.map((num, index) => {
          return <text
            key={index}
            {...props.attr}
            x={0}
            y={index * props.height}
          >
            { num }
          </text>
        })
      }
    </g>
  </g>
}

// 4位数以内的带千分符和单位的数字滚动动画
function ScrollNumber(props: {
  count: string,
  // width: number,
  // height: number,
  // interval: number,
  attr: React.SVGProps<SVGTextElement>
}) {
  // const numstrs = 
  const height = 48
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [num3, setNum3] = useState('')
  const [num4, setNum4] = useState('0')

  console.log('setNum1', setNum1)

  return <g className="comp-scroll-number">
    <NumberUnit
      num={num1}
      x={0}
      height={height}
      mask="url(#svg_pt_csn_mask)"
      attr={props.attr}
    />
    <NumberUnit
      num={num2}
      x={25}
      height={height}
      mask="url(#svg_pt_csn_mask)"
      attr={props.attr}
    />
    <NumberUnit
      num={num3}
      x={50}
      height={height}
      mask="url(#svg_pt_csn_mask)"
      attr={props.attr}
    />
    <NumberUnit
      num={num4}
      x={75}
      height={height}
      mask="url(#svg_pt_csn_mask)"
      attr={props.attr}
    />
  </g>
}

export default ScrollNumber