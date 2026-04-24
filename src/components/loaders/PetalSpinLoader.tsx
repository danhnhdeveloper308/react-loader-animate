import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-petal{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const PetalSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const n=8;const cx=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-petal ${animationDuration}s linear infinite`}}>
      {Array.from({length:n},(_,i)=>{
        const angle=(i/n)*360;const op=0.3+((i+1)/n)*0.7;
        const pr=cx*0.32;const py=cx-cx*0.42;
        return(<ellipse key={i} cx={cx} cy={py} rx={pr*0.45} ry={pr}
          fill={c} opacity={op} style={{transform:`rotate(${angle}deg)`,transformOrigin:`${cx}px ${cx}px`}}/>);
      })}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
PetalSpinLoader.displayName='PetalSpinLoader';
