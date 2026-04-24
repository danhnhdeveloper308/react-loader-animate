import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:36,sw:3},md:{s:52,sw:4},lg:{s:68,sw:5}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-rdash{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const RotatingDashesLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const n=8;const r=s/2-sw*2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-rdash ${animationDuration}s linear infinite`}}>
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*2*Math.PI;const op=0.2+(i/n)*0.8;
        const x1=s/2+r*0.6*Math.cos(a);const y1=s/2+r*0.6*Math.sin(a);
        const x2=s/2+r*Math.cos(a);const y2=s/2+r*Math.sin(a);
        return(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={sw} strokeLinecap="round" opacity={op}/>);
      })}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
RotatingDashesLoader.displayName='RotatingDashesLoader';
