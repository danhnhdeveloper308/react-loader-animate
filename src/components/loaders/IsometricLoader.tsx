import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{u:10}, md:{u:14}, lg:{u:18} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-iso{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`;document.head.appendChild(el);}
export const IsometricLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{u}=CONFIGS[size];const c=resolveColor(variant,color);const w=u*4,h=u*3.5;
  const cx=w/2;
  function isoFace(x:number,y:number,type:'top'|'left'|'right'){
    if(type==='top')return`${x},${y} ${x+u*2},${y-u} ${x+u*4},${y} ${x+u*2},${y+u}`;
    if(type==='left')return`${x},${y} ${x+u*2},${y+u} ${x+u*2},${y+u*3} ${x},${y+u*2}`;
    return`${x+u*4},${y} ${x+u*4},${y+u*2} ${x+u*2},${y+u*3} ${x+u*2},${y+u}`;
  }
  const cubes=[{ox:cx-u*2,oy:u*0.5,delay:0},{ox:cx,oy:u*0.5,delay:0.15},{ox:cx-u,oy:u*1.5,delay:0.3}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={w+u*2} height={h+u*2} viewBox={`-${u} -${u*0.5} ${w+u*2} ${h+u*2}`}>
      {cubes.map((cb,i)=>(
        <g key={i} style={{animation:`rla-iso ${animationDuration}s ease-in-out ${cb.delay}s infinite`}}>
          <polygon points={isoFace(cb.ox,cb.oy,'top')} fill={c} opacity={0.9}/>
          <polygon points={isoFace(cb.ox,cb.oy,'left')} fill={c} opacity={0.55}/>
          <polygon points={isoFace(cb.ox,cb.oy,'right')} fill={c} opacity={0.7}/>
        </g>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
IsometricLoader.displayName='IsometricLoader';
