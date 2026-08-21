import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
export const ExpandContractLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{position:'absolute',width:s*0.85,height:s*0.85,borderRadius:'50%',border:`2px solid ${c}`,willChange:'transform, opacity',animation:`rla-ec ${animationDuration}s cubic-bezier(.4,0,.2,1) infinite`}}/>
      <div style={{position:'absolute',width:s*0.55,height:s*0.55,borderRadius:'50%',border:`2px solid ${c}`,opacity:0.7,willChange:'transform, opacity',animation:`rla-ec2 ${animationDuration}s cubic-bezier(.4,0,.2,1) -${animationDuration*0.08}s infinite`}}/>
      <div style={{width:s*0.2,height:s*0.2,borderRadius:'50%',background:c,opacity:0.8}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
