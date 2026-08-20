import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:52,d:9},md:{s:68,d:12},lg:{s:84,d:15}};
export const CollideLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.6}:LoaderProps)=>{
  ;if(!visible)return null;
  const{s,d}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:d,display:'flex',alignItems:'center',justifyContent:'space-between',padding:`0 ${s*0.05}px`,boxSizing:'border-box'}}>
      <div style={{width:d,height:d,borderRadius:'50%',background:c,flexShrink:0,animation:`rla-colli1 ${animationDuration}s ease-in-out infinite`}}/>
      <div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',width:d*1.4,height:d*1.4,borderRadius:'50%',background:c,opacity:0,animation:`rla-collimid ${animationDuration}s ease-in-out infinite`}}/>
      <div style={{width:d,height:d,borderRadius:'50%',background:c,flexShrink:0,animation:`rla-colli2 ${animationDuration}s ease-in-out infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
