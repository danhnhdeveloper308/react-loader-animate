import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,sw:4}, md:{s:52,sw:5}, lg:{s:68,sw:6} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-arcA{from{transform:rotate(-90deg)}to{transform:rotate(270deg)}}@keyframes rla-arcB{from{transform:rotate(90deg)}to{transform:rotate(-270deg)}}`;document.head.appendChild(el);}
export const ArcSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r1=cx-sw,r2=cx-sw*2.8;
  const c1=2*Math.PI*r1,c2=2*Math.PI*r2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cx} r={r1} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${c1*0.65} ${c1*0.35}`} style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-arcA ${animationDuration}s linear infinite`}}/>
      <circle cx={cx} cy={cx} r={r2} fill="none" stroke={c} strokeWidth={sw*0.7} strokeLinecap="round" strokeDasharray={`${c2*0.4} ${c2*0.6}`} opacity={0.6} style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-arcB ${animationDuration*1.3}s linear infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ArcSpinLoader.displayName='ArcSpinLoader';
