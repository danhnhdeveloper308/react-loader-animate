import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
export const FissionLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;const r=s*0.11;
  const particles=[{cx:cx,cy:cx,anim:'rla-fis0'},{cx:cx,cy:cx,anim:'rla-fis1'},{cx:cx,cy:cx,anim:'rla-fis2'}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cx} r={r*2.5} fill={c} opacity={0.08} style={{transformBox:'fill-box',transformOrigin:'center',willChange:'transform, opacity',animation:`rla-fiscore ${animationDuration}s cubic-bezier(.4,0,.2,1) infinite`}}/>
      {particles.map(({cx:px,cy:py,anim},i)=>(
        <circle key={i} cx={px} cy={py} r={r} fill={c} style={{willChange:'transform, opacity',animation:`${anim} ${animationDuration}s cubic-bezier(.4,0,.2,1) ${-i*animationDuration*0.04}s infinite`}}/>
      ))}
    </svg>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
