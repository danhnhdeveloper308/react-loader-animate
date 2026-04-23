import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36}, md:{s:52}, lg:{s:68} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-scan{0%{transform:translateY(-100%);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(100%);opacity:0}}`;document.head.appendChild(el);}
export const ScanLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,overflow:'hidden',borderRadius:4}}>
      <div style={{position:'absolute',inset:0,border:`1px solid ${c}`,borderRadius:4,opacity:0.2}}/>
      {[0.25,0.5,0.75].map(y=>(
        <div key={y} style={{position:'absolute',left:0,right:0,top:`${y*100}%`,height:1,background:c,opacity:0.12}}/>
      ))}
      <div style={{position:'absolute',left:0,right:0,height:'2px',background:`linear-gradient(transparent,${c},transparent)`,boxShadow:`0 0 8px ${c}`,animation:`rla-scan ${animationDuration}s linear infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ScanLoader.displayName='ScanLoader';
