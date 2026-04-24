import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40,sw:3},md:{s:56,sw:4},lg:{s:72,sw:5}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-cometring{from{stroke-dashoffset:0}to{stroke-dashoffset:-400}}`;document.head.appendChild(el);}
export const CometRingLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2-sw;const circ=2*Math.PI*r;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{transform:'rotate(-90deg)'}}>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={sw*0.4} opacity={0.15}/>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${circ*0.12} ${circ*0.06} ${circ*0.06} ${circ*0.76}`}
        style={{animation:`rla-cometring ${animationDuration}s linear infinite`,filter:`drop-shadow(0 0 3px ${c})`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CometRingLoader.displayName='CometRingLoader';
