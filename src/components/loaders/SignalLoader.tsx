import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:36},md:{s:48},lg:{s:62}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-signal{0%,100%{opacity:0.15}50%{opacity:1}}`;document.head.appendChild(el);}
export const SignalLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const n=5;const bw=s*0.1;const gap=s*0.06;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {Array.from({length:n},(_,i)=>{
        const h=s*0.2+s*0.16*i;const x=i*(bw+gap);const y=s-h;
        return(<rect key={i} x={x} y={y} width={bw} height={h} rx={bw*0.3} fill={c}
          style={{animation:`rla-signal ${animationDuration}s ease-in-out ${i*0.15}s infinite`}}/>);
      })}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SignalLoader.displayName='SignalLoader';
