import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40,dr:3}, md:{s:56,dr:4}, lg:{s:72,dr:5} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-orbital{0%,100%{opacity:0.2;transform:scale(0.6)}50%{opacity:1;transform:scale(1.2)}}`;document.head.appendChild(el);}
export const OrbitalDotsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.5}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,dr}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,n=8,r=cx*0.78;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={c} strokeWidth={0.5} opacity={0.15}/>
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*Math.PI*2;const x=cx+r*Math.cos(a),y=cx+r*Math.sin(a);
        return <circle key={i} cx={x} cy={y} r={dr} fill={c} style={{transformOrigin:`${x}px ${y}px`,animation:`rla-orbital ${animationDuration}s ease-in-out ${(i/n)*animationDuration}s infinite`}}/>;
      })}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
OrbitalDotsLoader.displayName='OrbitalDotsLoader';
