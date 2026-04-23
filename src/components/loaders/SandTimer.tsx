import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:36},md:{s:50},lg:{s:64}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-sandfall{0%,100%{height:0;opacity:0}20%,80%{opacity:1}50%{height:12px}}@keyframes rla-sandflip{0%,45%{transform:rotate(0deg)}55%,100%{transform:rotate(180deg)}}`;document.head.appendChild(el);}
export const SandTimer=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:s,height:s,display:'flex',alignItems:'center',justifyContent:'center',
      animation:`rla-sandflip ${animationDuration}s ease-in-out infinite`}}>
      <svg width={s} height={s} viewBox="0 0 60 60">
        <path d="M8,4 L52,4 L36,28 L52,56 L8,56 L24,28 Z" fill="none" stroke={c} strokeWidth={2.5} strokeLinejoin="round"/>
        <path d="M10,6 L50,6 L34,27 L34,27 L10,6Z" fill={c} opacity={0.5}/>
        <path d="M28,33 L32,33 L38,54 L22,54 Z" fill={c} opacity={0.7}
          style={{animation:`rla-sandfall ${animationDuration}s ease-in infinite`}}/>
      </svg>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SandTimer.displayName='SandTimer';
