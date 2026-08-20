import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{w:48,d:9}, md:{w:64,d:12}, lg:{w:80,d:16} };
export const OscillateLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1}:LoaderProps)=>{
  ;if(!visible)return null;
  const{w,d}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:w,height:d*1.5,display:'flex',alignItems:'center'}}>
      <div style={{position:'absolute',left:0,right:0,height:1.5,background:c,opacity:0.2,borderRadius:1}}/>
      <div style={{position:'absolute',left:'50%',marginLeft:-d/2,width:d,height:d,borderRadius:'50%',background:c,animation:`rla-osc ${animationDuration}s cubic-bezier(0.4,0,0.6,1) infinite`}}/>
      <div style={{position:'absolute',left:0,height:d*0.5,width:d*0.5,borderRadius:'50%',background:c,opacity:0.35}}/>
      <div style={{position:'absolute',right:0,height:d*0.5,width:d*0.5,borderRadius:'50%',background:c,opacity:0.35}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
