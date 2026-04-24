import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-spinsq{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(0.7)}100%{transform:rotate(360deg) scale(1)}}`;document.head.appendChild(el);}
export const SpinSquaresLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s,display:'flex',alignItems:'center',justifyContent:'center'}}>
      {[0.88,0.65,0.42].map((sc,i)=>(
        <div key={i} style={{position:'absolute',width:s*sc,height:s*sc,border:`2px solid ${c}`,
          opacity:1-i*0.25,borderRadius:2,
          animation:`rla-spinsq ${animationDuration*(1+i*0.4)}s ease-in-out ${i*0.3}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SpinSquaresLoader.displayName='SpinSquaresLoader';
