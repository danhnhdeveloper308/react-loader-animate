import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{w:28,h:44},md:{w:36,h:60},lg:{w:46,h:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-helix{from{stroke-dashoffset:0}to{stroke-dashoffset:-60}}`;document.head.appendChild(el);}
export const HelixLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{w,h}=CONFIGS[size];const c=resolveColor(variant,color);
  const n=8,step=h/n;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {['left','right'].map((side,si)=>(
        <path key={side}
          d={Array.from({length:n},(_,i)=>{
            const y0=i*step,y1=y0+step/2,y2=y0+step;
            const xMid=si===0?w*0.12:w*0.88;
            return `${i===0?'M':''} ${xMid},${y0} Q ${w/2},${y1} ${xMid},${y2}`;
          }).join(' ')}
          fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round"
          strokeDasharray={step*2} opacity={0.85}
          style={{animation:`rla-helix ${animationDuration}s linear infinite`,animationDelay:si===0?'0s':`${-animationDuration/2}s`}}
        />
      ))}
      {Array.from({length:n+1},(_,i)=>(
        <line key={i} x1={w*0.12} y1={i*step} x2={w*0.88} y2={i*step}
          stroke={c} strokeWidth={1.5} opacity={0.3}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
HelixLoader.displayName='HelixLoader';
