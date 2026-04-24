import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-wheel{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const WheelSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const n=8;const cx=s/2;const ri=cx*0.22;const ro=cx*0.85;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-wheel ${animationDuration}s linear infinite`}}>
      <circle cx={cx} cy={cx} r={ro} fill="none" stroke={c} strokeWidth={1.5} opacity={0.3}/>
      <circle cx={cx} cy={cx} r={ri} fill={c} opacity={0.6}/>
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*2*Math.PI;
        return(<line key={i} x1={cx+ri*Math.cos(a)} y1={cx+ri*Math.sin(a)} x2={cx+ro*Math.cos(a)} y2={cx+ro*Math.sin(a)}
          stroke={c} strokeWidth={1.5} opacity={0.3+((i%4===0)?0.5:0.1)}/>);
      })}
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*2*Math.PI+(Math.PI/n);
        return(<circle key={i} cx={cx+(ro*0.78)*Math.cos(a)} cy={cx+(ro*0.78)*Math.sin(a)} r={s*0.05} fill={c} opacity={0.5+i*0.05}/>);
      })}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
WheelSpinLoader.displayName='WheelSpinLoader';
