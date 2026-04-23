import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-chV{0%,100%{transform:translateY(-6px)}50%{transform:translateY(6px)}}@keyframes rla-chH{0%,100%{transform:translateX(-6px)}50%{transform:translateX(6px)}}@keyframes rla-chspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const CrosshairLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r=cx*0.82;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={c} strokeWidth={1} opacity={0.2}/>
      <circle cx={cx} cy={cx} r={r*0.15} fill="none" stroke={c} strokeWidth={1} opacity={0.4}/>
      <g style={{animation:`rla-chspin ${animationDuration*8}s linear infinite`,transformOrigin:`${cx}px ${cx}px`}}>
        {[0,90,180,270].map(a=>{const rad=a*Math.PI/180;const x1=cx+(r*0.3)*Math.cos(rad),y1=cx+(r*0.3)*Math.sin(rad),x2=cx+(r*0.7)*Math.cos(rad),y2=cx+(r*0.7)*Math.sin(rad);return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={1.5} opacity={0.7}/>;  })}
      </g>
      <line x1={cx} y1={cx-r} x2={cx} y2={cx-r*0.25} stroke={c} strokeWidth={1.5} strokeLinecap="round" style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-chV ${animationDuration}s ease-in-out infinite`}}/>
      <line x1={cx} y1={cx+r*0.25} x2={cx} y2={cx+r} stroke={c} strokeWidth={1.5} strokeLinecap="round" style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-chV ${animationDuration}s ease-in-out infinite`}}/>
      <line x1={cx-r} y1={cx} x2={cx-r*0.25} y2={cx} stroke={c} strokeWidth={1.5} strokeLinecap="round" style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-chH ${animationDuration}s ease-in-out infinite`}}/>
      <line x1={cx+r*0.25} y1={cx} x2={cx+r} y2={cx} stroke={c} strokeWidth={1.5} strokeLinecap="round" style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-chH ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CrosshairLoader.displayName='CrosshairLoader';
