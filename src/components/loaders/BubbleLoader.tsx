import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-bubble{0%{transform:translateY(0) scale(1);opacity:0.8}80%{opacity:0.3}100%{transform:translateY(-120%) scale(0.4);opacity:0}}`;document.head.appendChild(el);}
export const BubbleLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  const bubbles=[{x:20,y:78,r:8,delay:0},{x:45,y:82,r:11,delay:0.4},{x:70,y:75,r:7,delay:0.8},{x:30,y:90,r:6,delay:1.2},{x:62,y:88,r:9,delay:1.6}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox="0 0 100 100" overflow="hidden">
      {bubbles.map((b,i)=>(
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="none" stroke={c} strokeWidth="1.5" style={{animation:`rla-bubble ${animationDuration}s ease-out ${b.delay}s infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
BubbleLoader.displayName='BubbleLoader';
