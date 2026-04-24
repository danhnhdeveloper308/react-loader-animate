import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40,sw:8},md:{s:56,sw:11},lg:{s:72,sw:14}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-donut{0%{transform:rotate(0deg);stroke-dashoffset:0}100%{transform:rotate(360deg);stroke-dashoffset:-120}}`;document.head.appendChild(el);}
export const DonutSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2-sw/2;const circ=2*Math.PI*r;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={sw} opacity={0.12}/>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${circ*0.35} ${circ*0.65}`}
        style={{animation:`rla-donut ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
DonutSpinLoader.displayName='DonutSpinLoader';
