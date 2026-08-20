import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
export const PlasmaLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=3}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{position:'absolute',inset:0,background:c,opacity:0.12,borderRadius:'60% 40% 30% 70%/60% 30% 70% 40%',animation:`rla-plasmaA ${animationDuration}s ease-in-out infinite`,filter:`blur(${s*0.06}px)`}}/>
      <div style={{position:'absolute',inset:s*0.15,background:c,opacity:0.35,borderRadius:'40% 60% 60% 40%/40% 50% 60% 50%',animation:`rla-plasmaA ${animationDuration*0.75}s ease-in-out infinite reverse`}}/>
      <div style={{position:'absolute',inset:s*0.3,background:c,opacity:0.7,borderRadius:'50%',animation:`rla-plasmaA ${animationDuration*0.5}s ease-in-out infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
