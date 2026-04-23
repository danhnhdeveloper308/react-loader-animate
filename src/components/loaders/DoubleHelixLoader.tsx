import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{w:30,h:48,n:7},md:{w:40,h:64,n:9},lg:{w:50,h:80,n:11}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-dhelix{0%{transform:scaleX(1)}50%{transform:scaleX(-1)}100%{transform:scaleX(1)}}`;document.head.appendChild(el);}
export const DoubleHelixLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{w,h,n}=CONFIGS[size];const c=resolveColor(variant,color);const step=h/(n-1);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {Array.from({length:n},(_,i)=>{
        const y=i*step;const t=i/n;
        const x1=w*0.1+Math.sin(t*Math.PI*2)*w*0.35+w*0.35;
        const x2=w*0.9-Math.sin(t*Math.PI*2)*w*0.35-w*0.35;
        return(<g key={i}>
          <line x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth={1} opacity={0.3}/>
          <circle cx={x1} cy={y} r={w*0.08} fill={c} opacity={0.9-Math.abs(Math.sin(t*Math.PI))*0.4}
            style={{animation:`rla-dhelix ${animationDuration}s ease-in-out ${-t*animationDuration}s infinite`}}/>
          <circle cx={x2} cy={y} r={w*0.08} fill={c} opacity={0.5+Math.abs(Math.sin(t*Math.PI))*0.4}
            style={{animation:`rla-dhelix ${animationDuration}s ease-in-out ${-(t+0.5)*animationDuration}s infinite`}}/>
        </g>);
      })}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
DoubleHelixLoader.displayName='DoubleHelixLoader';
