import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40,sw:2.5},md:{s:56,sw:3},lg:{s:72,sw:4}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-spiralspin{from{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(0.9)}100%{transform:rotate(360deg) scale(1)}}`;document.head.appendChild(el);}
export const SpiralSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  const points=Array.from({length:60},(_,i)=>{const t=i/60*3*Math.PI;const r=cx*0.1+cx*0.75*(t/(3*Math.PI));return`${cx+r*Math.cos(t)},${cx+r*Math.sin(t)}`;}).join(' ');
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-spiralspin ${animationDuration}s ease-in-out infinite`}}>
      <polyline points={points} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" opacity={0.9}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SpiralSpinLoader.displayName='SpiralSpinLoader';
