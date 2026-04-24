import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-yyrot{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const YingYangLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-yyrot ${animationDuration}s linear infinite`}}>
      {/* Outer circle */}
      <circle cx={r} cy={r} r={r-1} fill="none" stroke={c} strokeWidth={1.5}/>
      {/* Left half filled */}
      <path d={`M ${r},1 A ${r-1},${r-1} 0 0 0 ${r},${s-1} A ${r/2-0.5},${r/2-0.5} 0 0 0 ${r},${r} A ${r/2-0.5},${r/2-0.5} 0 0 1 ${r},1 Z`} fill={c} opacity={0.85}/>
      <circle cx={r} cy={r/2} r={r*0.14} fill={c} opacity={0.25}/>
      <circle cx={r} cy={r+r/2} r={r*0.14} fill={c}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
YingYangLoader.displayName='YingYangLoader';
