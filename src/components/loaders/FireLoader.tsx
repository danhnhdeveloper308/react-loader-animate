import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
export const FireLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=0.9}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,base=s*0.75;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox="0 0 100 100">
      <g style={{transformOrigin:'50px 78px'}}>
        <ellipse cx={50} cy={78} rx={18} ry={6} fill={c} opacity={0.15}/>
        <path d="M50,20 C55,35 68,42 65,58 C62,70 55,75 50,78 C45,75 38,70 35,58 C32,42 45,35 50,20Z" fill={c} style={{transformOrigin:'50px 78px',animation:`rla-fire1 ${animationDuration}s ease-in-out infinite`}}/>
        <path d="M50,35 C54,45 62,50 60,62 C58,70 54,74 50,78 C46,74 42,70 40,62 C38,50 46,45 50,35Z" fill="#ff8c00" opacity={0.85} style={{transformOrigin:'50px 78px',animation:`rla-fire2 ${animationDuration*1.2}s ease-in-out infinite`}}/>
        <path d="M50,50 C53,57 57,62 55,68 C53,73 51,76 50,78 C49,76 47,73 45,68 C43,62 47,57 50,50Z" fill="#ffdd00" opacity={0.9} style={{transformOrigin:'50px 78px',animation:`rla-fire3 ${animationDuration*0.8}s ease-in-out infinite`}}/>
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
