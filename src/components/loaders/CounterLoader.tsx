import { memo, useState, useEffect } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:44,fs:11},md:{s:60,fs:15},lg:{s:76,fs:19}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-cprog{from{stroke-dashoffset:163}to{stroke-dashoffset:0}}`;document.head.appendChild(el);}
export const CounterLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();
  const{s,fs}=CONFIGS[size];const c=resolveColor(variant,color);const r=s*0.39;const circ=2*Math.PI*r;
  const [pct,setPct]=useState(0);
  useEffect(()=>{
    if(!visible)return;
    let start:number|null=null;
    let raf:number;
    const tick=(ts:number)=>{
      if(!start)start=ts;
      const elapsed=(ts-start)%(animationDuration*1000);
      setPct(Math.round((elapsed/(animationDuration*1000))*100));
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[animationDuration,visible]);
  if(!visible)return null;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={3} opacity={0.15}/>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={3} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)}
        style={{transform:'rotate(-90deg)',transformOrigin:'center'}}/>
      <text x={s/2} y={s/2} textAnchor="middle" dominantBaseline="central"
        fill={c} fontSize={fs} fontFamily="monospace" fontWeight={600}>{pct}%</text>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CounterLoader.displayName='CounterLoader';
