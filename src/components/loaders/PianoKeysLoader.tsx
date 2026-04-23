import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{w:6,h:28,gap:3}, md:{w:9,h:40,gap:4}, lg:{w:12,h:52,gap:5} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-piano{0%,100%{transform:scaleY(1);opacity:0.3}50%{transform:scaleY(0.7);opacity:1}}`;document.head.appendChild(el);}
export const PianoKeysLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{w,h,gap}=CONFIGS[size];const c=resolveColor(variant,color);const n=6;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'flex-end',gap}}>
      {Array.from({length:n},(_,i)=>(
        <div key={i} style={{width:w,height:h,background:c,borderRadius:'2px 2px 4px 4px',transformOrigin:'bottom',animation:`rla-piano ${animationDuration}s ease-in-out ${(i/n)*animationDuration}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
PianoKeysLoader.displayName='PianoKeysLoader';
