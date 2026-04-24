import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-fis0{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(-18px,-10px);opacity:0.4}}@keyframes rla-fis1{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(18px,-10px);opacity:0.4}}@keyframes rla-fis2{0%,100%{transform:translate(0,0);opacity:1}50%{transform:translate(0px,20px);opacity:0.4}}@keyframes rla-fiscore{0%,100%{transform:scale(1);opacity:0.8}40%,60%{transform:scale(2.5);opacity:0.15}}`;document.head.appendChild(el);}
export const FissionLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;const r=s*0.11;
  const particles=[{cx:cx,cy:cx,anim:'rla-fis0'},{cx:cx,cy:cx,anim:'rla-fis1'},{cx:cx,cy:cx,anim:'rla-fis2'}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cx} r={r*2.5} fill={c} opacity={0.08} style={{animation:`rla-fiscore ${animationDuration}s ease-in-out infinite`}}/>
      {particles.map(({cx:px,cy:py,anim},i)=>(
        <circle key={i} cx={px} cy={py} r={r} fill={c} style={{animation:`${anim} ${animationDuration}s ease-in-out ${i*0.1}s infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
FissionLoader.displayName='FissionLoader';
