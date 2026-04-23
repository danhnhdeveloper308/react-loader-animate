import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{w:32,h:24}, md:{w:46,h:34}, lg:{w:60,h:44} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-barrel{from{transform:rotate(0deg) translateX(0)}to{transform:rotate(360deg) translateX(0)}}@keyframes rla-barrelRoll{0%{transform:translateX(-100%) rotate(0deg)}100%{transform:translateX(100%) rotate(360deg)}}`;document.head.appendChild(el);}
export const BarrelLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.5}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{w,h}=CONFIGS[size];const c=resolveColor(variant,color);const rx=w/2,ry=h/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={{...wrapperStyle,overflow:'hidden',width:w*2.5}}>
    <div style={{width:w,height:h,animation:`rla-barrelRoll ${animationDuration}s linear infinite`}}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <ellipse cx={rx} cy={ry} rx={rx} ry={ry} fill="none" stroke={c} strokeWidth={2}/>
        <ellipse cx={rx} cy={ry} rx={rx*0.5} ry={ry} fill="none" stroke={c} strokeWidth={1.2} opacity={0.5}/>
        <line x1={0} y1={ry} x2={w} y2={ry} stroke={c} strokeWidth={1.5} opacity={0.4}/>
        <line x1={rx} y1={0} x2={rx} y2={h} stroke={c} strokeWidth={1.5} opacity={0.3}/>
      </svg>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
BarrelLoader.displayName='BarrelLoader';
