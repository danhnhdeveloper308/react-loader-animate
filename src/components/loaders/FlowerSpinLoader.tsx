import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-flspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-flpetal{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.25);opacity:1}}`;document.head.appendChild(el);}
export const FlowerSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const n=6;const cx=s/2;const pr=cx*0.3;const pd=cx*0.35;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-flspin ${animationDuration}s linear infinite`}}>
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*2*Math.PI;const px=cx+pd*Math.cos(a);const py=cx+pd*Math.sin(a);
        return(<ellipse key={i} cx={px} cy={py} rx={pr*0.45} ry={pr}
          fill={c} opacity={0.65}
          style={{transform:`rotate(${(i/n)*360}deg)`,transformOrigin:`${px}px ${py}px`,
            animation:`rla-flpetal ${animationDuration}s ease-in-out ${i*(animationDuration/n)}s infinite`}}/>);
      })}
      <circle cx={cx} cy={cx} r={s*0.1} fill={c}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
FlowerSpinLoader.displayName='FlowerSpinLoader';
