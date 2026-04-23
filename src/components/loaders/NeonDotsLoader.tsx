import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{d:8,gap:8}, md:{d:12,gap:10}, lg:{d:16,gap:13} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-neondot{0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1.2);opacity:1}}`;document.head.appendChild(el);}
export const NeonDotsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{d,gap}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'center',gap}}>
      {[0,0.25,0.5].map((delay,i)=>(
        <div key={i} style={{width:d,height:d,borderRadius:'50%',background:c,boxShadow:`0 0 ${d*0.6}px ${c},0 0 ${d*1.2}px ${c}`,animation:`rla-neondot ${animationDuration}s ease-in-out ${delay*animationDuration}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
NeonDotsLoader.displayName='NeonDotsLoader';
