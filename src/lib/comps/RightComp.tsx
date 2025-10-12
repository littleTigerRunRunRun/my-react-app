import DC from '../defaultConfig'
import LabelCount from './comp/LabelCount'
import Bezier from './comp/Bezier'

function RightComp({ props }:{ props: Record<string, any> }) {
  const points = {
    start: { x: 0, y: 0 },
    automated: { x: 240, y: -142 },
    resolveCase: { x: 480, y: -142 },
    manual: { x: 240, y: 142 },
    openCase: { x: 365, y: 220 } // { x: 240 + 125 + 40, y: 142 + 78 }
  }

  return <g className='right-comp' transform={`translate(${DC.center.size.width * 0.5}, 0)`}>
    <g className="automated">
      <Bezier
        start={{ x: points.start.x, y: points.start.y - 7 }}
        end={points.automated}
        extendS={72}
        bezier={[90, 0, 80, 0]}
        fill="none"
        stroke="#01FEF7"
        strokeWidth={14}
        opacity={0.6}
      />
      <Bezier
        start={points.automated}
        end={points.resolveCase}
        transform='translate(0, -4)'
        extendS={72}
        bezier={[90, 0, 80, 0]}
        fill="none"
        stroke="#01FEF7"
        strokeWidth={8}
        opacity={0.6}
      />
      <Bezier
        start={{ x: points.automated.x, y: points.automated.y + 4 }}
        end={{ x: points.openCase.x, y: points.openCase.y - 4 }}
        bezier={[100, 0, 105, 0]}
        fill="none"
        stroke="url(#svg_pt_lg_rightAutomated)"
        strokeWidth={8}
      />
      <g className="guide-line">
        <path
          d="M240,-142 L240,-203"
          fill="none"
          stroke="#01FEF7"
        />
        <circle
          cx="240"
          cy="-207"
          r="2"
          fill="#01FEF7"
        />
      </g>
      <g className="icon">
        <circle
          cx="240"
          cy="-142"
          fill="#000"
          r="21"
          style={{
            filter: 'drop-shadow(0px 0px 8px #01FEF7)'
          }}
        />
      </g>
      <LabelCount
        transform={`translate(220, -240)`}
        count={props.automated}
        labels={['AUTOMATED']}
        align="start"
      />
    </g>
    <g className="manual">
      <Bezier
        start={{ x: points.start.x, y: points.start.y + 7 }}
        end={points.manual}
        extendS={72}
        bezier={[90, 0, 80, 0]}
        fill="none"
        stroke="#97ACBD"
        strokeWidth={14}
        opacity={0.6}
      />
      <Bezier
        start={{ x: points.manual.x, y: points.manual.y - 4 }}
        end={{ x: points.resolveCase.x, y: points.resolveCase.y + 12 }}
        extendS={40}
        bezier={[140, 0, 100, 0]}
        fill="none"
        stroke="#97ACBD"
        strokeWidth={8}
        opacity={0.6}
      />
      <Bezier
        start={{ x: points.manual.x, y: points.manual.y + 4 }}
        end={{ x: points.openCase.x, y: points.openCase.y + 4 }}
        bezier={[80, 0, 65, 0]}
        fill="none"
        stroke="url(#svg_pt_lg_rightManual)"
        strokeWidth={8}
      />
      <g className="guide-line">
        <path
          d="M240,142 L240,203"
          fill="none"
          stroke="#97ACBD"
        />
        <circle
          cx="240"
          cy="207"
          r="2"
          fill="#97ACBD"
        />
      </g>
      <g className="icon">
        <circle
          cx="240"
          cy="142"
          fill="#000"
          r="21"
          style={{
            filter: 'drop-shadow(0px 0px 8px #97ACBD)'
          }}
          // stroke="#01FEF7"
          // stroke-width="2"
        />
      </g>
      <LabelCount
        transform={`translate(220, 250)`}
        count={props.manual}
        labels={['MANUAL']}
        align="start"
      />
    </g>
    <LabelCount
      transform={`translate(500, -142)`}
      count={props.resolvedCases}
      labels={['RESOLVED', 'CASES']}
      align="start"
    />
    <g className="openCases">
      {
        // @ts-ignore
        Object.entries(props.openCases).map(([key, value]:['safe' | 'low' | 'middle' | 'high' | 'critical', number], index) => {
          return <g key={key}>
            <Bezier
              start={{ x: points.openCase.x - 1, y: points.openCase.y + (index - 1.5) * 4 }}
              end={{ x: points.openCase.x + 40, y: points.openCase.y + (index - 1.5) * 35 }}
              bezier={[25, 0, 25, 0]}
              stroke={`url(#svg_pt_lg_right_${key})`}
              strokeWidth={4}
            />
            {/* <path
              d="M364,215 C390,215 380,165 405,165"
              stroke={`url(#svg_pt_lg_right_${key})`}
              strokeWidth="4"
            /> */}
            <g transform={`translate(425, ${153 + index * 35})`}>
              <rect
                width="24"
                height="24"
                rx="3"
                ry="3"
                fill={DC.global.color[key]}
              />
              <text x="12" y="13" textAnchor="middle" dominantBaseline="middle" fill="#fff">{key.charAt(0).toUpperCase()}</text>
              <text x="28" y="12" fontSize="14" textAnchor="start" dominantBaseline="middle" fill="#D6E9FE">{props.openCases[key]}</text>
            </g>
          </g>
        })
      }
      <LabelCount
        transform={`translate(500, 220)`}
        count={props.openCases.critical + props.openCases.high + props.openCases.middle + props.openCases.low}
        labels={['OPEN', 'CASES']}
        align="start"
      />
    </g>
  </g>
}

export default RightComp