import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:48},md:{s:64},lg:{s:80}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-chasedot{0%{transform:translateX(0);opacity:1}100%{transform:translateX(200%);opacity:0}}@keyframes rla-chasemaw{0%,100%{clip-path:polygon(0 0,100% 0,100% 50%,0 50%)}50%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}}`;document.head.appendChild(el);}
export const ChaseLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cs=s*0.28;const ds=cs*0.4;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:cs,display:'flex',alignItems:'center'}}>
      {/* dots */}
      {[0,1,2].map(i=>(
        <div key={i} style={{position:'absolute',left:`${20+i*16}%`,width:ds,height:ds,borderRadius:'50%',background:c,opacity:0.8,
          animation:`rla-chasedot ${animationDuration*1.5}s linear ${-i*0.25}s infinite`}}/>
      ))}
      {/* chomper */}
      <div style={{position:'absolute',left:0,width:cs,height:cs,background:c,borderRadius:'50%',
        animation:`rla-chasemaw ${animationDuration*0.4}s ease-in-out infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ChaseLoader.displayName='ChaseLoader';
