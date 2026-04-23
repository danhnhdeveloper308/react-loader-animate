import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:32,b:3}, md:{s:48,b:4}, lg:{s:64,b:5} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-neonsp{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes rla-neonglow{0%,100%{opacity:1}50%{opacity:0.5}}`;document.head.appendChild(el);}
export const NeonSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,b}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      <div style={{position:'absolute',inset:0,borderRadius:'50%',border:`${b}px solid transparent`,borderTopColor:c,boxShadow:`0 0 ${b*3}px ${c},0 0 ${b*6}px ${c}`,animation:`rla-neonsp ${animationDuration}s linear infinite`}}/>
      <div style={{position:'absolute',inset:b*2,borderRadius:'50%',border:`${b*0.6}px solid transparent`,borderTopColor:c,opacity:0.5,animation:`rla-neonsp ${animationDuration*0.7}s linear infinite reverse`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
NeonSpinLoader.displayName='NeonSpinLoader';
