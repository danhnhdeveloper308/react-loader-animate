import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:48,d:7}, md:{s:64,d:10}, lg:{s:80,d:13} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-mirrorL{0%{transform:translateX(0)}50%{transform:translateX(-14px)}100%{transform:translateX(0)}}@keyframes rla-mirrorR{0%{transform:translateX(0)}50%{transform:translateX(14px)}100%{transform:translateX(0)}}`;document.head.appendChild(el);}
export const MirrorDotsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,d}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'center',gap:d*0.7}}>
      {[{kf:'rla-mirrorL',op:1},{kf:'rla-mirrorL',op:0.6,delay:0.2},{kf:'rla-mirrorR',op:0.6,delay:0.2},{kf:'rla-mirrorR',op:1}].map((dot,i)=>(
        <div key={i} style={{width:d,height:d,borderRadius:'50%',background:c,opacity:(dot as any).op,animation:`${dot.kf} ${animationDuration}s ease-in-out ${((dot as any).delay||0)*animationDuration}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
MirrorDotsLoader.displayName='MirrorDotsLoader';
