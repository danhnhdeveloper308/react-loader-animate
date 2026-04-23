import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-tring1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-tring2{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}`;document.head.appendChild(el);}
export const TriangleRingLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  const tri=(r:number)=>{const h=r*Math.sin(Math.PI/3);return `${cx},${cx-r} ${cx+r*0.866},${cx+h*0.5} ${cx-r*0.866},${cx+h*0.5}`};
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <polygon points={tri(cx*0.82)} fill="none" stroke={c} strokeWidth={2.5}
        style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-tring1 ${animationDuration}s linear infinite`}}/>
      <polygon points={tri(cx*0.55)} fill="none" stroke={c} strokeWidth={2} opacity={0.65}
        style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-tring2 ${animationDuration*1.4}s linear infinite`}}/>
      <circle cx={cx} cy={cx} r={cx*0.12} fill={c}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
TriangleRingLoader.displayName='TriangleRingLoader';
