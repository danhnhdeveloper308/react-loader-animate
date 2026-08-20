import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,b:3}, md:{s:52,b:4}, lg:{s:68,b:5} };
export const ElasticRingLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s,b}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:s,height:s,borderRadius:'50%',border:`${b}px solid transparent`,borderTopColor:c,borderBottomColor:c,animation:`rla-elastic ${animationDuration}s ease-in-out infinite`,transformOrigin:'center'}}/>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
