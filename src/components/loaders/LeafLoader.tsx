import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36}, md:{s:52}, lg:{s:68} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-leaf{0%{transform:rotate(-20deg)}25%{transform:rotate(10deg)}50%{transform:rotate(-15deg)}75%{transform:rotate(8deg)}100%{transform:rotate(-20deg)}}@keyframes rla-leaffall{0%,100%{transform:translateY(0) rotate(-20deg)}50%{transform:translateY(-6px) rotate(5deg)}}`;document.head.appendChild(el);}
export const LeafLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox="0 0 100 100">
      <g style={{transformOrigin:'50px 70px',animation:`rla-leaffall ${animationDuration}s ease-in-out infinite`}}>
        <line x1={50} y1={20} x2={50} y2={70} stroke={c} strokeWidth={2} opacity={0.6}/>
        <path d="M50,20 C70,20 82,35 78,52 C74,65 62,70 50,70 C38,70 26,65 22,52 C18,35 30,20 50,20Z" fill={c} opacity={0.8} style={{transformOrigin:'50px 20px',animation:`rla-leaf ${animationDuration*1.3}s ease-in-out infinite`}}/>
        <path d="M50,70 C50,55 56,42 62,35" stroke={c} strokeWidth={1.2} fill="none" opacity={0.4}/>
        <path d="M50,70 C50,55 44,42 38,35" stroke={c} strokeWidth={1.2} fill="none" opacity={0.4}/>
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
LeafLoader.displayName='LeafLoader';
