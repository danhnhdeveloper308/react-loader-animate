import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,sw:4}, md:{s:52,sw:5}, lg:{s:68,sw:6} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-neotrail{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-neoshine{0%,100%{opacity:0.6}50%{opacity:1}}`;document.head.appendChild(el);}
export const NeoTrailLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r=cx-sw;
  const circ=2*Math.PI*r;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-neotrail ${animationDuration}s linear infinite`}}>
      <defs>
        <linearGradient id={`rla-ng-${s}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c} stopOpacity={0}/>
          <stop offset="80%" stopColor={c} stopOpacity={1}/>
          <stop offset="100%" stopColor={c} stopOpacity={1}/>
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={c} strokeWidth={sw*0.3} opacity={0.1}/>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={`url(#rla-ng-${s})`} strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${circ*0.75} ${circ*0.25}`} style={{filter:`drop-shadow(0 0 ${sw}px ${c})`}}/>
      <circle cx={cx} cy={cx-r} r={sw*0.8} fill={c} style={{filter:`blur(${sw*0.3}px)`,animation:`rla-neoshine ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
NeoTrailLoader.displayName='NeoTrailLoader';
