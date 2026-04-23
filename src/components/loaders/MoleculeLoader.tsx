import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-molA{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-molB{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`;document.head.appendChild(el);}
export const MoleculeLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,nr=cx*0.28;
  const satellites=[{r:cx*0.68,n:3,dr:cx*0.1,kf:'rla-molA',dur:animationDuration},{r:cx*0.42,n:2,dr:cx*0.07,kf:'rla-molB',dur:animationDuration*1.4}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cx} r={nr} fill={c}/>
      {satellites.map((sat,si)=>(
        <g key={si} style={{transformOrigin:`${cx}px ${cx}px`,animation:`${sat.kf} ${sat.dur}s linear infinite`}}>
          {Array.from({length:sat.n},(_,i)=>{
            const a=(i/sat.n)*Math.PI*2;const ax=cx+sat.r*Math.cos(a),ay=cx+sat.r*Math.sin(a);
            return <g key={i}><line x1={cx} y1={cx} x2={ax} y2={ay} stroke={c} strokeWidth={0.8} opacity={0.3}/><circle cx={ax} cy={ay} r={sat.dr} fill={c} opacity={0.7}/></g>;
          })}
        </g>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
MoleculeLoader.displayName='MoleculeLoader';
