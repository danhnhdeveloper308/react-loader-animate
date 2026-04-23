import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:32,b:3}, md:{s:48,b:4}, lg:{s:64,b:5} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-halfsp{0%{transform:rotate(0deg)}45%{transform:rotate(180deg)}55%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}`;document.head.appendChild(el);}
export const HalfSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,b}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:s,height:s,borderRadius:'50%',borderTop:`${b}px solid ${c}`,borderRight:`${b}px solid ${c}`,borderBottom:`${b}px solid transparent`,borderLeft:`${b}px solid transparent`,animation:`rla-halfsp ${animationDuration}s cubic-bezier(0.4,0,0.6,1) infinite`}}/>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
HalfSpinLoader.displayName='HalfSpinLoader';
