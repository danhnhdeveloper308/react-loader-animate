import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40,sw:3},md:{s:56,sw:4},lg:{s:72,sw:5}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-arcball{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes rla-arcball2{0%{transform:rotate(0deg)}100%{transform:rotate(-360deg)}}`;document.head.appendChild(el);}
export const ArcBallLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2-sw;const r2=r*0.55;const circ=2*Math.PI*r;const circ2=2*Math.PI*r2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${circ*0.65} ${circ*0.35}`}
        style={{animation:`rla-arcball ${animationDuration}s cubic-bezier(0.4,0,0.6,1) infinite`}}/>
      <circle cx={s/2} cy={s/2} r={r2} fill="none" stroke={c} strokeWidth={sw*0.7} strokeLinecap="round"
        opacity={0.7} strokeDasharray={`${circ2*0.4} ${circ2*0.6}`}
        style={{animation:`rla-arcball2 ${animationDuration*0.8}s cubic-bezier(0.4,0,0.6,1) infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ArcBallLoader.displayName='ArcBallLoader';
