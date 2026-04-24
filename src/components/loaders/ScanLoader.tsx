import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:36},md:{s:52},lg:{s:68}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-scanwrap{0%{transform:translateY(0%);opacity:0}8%{opacity:1}92%{opacity:1}100%{transform:translateY(100%);opacity:0}}`;document.head.appendChild(el);}
export const ScanLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,overflow:'hidden',border:`1px solid ${c}`,borderRadius:4,opacity:1,boxSizing:'border-box'}}>
      {/* static grid lines */}
      {[0.25,0.5,0.75].map(y=>(
        <div key={y} style={{position:'absolute',left:0,right:0,top:`${y*100}%`,height:1,background:c,opacity:0.15}}/>
      ))}
      {[0.33,0.66].map(x=>(
        <div key={x} style={{position:'absolute',top:0,bottom:0,left:`${x*100}%`,width:1,background:c,opacity:0.1}}/>
      ))}
      {/* The scan line wrapper fills the container and translates 100% of ITS height */}
      <div style={{position:'absolute',inset:0,animation:`rla-scanwrap ${animationDuration}s linear infinite`}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:3,
          background:`linear-gradient(90deg,transparent 0%,${c} 30%,${c} 70%,transparent 100%)`,
          boxShadow:`0 0 10px 2px ${c}`,opacity:0.9}}/>
      </div>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ScanLoader.displayName='ScanLoader';
