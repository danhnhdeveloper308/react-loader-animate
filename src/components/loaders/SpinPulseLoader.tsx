import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40,sw:3},md:{s:56,sw:4},lg:{s:72,sw:5}};
export const SpinPulseLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2-sw;const circ=2*Math.PI*r;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-sppulse ${animationDuration}s ease-in-out infinite`}}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${circ*0.7} ${circ*0.3}`}/>
      <circle cx={s/2} cy={s/2} r={s*0.14} fill={c} style={{animation:`rla-sppcenter ${animationDuration*0.7}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
