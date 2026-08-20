import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36,sw:2.5}, md:{s:52,sw:3}, lg:{s:68,sw:4} };
export const GyroscopeLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s,sw}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,r=cx-sw;
  const rings=[{kf:'rla-gyroA',dur:animationDuration,op:1},{kf:'rla-gyroB',dur:animationDuration*1.3,op:0.7},{kf:'rla-gyroC',dur:animationDuration*0.8,op:0.45}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{perspective:'200px'}}>
      {rings.map((rg,i)=>(
        <ellipse key={i} cx={cx} cy={cx} rx={i===1?r*0.9:r} ry={i===2?r*0.35:i===1?r*0.35:r} fill="none" stroke={c} strokeWidth={sw} opacity={rg.op} style={{transformOrigin:`${cx}px ${cx}px`,animation:`${rg.kf} ${rg.dur}s linear infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
