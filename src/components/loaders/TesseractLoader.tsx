import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36}, md:{s:52}, lg:{s:68} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-tessOuter{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-tessInner{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`;document.head.appendChild(el);}
export const TesseractLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=3}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,or=cx*0.88,ir=cx*0.44;
  const outerPts=Array.from({length:4},(_,i)=>{const a=i*Math.PI/2+Math.PI/4;return`${cx+or*Math.cos(a)},${cx+or*Math.sin(a)}`;}).join(' ');
  const innerPts=Array.from({length:4},(_,i)=>{const a=i*Math.PI/2+Math.PI/4;return`${cx+ir*Math.cos(a)},${cx+ir*Math.sin(a)}`;}).join(' ');
  const outerArr=Array.from({length:4},(_,i)=>{const a=i*Math.PI/2+Math.PI/4;return{x:cx+or*Math.cos(a),y:cx+or*Math.sin(a)};});
  const innerArr=Array.from({length:4},(_,i)=>{const a=i*Math.PI/2+Math.PI/4;return{x:cx+ir*Math.cos(a),y:cx+ir*Math.sin(a)};});
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-tessOuter ${animationDuration}s linear infinite`}}>
        <polygon points={outerPts} fill="none" stroke={c} strokeWidth={1.5} opacity={0.8}/>
        {outerArr.map((p,i)=><line key={i} x1={p.x} y1={p.y} x2={innerArr[i].x} y2={innerArr[i].y} stroke={c} strokeWidth={0.8} opacity={0.4}/>)}
      </g>
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-tessInner ${animationDuration*1.4}s linear infinite`}}>
        <polygon points={innerPts} fill="none" stroke={c} strokeWidth={1.5} opacity={0.55}/>
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
TesseractLoader.displayName='TesseractLoader';
