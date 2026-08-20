import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{w:24,h:32}, md:{w:34,h:46}, lg:{w:46,h:60} };
export const CylinderLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  ;if(!visible)return null;
  const{w,h}=CONFIGS[size];const c=resolveColor(variant,color);const rx=w/2;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:w,height:h,position:'relative',animation:`rla-cylin ${animationDuration}s linear infinite`,transformStyle:'preserve-3d',perspective:'120px'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:rx*0.5,borderRadius:'50%',background:c,opacity:0.85}}/>
      <div style={{position:'absolute',top:rx*0.25,left:0,right:0,bottom:rx*0.25,background:`linear-gradient(to right,${c},${c}60,${c})`}}/>
      <div style={{position:'absolute',top:rx*0.25,left:0,right:0,bottom:rx*0.25,background:`linear-gradient(to right,transparent 20%,rgba(255,255,255,0.25) 50%,transparent 80%)`,animation:`rla-cylshine ${animationDuration}s ease-in-out infinite`}}/>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:rx*0.5,borderRadius:'50%',background:c,opacity:0.65}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
