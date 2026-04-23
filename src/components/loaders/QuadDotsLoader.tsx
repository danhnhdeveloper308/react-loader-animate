import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,d:7}, md:{s:52,d:10}, lg:{s:68,d:13} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-quadsp{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-quadpulse{0%,100%{transform:scale(0.7);opacity:0.4}50%{transform:scale(1.2);opacity:1}}`;document.head.appendChild(el);}
export const QuadDotsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,d}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r=cx*0.7;
  const positions=[{angle:0},{angle:90},{angle:180},{angle:270}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <g style={{transformOrigin:`${cx}px ${cx}px`,animation:`rla-quadsp ${animationDuration}s linear infinite`}}>
        {positions.map((p,i)=>{
          const rad=p.angle*Math.PI/180;const x=cx+r*Math.cos(rad),y=cx+r*Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r={d/2} fill={c} opacity={0.3+i*0.17}/>;
        })}
      </g>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
QuadDotsLoader.displayName='QuadDotsLoader';
