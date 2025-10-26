import DC from '../defaultConfig'

function LeftRightComp(props: {}) {
  const CLR = DC.leftRight
  const keywords = [
    ['AI'],
    ['Correlation', 'Analysis'],
    ['IOC'],
    ['Threat', 'Intelligence'],
    ['Machine', 'Learning'],
  ]
  const dangerRate = 0.25
  const radiationNums = 200
  const radiations = []
  for (let i = 0; i < radiationNums; i++) {
    if (i / radiationNums < dangerRate) radiations.push(0)
    else radiations.push(1)
  }

  return <g
    className="left-right-comp"
    transform={`translate(${CLR.size.width * 0.5}, 0)`}
  >
    <defs>
      <linearGradient id="svg_pt_lr_ir_lg" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#ffffff " stopOpacity="0.2" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#ffffff " stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="svg_pt_lr_mr_lg" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#0089F5 " stopOpacity="1" />
        <stop offset="18%" stopColor="#0089F5" stopOpacity="0" />
        <stop offset="82%" stopColor="#00D5F5" stopOpacity="0" />
        <stop offset="100%" stopColor="#00D5F5 " stopOpacity="1" />
      </linearGradient>
      <radialGradient id="svg_pt_lr_rm_rg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="68%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id="svg_pt_lr_radiation_mask">
        <circle
          r={CLR.outerEndRadius}
          fill="url(#svg_pt_lr_rm_rg)"
        />
      </mask>
    </defs>
    <g className="innerCircle">
      <circle
        r={CLR.innerRadius}
        stroke="url(#svg_pt_lr_ir_lg)"
        strokeWidth="2"
        fill="none"
      />
      <circle
        r={CLR.mediumRadius}
        stroke="url(#svg_pt_lr_mr_lg)"
        strokeWidth="4"
        fill="none"
      />
      <g className="radiation-lines" mask="url(#svg_pt_lr_radiation_mask)">
        {
          radiations.map((radia, index) => {
            return <line
              key={`line_${index}`}
              x1={CLR.outerStartRadius}
              y1="0"
              x2={CLR.outerEndRadius}
              y2="0"
              stroke={radia ? "#0089F5" : "#F54E4E"}
              strokeWidth="1"
              stroke-opacity="0.5"
              transform={`rotate(${index / radiationNums * 360} 0, 0)`}
            />
          })
        }
      </g>
      <text
        {...CLR.centerText.percentNumberAttr as React.SVGProps<SVGTextElement>}
      >98</text>
      <text
        {...CLR.centerText.percentAttr as React.SVGProps<SVGTextElement>}
      >%</text>
      <text
        {...CLR.centerText.nameAttr as React.SVGProps<SVGTextElement>}
      >Rule Health</text>
      <text
        {...CLR.centerText.numAttr as React.SVGProps<SVGTextElement>}
      >82 Rules</text>
      {
        keywords.map((kw, index) => {
          const angle = index * Math.PI * 2 / keywords.length
          const x = Math.sin(angle) * CLR.outerStartRadius
          const y = -Math.cos(angle) * CLR.outerStartRadius
          return <g
            key={`kw_${index}`}
            className="keyword"
            transform={`translate(${x}, ${y})`}
          >
            <circle
              r={CLR.keywordRadius}
              fill="#000"
              stroke="#008FFF"
              strokeWidth="1"
            />
          </g>
        })
      }
    </g>
  </g>
}

export default LeftRightComp 