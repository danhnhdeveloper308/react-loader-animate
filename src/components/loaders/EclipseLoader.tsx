import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{s:36}, md:{s:52}, lg:{s:68} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-eclipse{0%{transform:translateX(-90%)}100%{transform:translateX(90%)}}@keyframes rla-eclcorona{0%,100%{opacity:0.3;r:0}50%{opacity:0.7}}`;document.head.appendChild(el);}
export const EclipseLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2,sr=cx*0.5;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} overflow="visible">
      <defs><radialGradient id="rla-eclg"><stop offset="60%" stopColor={c} stopOpacity={0.15}/><stop offset="100%" stopColor={c} stopOpacity={0}/></radialGradient></defs>
      <circle cx={cx} cy={cx} r={sr*1.6} fill="url(#rla-eclg)" opacity={0.5}/>
      <circle cx={cx} cy={cx} r={sr} fill={c} opacity={0.25}/>
      <circle cx={cx} cy={cx} r={sr*0.9} fill={c} opacity={0.15}/>
      <circle cx={cx} cy={cx} r={sr} fill="none" stroke={c} strokeWidth={1.5} opacity={0.3}/>
      <circle cx={cx} cy={cx} r={sr} fill="#000000aa" style={{animation:`rla-eclipse ${animationDuration}s ease-in-out infinite alternate`}}/>
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
EclipseLoader.displayName='EclipseLoader';
