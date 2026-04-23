import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-drop{0%{transform:translateY(-40px);opacity:0}30%{opacity:1}70%{transform:translateY(0);opacity:1}100%{transform:translateY(0);opacity:0}}@keyframes rla-ripple{0%{transform:scale(0.1);opacity:0.8}100%{transform:scale(1.8);opacity:0}}`;document.head.appendChild(el);}
export const WaterDropLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} overflow="visible">
      <ellipse cx={cx} cy={cx*1.4} rx={cx*0.55} ry={cx*0.25} fill="none" stroke={c} strokeWidth="1" opacity={0.2}/>
      <ellipse cx={cx} cy={cx*1.4} rx={cx*0.3} ry={cx*0.13} fill="none" stroke={c} strokeWidth="1.5" opacity={0.5} style={{transformOrigin:`${cx}px ${cx*1.4}px`,animation:`rla-ripple ${animationDuration}s ease-out ${animationDuration*0.55}s infinite`}}/>
      <path d={`M${cx},${cx*0.3} C${cx+cx*0.22},${cx*0.5} ${cx+cx*0.36},${cx*0.8} ${cx+cx*0.22},${cx*1.2} A${cx*0.24},${cx*0.26} 0 1,1 ${cx-cx*0.22},${cx*1.2} C${cx-cx*0.36},${cx*0.8} ${cx-cx*0.22},${cx*0.5} ${cx},${cx*0.3}Z`} fill={c} style={{animation:`rla-drop ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
WaterDropLoader.displayName='WaterDropLoader';
