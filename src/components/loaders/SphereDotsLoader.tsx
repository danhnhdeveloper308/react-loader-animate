import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,dr:2.5}, md:{s:52,dr:3.5}, lg:{s:68,dr:4.5} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-sphsp{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const SphereDotsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,dr}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  const arcs=[{r:cx*0.88,n:8,dur:animationDuration,ry:cx*0.88},{r:cx*0.65,n:6,dur:animationDuration*1.3,ry:cx*0.28},{r:cx*0.45,n:4,dur:animationDuration*0.8,ry:cx*0.45}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {arcs.map((arc,ai)=>(
        <g key={ai} style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-sphsp ${arc.dur}s linear infinite`}}>
          {Array.from({length:arc.n},(_,i)=>{
            const angle=(i/arc.n)*Math.PI*2;
            const x=cx+Math.cos(angle)*arc.r*0.9,y=cx+Math.sin(angle)*arc.ry*0.6;
            const opacity=0.3+0.7*(Math.sin(angle)+1)/2;
            return <circle key={i} cx={x} cy={y} r={dr*(0.5+opacity*0.5)} fill={c} opacity={opacity}/>;
          })}
        </g>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SphereDotsLoader.displayName='SphereDotsLoader';
