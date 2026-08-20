import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36}, md:{s:52}, lg:{s:68} };
export const ThunderLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox="0 0 100 100" style={{transformOrigin:'50px 50px',animation:`rla-thunder ${animationDuration}s ease-in-out infinite`}}>
      <defs><filter id="rla-glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <path d="M58,8 L38,52 L52,52 L42,92 L78,40 L60,40 Z" fill={c} filter="url(#rla-glow)"/>
      <path d="M58,8 L38,52 L52,52 L42,92 L78,40 L60,40 Z" fill="none" stroke="white" strokeWidth={1} opacity={0.4}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
