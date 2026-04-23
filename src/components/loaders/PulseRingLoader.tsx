import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-pring{0%{transform:scale(0.3);opacity:0.9}100%{transform:scale(1);opacity:0}}`;document.head.appendChild(el);}
export const PulseRingLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,display:'flex',alignItems:'center',justifyContent:'center'}}>
      {[0,animationDuration*0.4,animationDuration*0.8].map((delay,i)=>(
        <div key={i} style={{position:'absolute',inset:0,borderRadius:'50%',border:`2px solid ${c}`,
          animation:`rla-pring ${animationDuration}s ease-out ${delay}s infinite`}}/>
      ))}
      <div style={{width:s*0.2,height:s*0.2,borderRadius:'50%',background:c}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
PulseRingLoader.displayName='PulseRingLoader';
