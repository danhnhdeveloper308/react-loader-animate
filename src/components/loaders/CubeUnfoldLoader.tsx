import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-cunfold{0%,100%{transform:rotateY(0deg) rotateX(0deg)}33%{transform:rotateY(180deg) rotateX(0deg)}66%{transform:rotateY(180deg) rotateX(180deg)}}`;document.head.appendChild(el);}
export const CubeUnfoldLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2.4}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cs=s*0.45;
  const faces=[
    {transform:'rotateY(0deg) translateZ('+cs/2+'px)'},
    {transform:'rotateY(180deg) translateZ('+cs/2+'px)'},
    {transform:'rotateX(90deg) translateZ('+cs/2+'px)'},
    {transform:'rotateX(-90deg) translateZ('+cs/2+'px)'},
    {transform:'rotateY(90deg) translateZ('+cs/2+'px)'},
    {transform:'rotateY(-90deg) translateZ('+cs/2+'px)'},
  ];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{width:s,height:s,perspective:s*2.5,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:cs,height:cs,transformStyle:'preserve-3d',
        animation:`rla-cunfold ${animationDuration}s ease-in-out infinite`}}>
        {faces.map((f,i)=>(
          <div key={i} style={{position:'absolute',inset:0,background:c,opacity:i%2===0?0.7:0.45,border:`1.5px solid ${c}`,boxSizing:'border-box',transform:f.transform}}/>
        ))}
      </div>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
CubeUnfoldLoader.displayName='CubeUnfoldLoader';
