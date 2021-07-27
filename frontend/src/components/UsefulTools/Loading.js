export default function Loading ({ style = {} }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{
        ...style,
        margin: 'auto',
        background: 'none',
        display: 'block',
        shapeRendering: 'auto'
      }}
      width='200px'
      height='200px'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <rect
        x='17.5'
        y='30'
        width='15'
        height='40'
        fill='#4682b4'
      >
        <animate
          attributeName='y'
          repeatCount='indefinite'
          dur='.75s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='18;30;30'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
          begin='-0.2s'
        />
        <animate
          attributeName='height'
          repeatCount='indefinite'
          dur='.75s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='64;40;40'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
          begin='-0.2s'
        />
      </rect>
      <rect
        x='42.5'
        y='30'
        width='15'
        height='40'
        fill='#c0e3ff'
      >
        <animate
          attributeName='y'
          repeatCount='indefinite'
          dur='.75s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='21;30;30'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
          begin='-0.1s'
        />
        <animate
          attributeName='height'
          repeatCount='indefinite'
          dur='.75s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='58;40;40'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
          begin='-0.1s'
        />
      </rect>
      <rect
        x='67.5'
        y='30'
        width='15'
        height='40'
        fill='#0b385d'
      >
        <animate
          attributeName='y'
          repeatCount='indefinite'
          dur='.75s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='21;30;30'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
        />
        <animate
          attributeName='height'
          repeatCount='indefinite'
          dur='.75s'
          calcMode='spline'
          keyTimes='0;0.5;1'
          values='58;40;40'
          keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
        />
      </rect>
    </svg>
  );
}
