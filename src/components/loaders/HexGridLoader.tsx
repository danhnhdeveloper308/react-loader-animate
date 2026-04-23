import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{r:8}, md:{r:11}, lg:{r:14} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-hexgrid{0%,100%{opacity:0.15;transform:scale(0.8)}50%{opacity:1;transform:scale(1.05)}}`;document.head.appendChild(el);}
function hexPoints(cx:number,cy:number,r:number):string{return Array.from({length:6},(_,i)=>{const a=i*Math.PI/3-Math.PI/6;return`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;}).join(' ');}
export const HexGridLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.5}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{r}=CONFIGS[size];const c=resolveColor(variant,color);
  const hexes=[{cx:0,cy:0,delay:0},{cx:r*1.72,cy:0,delay:0.2},{cx:r*3.44,cy:0,delay:0.4},{cx:r*0.86,cy:r*1.5,delay:0.1},{cx:r*2.58,cy:r*1.5,delay:0.3},{cx:r*1.72,cy:r*3,delay:0.25},{cx:r*0.86,cy:-r*1.5,delay:0.15},{cx:r*2.58,cy:-r*1.5,delay:0.35}];
  const xs=hexes.map(h=>h.cx),ys=hexes.map(h=>h.cy);
  const minX=Math.min(...xs)-r,maxX=Math.max(...xs)+r,minY=Math.min(...ys)-r,maxY=Math.max(...ys)+r;
  const vw=maxX-minX,vh=maxY-minY;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={vw} height={vh} viewBox={`${minX} ${minY} ${vw} ${vh}`}>
      {hexes.map((h,i)=>(
        <polygon key={i} points={hexPoints(h.cx,h.cy,r*0.92)} fill="none" stroke={c} strokeWidth={1.5} style={{transformOrigin:`${h.cx}px ${h.cy}px`,animation:`rla-hexgrid ${animationDuration}s ease-in-out ${h.delay}s infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
HexGridLoader.displayName='HexGridLoader';
