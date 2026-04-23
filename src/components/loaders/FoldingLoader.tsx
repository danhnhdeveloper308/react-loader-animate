import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:36},md:{s:48},lg:{s:60}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-fold1{0%,10%{transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{transform:perspective(140px) rotateX(0deg);opacity:1}90%,100%{transform:perspective(140px) rotateY(180deg);opacity:0}}`;document.head.appendChild(el);}
export const FoldingLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cs=s*0.42;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      {[[0,0,0],[cs+2,0,animationDuration*0.3],[0,cs+2,animationDuration*0.6],[cs+2,cs+2,animationDuration*0.9]].map(([x,y,d],i)=>(
        <div key={i} style={{position:'absolute',left:x,top:y,width:cs,height:cs,background:c,
          opacity:0.7+i*0.08,
          animation:`rla-fold1 ${animationDuration}s ease-in-out ${d}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
FoldingLoader.displayName='FoldingLoader';
