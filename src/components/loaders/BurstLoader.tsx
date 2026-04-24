import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-burstp0{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(-20px,-12px);opacity:0.25}}@keyframes rla-burstp1{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(0px,-22px);opacity:0.25}}@keyframes rla-burstp2{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(20px,-12px);opacity:0.25}}@keyframes rla-burstp3{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(20px,12px);opacity:0.25}}@keyframes rla-burstp4{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(0px,22px);opacity:0.25}}@keyframes rla-burstp5{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(-20px,12px);opacity:0.25}}`;document.head.appendChild(el);}
export const BurstLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const n=6;const d=s*0.14;const r=s*0.32;const cx=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*2*Math.PI;
        return(<circle key={i} cx={cx+r*Math.cos(a)} cy={cx+r*Math.sin(a)} r={d/2} fill={c}
          style={{animation:`rla-burstp${i} ${animationDuration}s ease-in-out ${i*(animationDuration/n)*0.15}s infinite`}}/>);
      })}
      <circle cx={cx} cy={cx} r={d*0.55} fill={c} opacity={0.5}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
BurstLoader.displayName='BurstLoader';
