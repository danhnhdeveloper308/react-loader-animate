import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,b:3}, md:{s:52,b:4}, lg:{s:68,b:5} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-elastic{0%{transform:scale(1,1) rotate(0deg)}25%{transform:scale(1.3,0.7) rotate(45deg)}50%{transform:scale(0.7,1.3) rotate(90deg)}75%{transform:scale(1.2,0.8) rotate(135deg)}100%{transform:scale(1,1) rotate(180deg)}}`;document.head.appendChild(el);}
export const ElasticRingLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,b}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:s,height:s,borderRadius:'50%',border:`${b}px solid transparent`,borderTopColor:c,borderBottomColor:c,animation:`rla-elastic ${animationDuration}s ease-in-out infinite`,transformOrigin:'center'}}/>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ElasticRingLoader.displayName='ElasticRingLoader';
