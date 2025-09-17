import DC from '../defaultConfig'
import structurePic from '../../assets/structure.png'
import userPic from '../../assets/user.png'
import LabelCount from './comp/LabelCount'

function RightComp({ props }:{ props: Record<string, any> }) {
  const points = {
    automated: { x: 240, y: -142 },
    manual: { x: 240, y: 142 },
    resolveCase: { x: 480, y: -142 },
    openCase: { x: 240 + 125 + 40, y: 142 + 78 }
  }

  return <g className='right-comp' transform={`translate(${DC.center.size.width * 0.5}, 0)`}>
    <g className="automated">
      <path
        d={`M0,-7 L72,-7 C162,-7 160,-142 240,-142`}
        fill="none"
        stroke="#01FEF7"
        strokeWidth="14"
        opacity="0.6"
      />
      <path
        d={`M240,-146 L480,-146`}
        fill="none"
        stroke="#01FEF7"
        strokeWidth="8"
        opacity="0.6"
      />
      <path
        d={`M240,-134 C340,-188 260,217 365,217`}
        fill="none"
        stroke="url(#svg_pt_lg_rightAutomated)"
        strokeWidth="8"
        opacity="1"
      />
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
      <circle
        cx="240"
        cy="-142"
        fill="#000"
        r="21"
        style={{
          filter: 'drop-shadow(0px 0px 8px #01FEF7)'
        }}
        // stroke="#01FEF7"
        // stroke-width="2"
      />
      <image
        x="228"
        y="-155"
        width="24"
        height="24"
        href={structurePic}
      />
      <LabelCount
        transform={`translate(220, -240)`}
        count={props.automated}
        labels={['AUTOMATED']}
        align="start"
      />
    </g>
    <g className="manual">
      <path
        d={`M0,7 L72,7 C162,7 160,142 240,142`}
        fill="none"
        stroke="#97ACBD"
        strokeWidth="14"
        opacity="0.6"
      />
      <path
        d="M240,142 L240,203"
        fill="none"
        stroke="#97ACBD"
      />
      <path
        d={`M240,138 L280,138 C420,138, 380,-126 480,-130`}
        fill="none"
        stroke="#97ACBD"
        strokeWidth="8"
        opacity="0.6"
      />
      <path
        d={`M240,146 C320,130 300,223 365,223`}
        fill="none"
        stroke="url(#svg_pt_lg_rightManual)"
        strokeWidth="8"
        opacity="1"
      />
      <circle
        cx="240"
        cy="207"
        r="2"
        fill="#97ACBD"
      />
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
      <image
        x="230"
        y="131"
        width="20"
        height="20"
        href={userPic}
      />
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
      <g>
        <path
          d="M364,215 C390,215 380,165 405,165"
          stroke="url(#svg_pt_lg_rightC)"
          strokeWidth="4"
        />
        <g transform={`translate(425, 153)`}>
          <rect
            width="24"
            height="24"
            rx="3"
            ry="3"
            fill={DC.global.color.critical‌}
          />
          <text x="12" y="13" textAnchor="middle" dominantBaseline="middle" fill="#fff">C</text>
          <text x="28" y="12" fontSize="14" textAnchor="start" dominantBaseline="middle" fill="#D6E9FE">{props.openCases.critical}</text>
        </g>
        <path
          d="M364,218 C390,218 380,200 405,200"
          stroke="url(#svg_pt_lg_rightH)"
          strokeWidth="4"
        />
        <g transform={`translate(425, 188)`}>
          <rect
            width="24"
            height="24"
            rx="3"
            ry="3"
            fill={DC.global.color.high}
          />
          <text x="12" y="13" textAnchor="middle" dominantBaseline="middle" fill="#fff">H</text>
          <text x="28" y="12" fontSize="14" textAnchor="start" dominantBaseline="middle" fill="#D6E9FE">{props.openCases.high}</text>
        </g>
        <path
          d="M364,222 C390,222 380,235 405,235"
          stroke="url(#svg_pt_lg_rightM)"
          strokeWidth="4"
        />
        <g transform={`translate(425, 223)`}>
          <rect
            width="24"
            height="24"
            rx="3"
            ry="3"
            fill={DC.global.color.middle}
          />
          <text x="12" y="13" textAnchor="middle" dominantBaseline="middle" fill="#fff">M</text>
          <text x="28" y="12" fontSize="14" textAnchor="start" dominantBaseline="middle" fill="#D6E9FE">{props.openCases.middle}</text>
        </g>
        <path
          d="M364,225 C390,225 380,270 405,270"
          stroke="url(#svg_pt_lg_rightL)"
          strokeWidth="4"
        />
        <g transform={`translate(425, 259)`}>
          <rect
            width="24"
            height="24"
            rx="3"
            ry="3"
            fill={DC.global.color.low}
          />
          <text x="12" y="13" textAnchor="middle" dominantBaseline="middle" fill="#fff">L</text>
          <text x="28" y="12" fontSize="14" textAnchor="start" dominantBaseline="middle" fill="#D6E9FE">{props.openCases.low}</text>
        </g>
        {/* { x: 240 + 125 + 40, y: 142 + 78 } */}
      </g>
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