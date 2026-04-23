import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{w:36,h:18}, md:{w:50,h:26}, lg:{w:64,h:34} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-battery{0%{width:0%}100%{width:88%}}@keyframes rla-battglow{0%,100%{opacity:0.6}50%{opacity:1}}`;document.head.appendChild(el);}
export const BatteryLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{w,h}=CONFIGS[size];const c=resolveColor(variant,color);const termH=h*0.4,termW=w*0.06;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'center',gap:2}}>
      <div style={{width:w,height:h,border:`2px solid ${c}`,borderRadius:4,padding:3,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',left:3,top:3,bottom:3,background:c,borderRadius:2,animation:`rla-battery ${animationDuration}s ease-in-out infinite alternate`,boxShadow:`0 0 6px ${c}`}}/>
      </div>
      <div style={{width:termW,height:termH,background:c,borderRadius:'0 2px 2px 0',animation:`rla-battglow ${animationDuration}s ease-in-out infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
BatteryLoader.displayName='BatteryLoader';
