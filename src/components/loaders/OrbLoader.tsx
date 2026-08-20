import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
export const OrbLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{position:'absolute',inset:'10%',borderRadius:'50%',border:`1.5px solid ${c}`,
        animation:`rla-orbring ${animationDuration}s ease-out infinite`}}/>
      <div style={{position:'absolute',inset:'25%',borderRadius:'50%',border:`1px solid ${c}`,opacity:0.4,
        animation:`rla-orbring ${animationDuration}s ease-out ${animationDuration*0.4}s infinite`}}/>
      <div style={{width:s*0.35,height:s*0.35,borderRadius:'50%',background:`radial-gradient(circle at 35% 35%, white, ${c})`,
        animation:`rla-orbpulse ${animationDuration*0.8}s ease-in-out infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
