import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
export const RippleSquareLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      {[0,0.5,1].map(delay=>(
        <div key={delay} style={{position:'absolute',inset:0,border:`2.5px solid ${c}`,borderRadius:4,
          animation:`rla-ripsq ${animationDuration}s ease-out ${delay}s infinite`}}/>
      ))}
      <div style={{position:'absolute',inset:'40%',background:c,borderRadius:2}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
