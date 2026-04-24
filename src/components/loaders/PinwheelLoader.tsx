import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-pin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const PinwheelLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.5}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const n=4;const cx=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-pin ${animationDuration}s linear infinite`}}>
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*2*Math.PI;const a2=a+Math.PI*0.6;
        const r=cx*0.82;const r2=cx*0.35;
        return(<path key={i} d={`M ${cx},${cx} L ${cx+r*Math.cos(a)},${cx+r*Math.sin(a)} Q ${cx+r*1.1*Math.cos((a+a2)/2)},${cx+r*1.1*Math.sin((a+a2)/2)} ${cx+r2*Math.cos(a2)},${cx+r2*Math.sin(a2)} Z`}
          fill={c} opacity={0.3+i*0.18}/>);
      })}
      <circle cx={cx} cy={cx} r={s*0.05} fill={c}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
PinwheelLoader.displayName='PinwheelLoader';
