import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:36,sw:4},md:{s:52,sw:5},lg:{s:68,sw:6}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-sptrail{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const SpinTrailLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const r=s/2-sw;const circ=2*Math.PI*r;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-sptrail ${animationDuration}s linear infinite`}}>
      <defs><linearGradient id={`rla-st-${s}`} x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor={c} stopOpacity={0}/><stop offset="100%" stopColor={c} stopOpacity={1}/></linearGradient></defs>
      <circle cx={s/2} cy={s/2} r={r} fill="none" stroke={`url(#rla-st-${s})`} strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${circ*0.85} ${circ*0.15}`}/>
      <circle cx={s/2} cy={sw/2} r={sw/2.2} fill={c}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SpinTrailLoader.displayName='SpinTrailLoader';
