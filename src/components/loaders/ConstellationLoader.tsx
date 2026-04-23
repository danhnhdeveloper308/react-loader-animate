import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-constellate{0%,100%{opacity:0.2;transform:scale(0.7)}50%{opacity:1;transform:scale(1)}}@keyframes rla-conline{0%,100%{opacity:0.1}50%{opacity:0.5}}`;document.head.appendChild(el);}
export const ConstellationLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;
  const stars=[
    [cx,cx*0.22],[cx*1.6,cx*0.55],[cx*1.75,cx*1.4],
    [cx,cx*1.78],[cx*0.25,cx*1.4],[cx*0.4,cx*0.55],
  ];
  const lines=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,3],[1,4]];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {lines.map(([a,b],i)=>(
        <line key={i} x1={stars[a][0]} y1={stars[a][1]} x2={stars[b][0]} y2={stars[b][1]}
          stroke={c} strokeWidth={1} style={{animation:`rla-conline ${animationDuration}s ease-in-out ${i*0.2}s infinite`}}/>
      ))}
      {stars.map(([sx,sy],i)=>(
        <circle key={i} cx={sx} cy={sy} r={s*0.045} fill={c}
          style={{animation:`rla-constellate ${animationDuration}s ease-in-out ${i*(animationDuration/6)}s infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ConstellationLoader.displayName='ConstellationLoader';
