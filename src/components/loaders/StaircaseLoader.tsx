import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{bw:6,gap:3,maxH:28}, md:{bw:9,gap:4,maxH:40}, lg:{bw:12,gap:5,maxH:52} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-stair{0%,100%{opacity:0.25}50%{opacity:1}}`;document.head.appendChild(el);}
export const StaircaseLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.5}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{bw,gap,maxH}=CONFIGS[size];const c=resolveColor(variant,color);const n=5;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'flex-end',gap}}>
      {Array.from({length:n},(_,i)=>(
        <div key={i} style={{width:bw,height:maxH*((i+1)/n),background:c,borderRadius:'2px 2px 0 0',animation:`rla-stair ${animationDuration}s ease-in-out ${(i/n)*animationDuration}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
StaircaseLoader.displayName='StaircaseLoader';
