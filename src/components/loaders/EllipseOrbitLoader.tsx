import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:48},md:{s:64},lg:{s:80}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-eo1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-eo2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`;document.head.appendChild(el);}
export const EllipseOrbitLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <ellipse cx={s/2} cy={s/2} rx={s*0.42} ry={s*0.2} fill="none" stroke={c} strokeWidth={1.5} opacity={0.2} style={{transform:'rotate(-30deg)',transformOrigin:`${s/2}px ${s/2}px`}}/>
      <ellipse cx={s/2} cy={s/2} rx={s*0.42} ry={s*0.2} fill="none" stroke={c} strokeWidth={1.5} opacity={0.2} style={{transform:'rotate(30deg)',transformOrigin:`${s/2}px ${s/2}px`}}/>
      <ellipse cx={s/2} cy={s/2} rx={s*0.42} ry={s*0.2} fill="none" stroke={c} strokeWidth={1.5} opacity={0.2} style={{transform:'rotate(90deg)',transformOrigin:`${s/2}px ${s/2}px`}}/>
      {[{angle:-30,dur:1,r:s*0.06},{angle:30,dur:1.3,r:s*0.05},{angle:90,dur:0.8,r:s*0.055}].map(({angle,dur,r},i)=>{
        const id=`rla-eo-${s}-${i}`;const anim=i%2===0?'rla-eo1':'rla-eo2';
        return(<g key={i} style={{transform:`rotate(${angle}deg)`,transformOrigin:`${s/2}px ${s/2}px`,animation:`${anim} ${animationDuration*dur}s linear infinite`}}>
          <circle cx={s/2+s*0.42} cy={s/2} r={r} fill={c} opacity={0.85}/>
        </g>);
      })}
      <circle cx={s/2} cy={s/2} r={s*0.07} fill={c} opacity={0.5}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
EllipseOrbitLoader.displayName='EllipseOrbitLoader';
