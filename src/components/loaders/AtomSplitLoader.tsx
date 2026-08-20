import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
export const AtomSplitLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  const orbits=[{ra:0,sw:1.8},{ra:60,sw:1.5},{ra:120,sw:1.6}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {orbits.map(({ra,sw},i)=>(
        <ellipse key={i} cx={s/2} cy={s/2} rx={s*0.44} ry={s*0.18} fill="none" stroke={c}
          strokeWidth={sw} opacity={0.85}
          style={{['--ra' as string]:`${ra}deg`,transform:`rotate(${ra}deg)`,transformOrigin:`${s/2}px ${s/2}px`,
            animation:`rla-asplit ${animationDuration}s ease-in-out ${i*(animationDuration/3)}s infinite`}}/>
      ))}
      <circle cx={s/2} cy={s/2} r={s*0.1} fill={c}
        style={{animation:`rla-acore ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
