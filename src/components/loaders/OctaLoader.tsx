import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,sw:3}, md:{s:52,sw:4}, lg:{s:68,sw:5} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-octa{0%{stroke-dashoffset:0;transform:rotate(0deg)}100%{stroke-dashoffset:-240;transform:rotate(360deg)}}`;document.head.appendChild(el);}
function octagonPath(cx:number,cy:number,r:number):string{
  const pts=Array.from({length:8},(_,i)=>{const a=i*Math.PI/4-Math.PI/8;return`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;});
  return`M${pts.join('L')}Z`;
}
export const OctaLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.5}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r=cx-sw*1.5;
  const perim=8*2*r*Math.sin(Math.PI/8)*1.02;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <path d={octagonPath(cx,cx,r)} fill="none" stroke={c} strokeWidth={sw} opacity={0.15}/>
      <path d={octagonPath(cx,cx,r)} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${perim*0.3} ${perim*0.7}`} style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-octa ${animationDuration}s linear infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
OctaLoader.displayName='OctaLoader';
