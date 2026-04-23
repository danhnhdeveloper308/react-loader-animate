import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-liquid{0%{transform:translateY(0%)}100%{transform:translateY(-100%)}}@keyframes rla-wave{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`;document.head.appendChild(el);}
export const LiquidFillLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,borderRadius:'50%',overflow:'hidden',border:`2px solid ${c}`,boxSizing:'border-box'}}>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'70%',animation:`rla-liquid ${animationDuration}s ease-in-out infinite alternate`}}>
        <div style={{position:'relative',height:'100%',background:c,opacity:0.7}}>
          <div style={{position:'absolute',top:-s*0.09,left:0,width:'200%',overflow:'hidden',animation:`rla-wave ${animationDuration*0.8}s linear infinite`}}>
            <svg height={s*0.18} width={s*2} viewBox={`0 0 ${s*2} ${s*0.18}`} preserveAspectRatio="none">
              <path d={`M0,${s*0.09} C${s*0.25},0 ${s*0.75},${s*0.18} ${s},${s*0.09} C${s*1.25},0 ${s*1.75},${s*0.18} ${s*2},${s*0.09} L${s*2},${s*0.18} L0,${s*0.18}Z`} fill={c}/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
LiquidFillLoader.displayName='LiquidFillLoader';
