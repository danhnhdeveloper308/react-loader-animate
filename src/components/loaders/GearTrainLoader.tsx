import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:60,r1:14,r2:9}, md:{s:80,r1:18,r2:12}, lg:{s:100,r1:23,r2:15} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-gearA{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-gearB{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`;document.head.appendChild(el);}
function gearPath(cx:number,cy:number,rOuter:number,rInner:number,teeth:number):string{
  let d='';
  for(let i=0;i<teeth;i++){
    const a1=(i/teeth)*Math.PI*2,a2=((i+0.4)/teeth)*Math.PI*2,a3=((i+0.6)/teeth)*Math.PI*2,a4=((i+1)/teeth)*Math.PI*2;
    const p=(v:number,r:number)=>`${cx+r*Math.cos(v)},${cy+r*Math.sin(v)}`;
    d+=(i===0?'M':'L')+p(a1,rInner)+' L'+p(a1,rOuter)+' L'+p(a2,rOuter)+' L'+p(a2,rInner)+' ';
    d+='A '+rInner+' '+rInner+' 0 0 1 '+p(a4,rInner)+' ';
  }
  return d+'Z';
}
export const GearTrainLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,r1,r2}=CONFIGS[size];const c=resolveColor(variant,color);
  const cx1=s*0.33,cx2=s*0.67,cy=s/2;const teeth1=10,teeth2=6;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <g style={{transformOrigin:`${cx1}px ${cy}px`,animation:`rla-gearA ${animationDuration}s linear infinite`}}>
        <path d={gearPath(cx1,cy,r1,r1*0.7,teeth1)} fill={c} opacity={0.85}/>
        <circle cx={cx1} cy={cy} r={r1*0.3} fill="rgba(0,0,0,0.2)"/>
      </g>
      <g style={{transformOrigin:`${cx2}px ${cy}px`,animation:`rla-gearB ${animationDuration*(teeth1/teeth2)}s linear infinite`}}>
        <path d={gearPath(cx2,cy,r2,r2*0.65,teeth2)} fill={c} opacity={0.6}/>
        <circle cx={cx2} cy={cy} r={r2*0.3} fill="rgba(0,0,0,0.2)"/>
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
GearTrainLoader.displayName='GearTrainLoader';
