import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{d:6,gap:5}, md:{d:9,gap:7}, lg:{d:12,gap:9} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-stepdot{0%,100%{transform:translateY(0);opacity:0.4}40%{transform:translateY(-12px);opacity:1}}`;document.head.appendChild(el);}
export const StepDotsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{d,gap}=CONFIGS[size];const c=resolveColor(variant,color);const n=5;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'flex-end',gap}}>
      {Array.from({length:n},(_,i)=>(
        <div key={i} style={{width:d,height:d*(0.5+i*0.2),background:c,borderRadius:'2px 2px 0 0',animation:`rla-stepdot ${animationDuration}s ease-in-out ${i*animationDuration/n}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
StepDotsLoader.displayName='StepDotsLoader';
