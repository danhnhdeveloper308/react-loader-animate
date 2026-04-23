import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:28}, md:{s:40}, lg:{s:52} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-cube3d{0%{transform:rotateX(0deg) rotateY(0deg)}25%{transform:rotateX(90deg) rotateY(45deg)}50%{transform:rotateX(180deg) rotateY(90deg)}75%{transform:rotateX(270deg) rotateY(135deg)}100%{transform:rotateX(360deg) rotateY(180deg)}}`;document.head.appendChild(el);}
export const CubeRotateLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  const faces=[{transform:'rotateY(0deg)   translateZ('+s/2+'px)',op:0.9},{transform:'rotateY(90deg)  translateZ('+s/2+'px)',op:0.7},{transform:'rotateY(180deg) translateZ('+s/2+'px)',op:0.5},{transform:'rotateY(-90deg) translateZ('+s/2+'px)',op:0.3},{transform:'rotateX(90deg)  translateZ('+s/2+'px)',op:0.75},{transform:'rotateX(-90deg) translateZ('+s/2+'px)',op:0.4}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:s,height:s,perspective:s*3,perspectiveOrigin:'center'}}>
      <div style={{width:s,height:s,position:'relative',transformStyle:'preserve-3d',animation:`rla-cube3d ${animationDuration}s ease-in-out infinite`}}>
        {faces.map((f,i)=>(
          <div key={i} style={{position:'absolute',inset:0,background:c,opacity:f.op,transform:f.transform,border:`1px solid rgba(255,255,255,0.2)`}}/>
        ))}
      </div>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CubeRotateLoader.displayName='CubeRotateLoader';
