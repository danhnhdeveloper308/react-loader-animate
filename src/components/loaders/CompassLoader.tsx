import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-compass{0%{transform:rotate(-45deg)}30%{transform:rotate(50deg)}60%{transform:rotate(-20deg)}80%{transform:rotate(40deg)}100%{transform:rotate(-45deg)}}`;document.head.appendChild(el);}
export const CompassLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r=cx*0.88;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={c} strokeWidth={1.5} opacity={0.25}/>
      {[0,90,180,270].map(a=>{const rad=a*Math.PI/180;return <line key={a} x1={cx+(r-s*0.12)*Math.cos(rad)} y1={cx+(r-s*0.12)*Math.sin(rad)} x2={cx+r*Math.cos(rad)} y2={cx+r*Math.sin(rad)} stroke={c} strokeWidth={1.5} opacity={0.4}/>;  })}
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-compass ${animationDuration}s ease-in-out infinite`}}>
        <polygon points={`${cx},${cx-r*0.7} ${cx-s*0.055},${cx+r*0.12} ${cx},${cx+r*0.22} ${cx+s*0.055},${cx+r*0.12}`} fill={c}/>
        <polygon points={`${cx},${cx+r*0.7} ${cx-s*0.055},${cx-r*0.12} ${cx},${cx-r*0.22} ${cx+s*0.055},${cx-r*0.12}`} fill={c} opacity={0.3}/>
      </g>
      <circle cx={cx} cy={cx} r={s*0.05} fill={c}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CompassLoader.displayName='CompassLoader';
