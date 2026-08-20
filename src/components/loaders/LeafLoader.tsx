import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36}, md:{s:52}, lg:{s:68} };
export const LeafLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox="0 0 100 100">
      <g style={{transformOrigin:'50px 70px',animation:`rla-leaffall ${animationDuration}s ease-in-out infinite`}}>
        <line x1={50} y1={20} x2={50} y2={70} stroke={c} strokeWidth={2} opacity={0.6}/>
        <path d="M50,20 C70,20 82,35 78,52 C74,65 62,70 50,70 C38,70 26,65 22,52 C18,35 30,20 50,20Z" fill={c} opacity={0.8} style={{transformOrigin:'50px 20px',animation:`rla-leaf ${animationDuration*1.3}s ease-in-out infinite`}}/>
        <path d="M50,70 C50,55 56,42 62,35" stroke={c} strokeWidth={1.2} fill="none" opacity={0.4}/>
        <path d="M50,70 C50,55 44,42 38,35" stroke={c} strokeWidth={1.2} fill="none" opacity={0.4}/>
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
