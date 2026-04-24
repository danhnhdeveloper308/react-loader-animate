import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-ec{0%,100%{transform:scale(1);opacity:0.9}50%{transform:scale(0.35);opacity:0.4}}@keyframes rla-ec2{0%,100%{transform:scale(0.55);opacity:0.5}50%{transform:scale(1);opacity:0.9}}`;document.head.appendChild(el);}
export const ExpandContractLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{position:'absolute',width:s*0.85,height:s*0.85,borderRadius:'50%',border:`2px solid ${c}`,animation:`rla-ec ${animationDuration}s ease-in-out infinite`}}/>
      <div style={{position:'absolute',width:s*0.55,height:s*0.55,borderRadius:'50%',border:`2px solid ${c}`,opacity:0.7,animation:`rla-ec2 ${animationDuration}s ease-in-out infinite`}}/>
      <div style={{width:s*0.2,height:s*0.2,borderRadius:'50%',background:c,opacity:0.8}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
ExpandContractLoader.displayName='ExpandContractLoader';
