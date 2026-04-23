import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36}, md:{s:52}, lg:{s:68} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-vortex{from{transform:rotate(0deg) scale(1)}to{transform:rotate(720deg) scale(0.1)}}@keyframes rla-vortex2{0%{opacity:1;transform:rotate(0deg) scale(0.1)}50%{opacity:0.7}100%{opacity:0;transform:rotate(-720deg) scale(1)}}`;document.head.appendChild(el);}
export const VortexLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const n=5;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      {Array.from({length:n},(_,i)=>{
        const ratio=(n-i)/n;const sz=s*ratio;const offset=(s-sz)/2;
        return(<div key={i} style={{position:'absolute',left:offset,top:offset,width:sz,height:sz,borderRadius:'50%',border:`${1.5}px solid ${c}`,opacity:(i+1)/n,animation:`rla-vortex ${animationDuration*(1+i*0.15)}s linear ${i*0.1}s infinite`}}/>);
      })}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
VortexLoader.displayName='VortexLoader';
