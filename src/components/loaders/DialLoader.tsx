import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-dial{0%{transform:rotate(-120deg)}50%{transform:rotate(120deg)}100%{transform:rotate(-120deg)}}`;document.head.appendChild(el);}
export const DialLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r=cx*0.85;
  const ticks=Array.from({length:9},(_,i)=>{const a=-120+i*30;const rad=a*Math.PI/180;return{x1:cx+(r-s*0.08)*Math.cos(rad),y1:cx+(r-s*0.08)*Math.sin(rad),x2:cx+r*Math.cos(rad),y2:cx+r*Math.sin(rad)};});
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <path d={`M ${cx+r*Math.cos(-120*Math.PI/180)} ${cx+r*Math.sin(-120*Math.PI/180)} A ${r} ${r} 0 1 1 ${cx+r*Math.cos(120*Math.PI/180)} ${cx+r*Math.sin(120*Math.PI/180)}`} fill="none" stroke={c} strokeWidth={1.5} opacity={0.15}/>
      {ticks.map((t,i)=><line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={c} strokeWidth={1} opacity={0.25}/>)}
      <circle cx={cx} cy={cx} r={s*0.06} fill={c}/>
      <line x1={cx} y1={cx} x2={cx} y2={cx-r*0.7} stroke={c} strokeWidth={2} strokeLinecap="round" style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-dial ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
DialLoader.displayName='DialLoader';
