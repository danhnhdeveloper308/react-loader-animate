import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
export const PuzzleLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const qs=s*0.4;const gap=2;
  const pieces=[{anim:'rla-puzTL',t:0,l:0},{anim:'rla-puzTR',t:0,l:s/2+gap/2},{anim:'rla-puzBL',t:s/2+gap/2,l:0},{anim:'rla-puzBR',t:s/2+gap/2,l:s/2+gap/2}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      {pieces.map(({anim,t,l},i)=>(
        <div key={i} style={{position:'absolute',top:t+(s/2-qs-gap/2),left:l+(s/2-qs-gap/2),width:qs,height:qs,
          background:c,opacity:0.5+i*0.12,borderRadius:qs*0.15,
          willChange:'transform',animation:`${anim} ${animationDuration}s cubic-bezier(.4,0,.2,1) ${-i*animationDuration*0.035}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
