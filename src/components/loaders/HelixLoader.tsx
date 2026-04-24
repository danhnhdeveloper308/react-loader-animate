import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{w:32,h:52},md:{w:42,h:68},lg:{w:54,h:84}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-helixflow{from{stroke-dashoffset:80}to{stroke-dashoffset:0}}`;document.head.appendChild(el);}
export const HelixLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{w,h}=CONFIGS[size];const c=resolveColor(variant,color);
  const n=6;const step=h/n;const L=w*0.1,R=w*0.9,MX=w/2;
  // Build two sinusoidal strands that cross each other
  const strandPath=(phase:number)=>Array.from({length:n+1},(_,i)=>{
    const y=i*step;
    const x=MX+(R-MX)*Math.cos(i*Math.PI+phase);
    return i===0?`M ${x},${y}`:`L ${x},${y}`;
  }).join(' ');
  // Rung connectors
  const rungs=Array.from({length:n+1},(_,i)=>{
    const y=i*step;
    const xA=MX+(R-MX)*Math.cos(i*Math.PI);
    const xB=MX+(R-MX)*Math.cos(i*Math.PI+Math.PI);
    return{y,xA,xB};
  });
  const totalLen=n*step*1.3;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {rungs.map(({y,xA,xB},i)=>(
        <line key={i} x1={xA} y1={y} x2={xB} y2={y} stroke={c} strokeWidth={1.2} opacity={0.25}/>
      ))}
      {[0,Math.PI].map((phase,si)=>(
        <path key={si} d={strandPath(phase)} fill="none" stroke={c} strokeWidth={2.8}
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={`${totalLen*0.25} ${totalLen*0.75}`}
          opacity={si===0?1:0.7}
          style={{animation:`rla-helixflow ${animationDuration}s linear ${si===0?'0s':`${-animationDuration/2}s`} infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
HelixLoader.displayName='HelixLoader';
