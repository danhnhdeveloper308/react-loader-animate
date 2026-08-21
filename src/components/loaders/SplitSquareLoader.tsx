import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
export const SplitSquareLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const qs=s*0.38;const gap=2;const offset=(s/2-qs-gap/2);
  const quads=[{anim:'rla-ssqTL',style:{top:offset,left:offset}},{anim:'rla-ssqTR',style:{top:offset,left:s/2+gap/2}},{anim:'rla-ssqBL',style:{top:s/2+gap/2,left:offset}},{anim:'rla-ssqBR',style:{top:s/2+gap/2,left:s/2+gap/2}}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      {quads.map(({anim,style:st},i)=>(
        <div key={i} style={{position:'absolute',width:qs,height:qs,background:c,opacity:0.6+i*0.1,borderRadius:2,...st,willChange:'transform',animation:`${anim} ${animationDuration}s cubic-bezier(.4,0,.2,1) infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
