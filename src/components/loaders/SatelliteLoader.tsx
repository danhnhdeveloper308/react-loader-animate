import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40,dr:3}, md:{s:56,dr:4}, lg:{s:72,dr:5} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-satA{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-satB{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`;document.head.appendChild(el);}
export const SatelliteLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,dr}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <ellipse cx={cx} cy={cx} rx={cx*0.85} ry={cx*0.35} fill="none" stroke={c} strokeWidth={0.8} opacity={0.2}/>
      <circle cx={cx} cy={cx} r={cx*0.18} fill={c} opacity={0.85}/>
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-satA ${animationDuration}s linear infinite`}}>
        <circle cx={cx} cy={cx-cx*0.85} r={dr*0.8} fill={c}/>
      </g>
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-satA ${animationDuration*0.6}s linear infinite`,transform:'rotate(60deg)'}}>
        <circle cx={cx} cy={cx-cx*0.52} r={dr*1.2} fill={c} opacity={0.65}/>
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SatelliteLoader.displayName='SatelliteLoader';
