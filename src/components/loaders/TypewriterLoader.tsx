import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{d:7,gap:5},md:{d:9,gap:7},lg:{d:12,gap:9}};
export const TypewriterLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  ;if(!visible)return null;
  const{d,gap}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'center',gap}}>
      {[0,0.2,0.4].map((delay,i)=>(
        <div key={i} style={{width:d,height:d,borderRadius:'50%',background:c,
          animation:`rla-twink ${animationDuration}s ease-in-out ${delay}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
