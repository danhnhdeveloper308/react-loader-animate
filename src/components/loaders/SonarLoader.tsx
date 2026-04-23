import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-sonar{0%{r:4;opacity:1}100%{r:26;opacity:0}}`;document.head.appendChild(el);}
export const SonarLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {[0,0.6,1.2].map((delay,i)=>(
        <circle key={i} cx={cx} cy={cx} r={4} fill="none" stroke={c} strokeWidth={2}
          style={{animation:`rla-sonar ${animationDuration}s ease-out ${delay}s infinite`}}/>
      ))}
      <circle cx={cx} cy={cx} r={s*0.07} fill={c}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SonarLoader.displayName='SonarLoader';
