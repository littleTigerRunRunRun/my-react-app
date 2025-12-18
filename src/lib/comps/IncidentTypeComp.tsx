import DC from '../defaultConfig'
import { getBezier } from '../utils'
import { useState } from 'react'

function customSort(arr:Array<'low' | 'middle' | 'high' | 'critical' | 'normal'>) {
  const order = ['normal', 'low', 'middle', 'high', 'critical'];
  return arr.sort((a, b) => order.indexOf(b) - order.indexOf(a));
}

function IncidentType({ props }: {
  props: {
    openIncidents: {
      low: number,
      middle: number,
      high: number,
      critical: number,
    },
    attackList: Array<{ num: number, name: string, type: Array<'low' | 'middle' | 'high' | 'critical' | 'normal'> }>
  }
}) {
  const CI = DC.incident
  const [hoveringSafe, setHoveringSafe] = useState<'low' | 'middle' | 'high' | 'critical' | 'normal' | ''>('')

  return <>
    {
      [
        { text: 'C', type: 'critical', color: '#F54E4E', number: props.openIncidents.critical },
        { text: 'H', type: 'high', color: '#F77E45', number: props.openIncidents.high },
        { text: 'M', type: 'middle', color: '#F7C034', number: props.openIncidents.middle },
        { text: 'L', type: 'low', color: '#1DB440', number: props.openIncidents.low },
      ].map(({ text, type, color, number }, index) => {
        return <g className="safe-level-item" key={`linel${index}`}>
          <path
            d={
              getBezier({
                start: { x: CI.details.startX, y: (index - 1.5) * CI.details.lineStartSpan },
                end: { x: CI.details.startX + CI.details.lineLength, y: (index - 1.5) * CI.details.lineEndSpan },
                extendS: 15,
                extendE: 15,
                bezier: [4, 0, 4, 0]
              })
            }
            stroke={`url(#svg_pt_ic_${text}_lg)`}
            strokeWidth="1"
            fill="none"
          />
          <g
            className="safe-type"
            onMouseEnter={() => setHoveringSafe(type as any)}
            onMouseLeave={() => setHoveringSafe('')}
          >
            <circle
              cx={CI.details.startX + CI.details.lineLength + CI.details.outerCR}
              cy={(index - 1.5) * CI.details.lineEndSpan}
              fill="none"
              stroke={color}
              strokeWidth={CI.details.outerWidth}
              r={CI.details.outerCR}
            />
            <circle
              cx={CI.details.startX + CI.details.lineLength + CI.details.outerCR}
              cy={(index - 1.5) * CI.details.lineEndSpan}
              fill={color}
              r={CI.details.innerCR}
            />
            <text
              {...CI.details.text as React.SVGProps<SVGTextElement>}
              y={(index - 1.5) * CI.details.lineEndSpan + 1}
            >{text}</text>
            <text
              className="type-num"
              {...CI.details.number as React.SVGProps<SVGTextElement>}
              y={(index - 1.5) * CI.details.lineEndSpan + 1}
            >{number}</text>
          </g>
        </g>
      })
    }
    <text
      {...CI.details.attackList as React.SVGProps<SVGTextElement>}
      x={CI.details.attackListX}
      y={(-1 - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight}
      fontSize="14"
      fill="#fff"
    >MITRE ATT&CK®</text>
    {
      props.attackList.map(({ type, num, name }, index) => {
        return <g className="type-line-group" key={`linel${index}`}>
          <text
            {...CI.details.attackList as React.SVGProps<SVGTextElement>}
            x={CI.details.attackListX}
            y={(index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight}
            fill={(hoveringSafe && type.includes(hoveringSafe)) ? '#FFFFFF' : '#ABABAC'}
          >{ num }</text>
          <text
            {...CI.details.attackList as React.SVGProps<SVGTextElement>}
            x={CI.details.attackListNameX}
            y={(index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight}
            fill={(hoveringSafe && type.includes(hoveringSafe)) ? '#FFFFFF' : '#ABABAC'}
          >{ name }</text>
          {
            customSort(type).map((t, tIndex) => {
              // tIndex - (type.length - 1) * 0.5
              if (t === 'critical') return <path
                className="type-line"
                key={`linel_${index}_${tIndex}`}
                d={
                  getBezier({
                    start: { x: CI.details.rlineStartX, y: -54 },
                    end: { x: CI.details.rlineStartX + CI.details.lineLength, y: (index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight + (tIndex - (type.length - 1) * 0.5) * CI.details.lineEndTypeSpan },
                    extendS: 12,
                    extendE: 12,
                    bezier: [7, 0, 7, 0]
                  })
                }
                stroke="#F54E4E"
                strokeWidth="1"
                strokeOpacity={hoveringSafe && hoveringSafe !== 'critical' ? 0.3 : 1}
                fill="none"
              />
              if (t === 'high') return <path
                className="type-line"
                key={`linel_${index}_${tIndex}`}
                d={
                  getBezier({
                    start: { x: CI.details.rlineStartX, y: -18 },
                    end: { x: CI.details.rlineStartX + CI.details.lineLength, y: (index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight + (tIndex - (type.length - 1) * 0.5) * CI.details.lineEndTypeSpan },
                    extendS: 12,
                    extendE: 12,
                    bezier: [7, 0, 7, 0]
                  })
                }
                stroke="#F77E45"
                strokeWidth="1"
                strokeOpacity={hoveringSafe && hoveringSafe !== 'high' ? 0.3 : 1}
                fill="none"
              />
              if (t === 'middle') return <path
                className="type-line"
                key={`linel_${index}_${tIndex}`}
                d={
                  getBezier({
                    start: { x: CI.details.rlineStartX, y: 18 },
                    end: { x: CI.details.rlineStartX + CI.details.lineLength, y: (index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight + (tIndex - (type.length - 1) * 0.5) * CI.details.lineEndTypeSpan },
                    extendS: 12,
                    extendE: 12,
                    bezier: [7, 0, 7, 0]
                  })
                }
                stroke="#F7C034"
                strokeWidth="1"
                strokeOpacity={hoveringSafe && hoveringSafe !== 'middle' ? 0.3 : 1}
                fill="none"
              />
              if (t === 'low') return <path
                className="type-line"
                key={`linel_${index}_${tIndex}`}
                d={
                  getBezier({
                    start: { x: CI.details.rlineStartX, y: 54 },
                    end: { x: CI.details.rlineStartX + CI.details.lineLength, y: (index - (props.attackList.length - 1) * 0.5) * CI.details.attackListHeight + (tIndex - (type.length - 1) * 0.5) * CI.details.lineEndTypeSpan },
                    extendS: 12,
                    extendE: 12,
                    bezier: [7, 0, 7, 0]
                  })
                }
                stroke="#1DB440"
                strokeWidth="1"
                strokeOpacity={hoveringSafe && hoveringSafe !== 'low' ? 0.3 : 1}
                fill="none"
              />
            })
          }
        </g>
      })
    }
  </>      
}

export default IncidentType