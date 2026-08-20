import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{w:40,h:28}, md:{w:56,h:38}, lg:{w:72,h:50} };
export const GlitchLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
  const{w,h}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:w,height:h}}>
      <div style={{position:'absolute',inset:0,background:c,borderRadius:3,opacity:0.8}}/>
      <div style={{position:'absolute',inset:0,background:'#ff004466',borderRadius:3,animation:`rla-glitch1 ${animationDuration*0.4}s steps(1) infinite`}}/>
      <div style={{position:'absolute',inset:0,background:'#00ffff66',borderRadius:3,animation:`rla-glitch2 ${animationDuration*0.35}s steps(1) infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
