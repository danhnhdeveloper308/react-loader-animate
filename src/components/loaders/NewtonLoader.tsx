import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:48},md:{s:64},lg:{s:80}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-newton-l{0%,50%,100%{transform:rotate(0deg)}25%{transform:rotate(-38deg)}}@keyframes rla-newton-r{0%,50%,100%{transform:rotate(0deg)}75%{transform:rotate(38deg)}}`;document.head.appendChild(el);}
export const NewtonLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const rod=s*0.55;const r=s*0.09;
  const ballX=[s*0.15,s*0.29,s*0.43,s*0.57,s*0.71,s*0.85];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <line x1={s*0.1} y1={s*0.12} x2={s*0.9} y2={s*0.12} stroke={c} strokeWidth={2} opacity={0.4}/>
      {ballX.map((bx,i)=>{
        const isLeft=i===0,isRight=i===5;
        const anim=isLeft?`rla-newton-l ${animationDuration}s ease-in-out infinite`:isRight?`rla-newton-r ${animationDuration}s ease-in-out infinite`:undefined;
        const style=anim?{transformOrigin:`${bx}px ${s*0.12}px`,animation:anim}:{};
        return(<g key={i} style={style}>
          <line x1={bx} y1={s*0.12} x2={bx} y2={s*0.12+rod} stroke={c} strokeWidth={1.2} opacity={0.5}/>
          <circle cx={bx} cy={s*0.12+rod+r} r={r} fill={c} opacity={0.9}/>
        </g>);
      })}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
NewtonLoader.displayName='NewtonLoader';
