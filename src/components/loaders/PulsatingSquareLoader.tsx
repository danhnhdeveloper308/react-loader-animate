import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:28}, md:{s:40}, lg:{s:56} };
export const PulsatingSquareLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      <div style={{position:'absolute',inset:0,background:c,animation:`rla-pulsq ${animationDuration}s ease-in-out infinite`}}/>
      <div style={{position:'absolute',inset:s*0.22,background:c,opacity:0.4,animation:`rla-pulsq ${animationDuration}s ease-in-out ${animationDuration*0.5}s infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
