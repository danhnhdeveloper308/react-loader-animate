import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36}, md:{s:52}, lg:{s:68} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-snowflake{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-snowpulse{0%,100%{opacity:0.5;transform:scale(0.9)}50%{opacity:1;transform:scale(1)}}`;document.head.appendChild(el);}
export const SnowflakeLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=3}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r=cx*0.88;
  const arms=6;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{animation:`rla-snowflake ${animationDuration}s linear infinite`}}>
      {Array.from({length:arms},(_,i)=>{
        const a=(i/arms)*Math.PI*2;const x2=cx+r*Math.cos(a),y2=cx+r*Math.sin(a);
        const bx1=cx+(r*0.4)*Math.cos(a+Math.PI/6),by1=cx+(r*0.4)*Math.sin(a+Math.PI/6);
        const bx2=cx+(r*0.4)*Math.cos(a-Math.PI/6),by2=cx+(r*0.4)*Math.sin(a-Math.PI/6);
        const ex1=cx+(r*0.65)*Math.cos(a)+r*0.2*Math.cos(a+Math.PI/2),ey1=cx+(r*0.65)*Math.sin(a)+r*0.2*Math.sin(a+Math.PI/2);
        const ex2=cx+(r*0.65)*Math.cos(a)+r*0.2*Math.cos(a-Math.PI/2),ey2=cx+(r*0.65)*Math.sin(a)+r*0.2*Math.sin(a-Math.PI/2);
        return(<g key={i}>
          <line x1={cx} y1={cx} x2={x2} y2={y2} stroke={c} strokeWidth={1.8}/>
          <line x1={bx1} y1={by1} x2={bx2} y2={by2} stroke={c} strokeWidth={1.2} opacity={0.7}/>
          <line x1={cx+(r*0.65)*Math.cos(a)} y1={cx+(r*0.65)*Math.sin(a)} x2={ex1} y2={ey1} stroke={c} strokeWidth={1.2} opacity={0.7}/>
          <line x1={cx+(r*0.65)*Math.cos(a)} y1={cx+(r*0.65)*Math.sin(a)} x2={ex2} y2={ey2} stroke={c} strokeWidth={1.2} opacity={0.7}/>
        </g>);
      })}
      <circle cx={cx} cy={cx} r={s*0.055} fill={c}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SnowflakeLoader.displayName='SnowflakeLoader';
