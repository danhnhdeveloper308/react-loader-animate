import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:52,d:10},md:{s:68,d:14},lg:{s:84,d:18}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-mbL{0%,100%{transform:translateX(0);opacity:1}45%,55%{transform:translateX(20px);opacity:0.5}}@keyframes rla-mbR{0%,100%{transform:translateX(0);opacity:1}45%,55%{transform:translateX(-20px);opacity:0.5}}@keyframes rla-mbM{0%,100%{transform:scale(0);opacity:0}45%,55%{transform:scale(1.4);opacity:0.8}}`;document.head.appendChild(el);}
export const MergeBallsLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s,d}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:d,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{position:'absolute',left:s*0.1,width:d,height:d,borderRadius:'50%',background:c,animation:`rla-mbL ${animationDuration}s ease-in-out infinite`}}/>
      <div style={{position:'absolute',width:d*1.2,height:d*1.2,borderRadius:'50%',background:c,opacity:0,animation:`rla-mbM ${animationDuration}s ease-in-out infinite`}}/>
      <div style={{position:'absolute',right:s*0.1,width:d,height:d,borderRadius:'50%',background:c,animation:`rla-mbR ${animationDuration}s ease-in-out infinite`}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
MergeBallsLoader.displayName='MergeBallsLoader';
