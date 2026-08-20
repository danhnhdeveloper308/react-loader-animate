import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:44,fs:11},md:{s:60,fs:15},lg:{s:76,fs:19}};
export const CounterLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  const{s,fs}=CONFIGS[size];const c=resolveColor(variant,color);const r=s*0.39;const circ=2*Math.PI*r;
  if(!visible)return null;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={{position:'relative',width:s,height:s,...wrapperStyle}}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={3} opacity={0.15}/>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={3} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ}
        className="rla-counter-ring"
        style={{transform:'rotate(-90deg)',transformOrigin:'center',animationDuration:`${animationDuration}s`}}/>
    </svg>
    <span aria-hidden="true" className="rla-counter-label" style={{color:c,fontSize:fs,animationDuration:`${animationDuration}s`}}/>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
