import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:40,r:14}, md:{s:56,r:20}, lg:{s:72,r:26} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-kaleido{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-kaleidoR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`;document.head.appendChild(el);}
export const KaleidoLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=3}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,r}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,n=6;
  const petals=Array.from({length:n},(_,i)=>{const a=(i/n)*Math.PI*2;const x=cx+r*Math.cos(a),y=cx+r*Math.sin(a);return{x,y,a:a*180/Math.PI};});
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-kaleido ${animationDuration}s linear infinite`}}>
        {petals.map((p,i)=>(
          <ellipse key={i} cx={p.x} cy={p.y} rx={r*0.45} ry={r*0.22} fill={c} opacity={0.2+i*0.08} transform={`rotate(${p.a+90},${p.x},${p.y})`}/>
        ))}
      </g>
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-kaleidoR ${animationDuration*0.7}s linear infinite`}}>
        {petals.map((p,i)=>(
          <ellipse key={i} cx={(cx+p.x)/2} cy={(cx+p.y)/2} rx={r*0.22} ry={r*0.1} fill={c} opacity={0.5-i*0.04} transform={`rotate(${p.a},${(cx+p.x)/2},${(cx+p.y)/2})`}/>
        ))}
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
KaleidoLoader.displayName='KaleidoLoader';
