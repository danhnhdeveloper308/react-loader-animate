import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:36,sw:4},md:{s:52,sw:5},lg:{s:68,sw:6.5}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-garcspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const GradientArcLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2-sw;const circ=2*Math.PI*r;
  const id=`rla-garc-${s}`;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}
      style={{animation:`rla-garcspin ${animationDuration}s linear infinite`}}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c} stopOpacity={0.1}/>
          <stop offset="100%" stopColor={c} stopOpacity={1}/>
        </linearGradient>
      </defs>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={`url(#${id})`} strokeWidth={sw}
        strokeLinecap="round" strokeDasharray={circ*0.75+' '+circ*0.25}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
GradientArcLoader.displayName='GradientArcLoader';
