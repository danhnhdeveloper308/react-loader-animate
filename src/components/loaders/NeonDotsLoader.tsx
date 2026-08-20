import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{d:8,gap:8}, md:{d:12,gap:10}, lg:{d:16,gap:13} };
export const NeonDotsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  ;if(!visible)return null;
  const{d,gap}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'center',gap}}>
      {[0,0.25,0.5].map((delay,i)=>(
        <div key={i} style={{width:d,height:d,borderRadius:'50%',background:c,boxShadow:`0 0 ${d*0.6}px ${c},0 0 ${d*1.2}px ${c}`,animation:`rla-neondot ${animationDuration}s ease-in-out ${delay*animationDuration}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
