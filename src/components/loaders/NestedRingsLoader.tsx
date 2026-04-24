import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-nring0{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-nring1{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}@keyframes rla-nring2{from{transform:rotate(90deg)}to{transform:rotate(450deg)}}`;document.head.appendChild(el);}
export const NestedRingsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  const rings=[{r:0.88,sw:2.5,da:0.7,anim:'rla-nring0',dur:1},{r:0.65,sw:2,da:0.5,anim:'rla-nring1',dur:1.4},{r:0.42,sw:1.5,da:0.35,anim:'rla-nring2',dur:0.8}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {rings.map(({r:rf,sw,da,anim,dur},i)=>{const r=s/2*rf;const circ=2*Math.PI*r;return(<circle key={i} cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${circ*da} ${circ*(1-da)}`} opacity={1-i*0.2}
        style={{animation:`${anim} ${animationDuration*dur}s linear infinite`}}/>);})}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
NestedRingsLoader.displayName='NestedRingsLoader';
