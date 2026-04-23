import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-rocket{0%,100%{transform:translateY(0) rotate(-30deg)}50%{transform:translateY(-10px) rotate(-30deg)}}@keyframes rla-flame{0%,100%{transform:scaleY(0.7);opacity:0.8}50%{transform:scaleY(1.3);opacity:1}}`;document.head.appendChild(el);}
export const RocketLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox="0 0 100 100">
      <g style={{animation:`rla-rocket ${animationDuration}s ease-in-out infinite`}}>
        <path d="M50,12 C50,12 65,28 65,55 L50,65 L35,55 C35,28 50,12 50,12Z" fill={c} opacity={0.9}/>
        <ellipse cx={50} cy={55} rx={8} ry={5} fill={c} opacity={0.6}/>
        <path d="M35,55 L28,70 L35,65Z" fill={c} opacity={0.7}/>
        <path d="M65,55 L72,70 L65,65Z" fill={c} opacity={0.7}/>
        <circle cx={50} cy={38} r={6} fill={c} opacity={0.3} stroke={c} strokeWidth={1.5}/>
        <g style={{transformOrigin:'50px 70px',animation:`rla-flame ${animationDuration*0.5}s ease-in-out infinite`}}>
          <path d="M43,65 C44,78 50,88 50,88 C50,88 56,78 57,65Z" fill="#ff8c00" opacity={0.9}/>
          <path d="M46,65 C46.5,75 50,82 50,82 C50,82 53.5,75 54,65Z" fill="#ffcc00" opacity={0.8}/>
        </g>
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
RocketLoader.displayName='RocketLoader';
