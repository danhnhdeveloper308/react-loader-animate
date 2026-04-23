import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{bw:4,maxH:28,gap:3}, md:{bw:6,maxH:40,gap:4}, lg:{bw:8,maxH:52,gap:5} };
const HEIGHTS = [0.4,0.75,1,0.85,0.55,0.9,0.65,0.45];
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-level{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}`;document.head.appendChild(el);}
export const LevelMeterLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.1}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{bw,maxH,gap}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'flex-end',gap,height:maxH}}>
      {HEIGHTS.map((h,i)=>(
        <div key={i} style={{width:bw,height:maxH*h,background:c,borderRadius:'2px 2px 0 0',transformOrigin:'bottom',animation:`rla-level ${animationDuration*(0.7+Math.random()*0.6)}s ease-in-out ${i*0.11}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
LevelMeterLoader.displayName='LevelMeterLoader';
