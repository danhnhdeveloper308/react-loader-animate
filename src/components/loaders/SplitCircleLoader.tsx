import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-scL{0%,100%{transform:translateX(0) rotate(0deg)}40%,60%{transform:translateX(-30%) rotate(-180deg)}}@keyframes rla-scR{0%,100%{transform:translateX(0) rotate(0deg)}40%,60%{transform:translateX(30%) rotate(180deg)}}`;document.head.appendChild(el);}
export const SplitCircleLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const hs=s*0.48;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      {/* left half */}
      <div style={{position:'absolute',top:0,left:0,width:s/2,height:s,overflow:'hidden',animation:`rla-scL ${animationDuration}s ease-in-out infinite`}}>
        <div style={{width:s,height:s,borderRadius:'50%',border:`3px solid ${c}`,boxSizing:'border-box'}}/>
      </div>
      {/* right half */}
      <div style={{position:'absolute',top:0,left:s/2,width:s/2,height:s,overflow:'hidden',animation:`rla-scR ${animationDuration}s ease-in-out infinite`}}>
        <div style={{width:s,height:s,marginLeft:-s/2,borderRadius:'50%',border:`3px solid ${c}`,boxSizing:'border-box'}}/>
      </div>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SplitCircleLoader.displayName='SplitCircleLoader';
