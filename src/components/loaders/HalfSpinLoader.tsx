import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:32,b:3}, md:{s:48,b:4}, lg:{s:64,b:5} };
export const HalfSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s,b}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:s,height:s,borderRadius:'50%',borderTop:`${b}px solid ${c}`,borderRight:`${b}px solid ${c}`,borderBottom:`${b}px solid transparent`,borderLeft:`${b}px solid transparent`,animation:`rla-halfsp ${animationDuration}s cubic-bezier(0.4,0,0.6,1) infinite`}}/>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
