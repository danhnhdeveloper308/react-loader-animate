import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,d:7}, md:{s:52,d:10}, lg:{s:68,d:13} };
export const QuadDotsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  ;if(!visible)return null;
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
