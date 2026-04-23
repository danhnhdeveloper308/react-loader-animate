import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40}, md:{s:56}, lg:{s:72} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-spark{0%{transform:scale(0) rotate(0deg);opacity:0}30%{opacity:1}70%{opacity:0.8}100%{transform:scale(1.4) rotate(180deg);opacity:0}}`;document.head.appendChild(el);}
function star4(cx:number,cy:number,r:number):string{const pts=[];for(let i=0;i<8;i++){const a=i*Math.PI/4;const ri=i%2===0?r:r*0.38;pts.push(`${cx+ri*Math.cos(a)},${cy+ri*Math.sin(a)}`);}return pts.join(' ');}
export const SparkleLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  const sparks=[{x:cx,y:cx,r:cx*0.38,delay:0},{x:cx*0.3,y:cx*0.35,r:cx*0.18,delay:0.3},{x:cx*1.7,y:cx*0.4,r:cx*0.15,delay:0.6},{x:cx*0.25,y:cx*1.6,r:cx*0.13,delay:0.9},{x:cx*1.72,y:cx*1.65,r:cx*0.17,delay:1.2}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {sparks.map((sp,i)=>(
        <polygon key={i} points={star4(sp.x,sp.y,sp.r)} fill={c} style={{transformOrigin:`${sp.x}px ${sp.y}px`,animation:`rla-spark ${animationDuration}s ease-out ${sp.delay}s infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SparkleLoader.displayName='SparkleLoader';
