import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-puzTL{0%,100%{transform:translate(0,0)}40%,60%{transform:translate(-6px,-6px) rotate(-15deg)}}@keyframes rla-puzTR{0%,100%{transform:translate(0,0)}40%,60%{transform:translate(6px,-6px) rotate(15deg)}}@keyframes rla-puzBL{0%,100%{transform:translate(0,0)}40%,60%{transform:translate(-6px,6px) rotate(15deg)}}@keyframes rla-puzBR{0%,100%{transform:translate(0,0)}40%,60%{transform:translate(6px,6px) rotate(-15deg)}}`;document.head.appendChild(el);}
export const PuzzleLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const qs=s*0.4;const gap=2;
  const pieces=[{anim:'rla-puzTL',t:0,l:0},{anim:'rla-puzTR',t:0,l:s/2+gap/2},{anim:'rla-puzBL',t:s/2+gap/2,l:0},{anim:'rla-puzBR',t:s/2+gap/2,l:s/2+gap/2}];
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      {pieces.map(({anim,t,l},i)=>(
        <div key={i} style={{position:'absolute',top:t+(s/2-qs-gap/2),left:l+(s/2-qs-gap/2),width:qs,height:qs,
          background:c,opacity:0.5+i*0.12,borderRadius:qs*0.15,
          animation:`${anim} ${animationDuration}s ease-in-out ${i*0.1}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
PuzzleLoader.displayName='PuzzleLoader';
