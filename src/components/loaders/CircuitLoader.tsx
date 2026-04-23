import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40,sw:2}, md:{s:56,sw:2.5}, lg:{s:72,sw:3} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-circuit{0%{stroke-dashoffset:320}100%{stroke-dashoffset:0}}@keyframes rla-node{0%,100%{opacity:0.2}50%{opacity:1}}`;document.head.appendChild(el);}
export const CircuitLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);
  const path="M 15,50 L 30,50 L 30,25 L 50,25 L 50,15 L 70,15 L 70,30 L 85,30 L 85,50 L 70,50 L 70,70 L 55,70 L 55,85 L 35,85 L 35,70 L 15,70 Z";
  const nodes=[[30,50],[50,25],[70,15],[85,30],[70,50],[55,70],[35,85]];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox="0 0 100 100">
      <path d={path} fill="none" stroke={c} strokeWidth={sw} opacity={0.15}/>
      <path d={path} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeDasharray={320} style={{animation:`rla-circuit ${animationDuration}s linear infinite`}}/>
      {nodes.map(([nx,ny],i)=>(<circle key={i} cx={nx} cy={ny} r={sw*1.5} fill={c} style={{animation:`rla-node ${animationDuration*0.5}s ease-in-out ${i*0.2}s infinite`}}/>))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CircuitLoader.displayName='CircuitLoader';
