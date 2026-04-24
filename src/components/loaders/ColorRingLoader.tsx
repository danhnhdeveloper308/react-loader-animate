import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

const DEFAULT_COLORS = ['#e15b64','#f47e60','#f8b26a','#abbd81','#849b87'];
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-colring{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;document.head.appendChild(el);}

export const ColorRingLoader=memo(({
  size='md',variant='primary',color,colors,className='',
  height,width,ariaLabel='Loading',wrapperStyle,wrapperClass='',
  visible=true,strokeWidth=5,animationDuration=2,
}:LoaderProps)=>{
  inject();if(!visible)return null;
  const palette=colors&&colors.length>=5?colors:DEFAULT_COLORS;
  const fallback=resolveColor(variant,color);
  const resolved=palette.map((c,i)=>c??fallback??DEFAULT_COLORS[i]);
  const{sizeClass,sizeStyle}=resolveSizeClass(size,height,width);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg className={`${sizeClass} ${className}`}
      style={{...sizeStyle,animation:`rla-colring ${animationDuration}s linear infinite`}}
      viewBox="0 0 50 50">
      {resolved.slice(0,5).map((c,i)=>{
        const r=22-i*4;const circ=2*Math.PI*r;
        return(<circle key={i} cx={25} cy={25} r={r} fill="none" stroke={c}
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={`${circ*0.25} ${circ*0.75}`}
          strokeDashoffset={i*-15}/>);
      })}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ColorRingLoader.displayName='ColorRingLoader';
