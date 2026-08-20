import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{w:48,h:32,sw:3},md:{w:64,h:44,sw:4},lg:{w:80,h:56,sw:5}};
export const BouncingLineLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{w,h,sw}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M 4,50 Q 25,50 50,50 Q 75,50 96,50" fill="none" stroke={c} strokeWidth={sw}
        strokeLinecap="round" style={{animation:`rla-bline ${animationDuration}s ease-in-out infinite`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
