import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40,sw:3},md:{s:56,sw:4},lg:{s:72,sw:5}};
export const SplitRingLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2-sw;const circ=2*Math.PI*r;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {/* top half arc */}
      <path d={`M ${sw} ${s/2} A ${r} ${r} 0 0 1 ${s-sw} ${s/2}`} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"
        style={{animation:`rla-sringT ${animationDuration}s ease-in-out infinite`}}/>
      {/* bottom half arc */}
      <path d={`M ${s-sw} ${s/2} A ${r} ${r} 0 0 1 ${sw} ${s/2}`} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"
        opacity={0.7} style={{animation:`rla-sringB ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
