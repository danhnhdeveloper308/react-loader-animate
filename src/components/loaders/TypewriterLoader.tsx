import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{d:7,gap:5},md:{d:9,gap:7},lg:{d:12,gap:9}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-twink{0%,80%,100%{transform:scale(0);opacity:0}40%{transform:scale(1);opacity:1}}`;document.head.appendChild(el);}
export const TypewriterLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{d,gap}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'center',gap}}>
      {[0,0.2,0.4].map((delay,i)=>(
        <div key={i} style={{width:d,height:d,borderRadius:'50%',background:c,
          animation:`rla-twink ${animationDuration}s ease-in-out ${delay}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
TypewriterLoader.displayName='TypewriterLoader';
