import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-rocketbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes rla-rocketflame{0%,100%{transform:scaleX(1) scaleY(0.8);opacity:0.9}40%{transform:scaleX(0.85) scaleY(1.25);opacity:1}70%{transform:scaleX(1.1) scaleY(0.95);opacity:0.85}}`;document.head.appendChild(el);}
export const RocketLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox="0 0 100 100" style={{overflow:'visible'}}>
      {/* Whole rocket bobs up/down */}
      <g style={{animation:`rla-rocketbob ${animationDuration}s ease-in-out infinite`}}>
        {/* Flame — rendered first (behind body) */}
        <g style={{transformOrigin:'50px 75px',animation:`rla-rocketflame ${animationDuration*0.45}s ease-in-out infinite`}}>
          <path d="M42,72 C44,86 50,96 50,96 C50,96 56,86 58,72Z" fill="#ff6b00" opacity={0.95}/>
          <path d="M45,72 C46.5,82 50,90 50,90 C50,90 53.5,82 55,72Z" fill="#ffdd00" opacity={0.9}/>
        </g>
        {/* Left fin */}
        <path d="M38,60 L30,74 L38,68Z" fill={c} opacity={0.85}/>
        {/* Right fin */}
        <path d="M62,60 L70,74 L62,68Z" fill={c} opacity={0.85}/>
        {/* Body */}
        <rect x={40} y={34} width={20} height={38} rx={3} fill={c} opacity={0.95}/>
        {/* Nose cone */}
        <path d="M40,34 Q40,16 50,10 Q60,16 60,34Z" fill={c}/>
        {/* Porthole */}
        <circle cx={50} cy={44} r={5.5} fill="none" stroke={c} strokeWidth={1.5} opacity={0.45}/>
        <circle cx={50} cy={44} r={3} fill={c} opacity={0.25}/>
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
RocketLoader.displayName='RocketLoader';
