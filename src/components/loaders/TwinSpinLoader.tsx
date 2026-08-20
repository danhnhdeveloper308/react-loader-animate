import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
export const TwinSpinLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      {[{anim:'rla-tspin',size:'70%',op:1},{anim:'rla-tspin2',size:'50%',op:0.6}].map(({anim,size:sz,op},i)=>(
        <div key={i} style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
          width:sz,height:sz,borderRadius:'50%',border:`2.5px solid ${c}`,borderTopColor:'transparent',
          opacity:op,animation:`${anim} ${animationDuration}s ease-in-out infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
