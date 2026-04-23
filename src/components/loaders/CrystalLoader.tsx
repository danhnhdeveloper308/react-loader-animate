import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-crystal{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-crystalG{0%,100%{opacity:0.3}50%{opacity:0.8}}`;document.head.appendChild(el);}
export const CrystalLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=3}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  const faces=[[0.5,0.05,1,0.4,0.5,0.5],[0.5,0.05,0,0.4,0.5,0.5],[0,0.4,0.5,0.95,0.5,0.5],[1,0.4,0.5,0.95,0.5,0.5],[0.5,0.95,1,0.4,0.5,0.5],[0.5,0.95,0,0.4,0.5,0.5]];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-crystal ${animationDuration}s linear infinite`}}>
        {faces.map((f,i)=>(
          <polygon key={i} points={`${f[0]*s},${f[1]*s} ${f[2]*s},${f[3]*s} ${f[4]*s},${f[5]*s}`} fill={c} opacity={0.12+i*0.06} stroke={c} strokeWidth={0.8}/>
        ))}
      </g>
      {[0.45,0.7,0.9].map((r,i)=>(
        <circle key={i} cx={cx} cy={cx} r={cx*r} fill="none" stroke={c} strokeWidth={0.5} opacity={0.15} style={{animation:`rla-crystalG ${animationDuration*0.5}s ease-in-out ${i*0.2}s infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CrystalLoader.displayName='CrystalLoader';
