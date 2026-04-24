import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:52},md:{s:68},lg:{s:84}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-tm0{0%,100%{transform:translate(0,0);opacity:0.9}45%,55%{transform:translate(10px,6px);opacity:0.35}}@keyframes rla-tm1{0%,100%{transform:translate(0,0);opacity:0.9}45%,55%{transform:translate(-10px,6px);opacity:0.35}}@keyframes rla-tm2{0%,100%{transform:translate(0,0);opacity:0.9}45%,55%{transform:translate(0,-12px);opacity:0.35}}@keyframes rla-tmcore{0%,100%{transform:scale(0);opacity:0}45%,55%{transform:scale(1.8);opacity:0.6}}`;document.head.appendChild(el);}
export const TripleMergeLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;const r=s*0.1;const offset=s*0.24;
  const balls=[{cx:cx-offset,cy:cx+offset*0.58,anim:'rla-tm0'},{cx:cx+offset,cy:cx+offset*0.58,anim:'rla-tm1'},{cx:cx,cy:cx-offset*1.16,anim:'rla-tm2'}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cx} r={r*1.5} fill={c} opacity={0} style={{animation:`rla-tmcore ${animationDuration}s ease-in-out infinite`}}/>
      {balls.map(({cx:bx,cy:by,anim},i)=>(
        <circle key={i} cx={bx} cy={by} r={r} fill={c} style={{animation:`${anim} ${animationDuration}s ease-in-out ${i*0.1}s infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
TripleMergeLoader.displayName='TripleMergeLoader';
