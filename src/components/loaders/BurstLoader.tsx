import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
export const BurstLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const n=6;const d=s*0.14;const r=s*0.32;const cx=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*2*Math.PI;
        return(<circle key={i} cx={cx+r*Math.cos(a)} cy={cx+r*Math.sin(a)} r={d/2} fill={c}
          style={{animation:`rla-burstp${i} ${animationDuration}s ease-in-out ${i*(animationDuration/n)*0.15}s infinite`}}/>);
      })}
      <circle cx={cx} cy={cx} r={d*0.55} fill={c} opacity={0.5}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
