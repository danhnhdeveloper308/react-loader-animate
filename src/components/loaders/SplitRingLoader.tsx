import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40,sw:3},md:{s:56,sw:4},lg:{s:72,sw:5}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-sringT{0%,100%{transform:translateY(0)}40%,60%{transform:translateY(-12px)}}@keyframes rla-sringB{0%,100%{transform:translateY(0)}40%,60%{transform:translateY(12px)}}`;document.head.appendChild(el);}
export const SplitRingLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2-sw;const circ=2*Math.PI*r;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {/* top half arc */}
      <path d={`M ${sw} ${s/2} A ${r} ${r} 0 0 1 ${s-sw} ${s/2}`} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"
        style={{animation:`rla-sringT ${animationDuration}s ease-in-out infinite`}}/>
      {/* bottom half arc */}
      <path d={`M ${s-sw} ${s/2} A ${r} ${r} 0 0 1 ${sw} ${s/2}`} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"
        opacity={0.7} style={{animation:`rla-sringB ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SplitRingLoader.displayName='SplitRingLoader';
