import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{w:80,h:10},md:{w:120,h:14},lg:{w:160,h:18}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`;document.head.appendChild(el);}
export const ShimmerLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{w,h}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',flexDirection:'column',gap:h*0.6}}>
      {[w,w*0.75,w*0.55].map((bw,i)=>(
        <div key={i} style={{position:'relative',width:bw,height:h,borderRadius:h/2,overflow:'hidden',background:c,opacity:0.2}}>
          {/* shimmer highlight — pure white overlay so contrast works on any color */}
          <div style={{
            position:'absolute',inset:0,
            background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.55) 50%,transparent 100%)',
            animation:`rla-shimmer ${animationDuration}s ease-in-out ${i*0.25}s infinite`
          }}/>
        </div>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ShimmerLoader.displayName='ShimmerLoader';
