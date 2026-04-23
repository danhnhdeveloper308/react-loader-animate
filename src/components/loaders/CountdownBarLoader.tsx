import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{w:60,h:6}, md:{w:80,h:8}, lg:{w:100,h:10} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-countdown{0%{width:100%;opacity:1}95%{opacity:1}100%{width:0%;opacity:0.3}}`;document.head.appendChild(el);}
export const CountdownBarLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{w,h}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:w,height:h,background:`${c}20`,borderRadius:h/2,overflow:'hidden'}}>
      <div style={{height:'100%',background:c,borderRadius:h/2,animation:`rla-countdown ${animationDuration}s linear infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CountdownBarLoader.displayName='CountdownBarLoader';
