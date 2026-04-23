import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS={sm:{n:8,r:4,amp:10,sw:44},md:{n:10,r:5,amp:14,sw:60},lg:{n:12,r:6,amp:18,sw:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-sinewave{0%,100%{transform:translateY(0)}50%{transform:translateY(var(--amp))}}`;document.head.appendChild(el);}
export const SineWaveLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{n,r,amp,sw}=CONFIGS[size];const c=resolveColor(variant,color);const h=amp*2+r*2+4;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{display:'flex',alignItems:'center',gap:r*0.6,height:h}}>
      {Array.from({length:n},(_,i)=>(
        <div key={i} style={{width:r*2,height:r*2,borderRadius:'50%',background:c,flexShrink:0,
          ['--amp' as string]:`-${amp}px`,
          animation:`rla-sinewave ${animationDuration}s ease-in-out ${-animationDuration*(i/n)}s infinite`}}/>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
SineWaveLoader.displayName='SineWaveLoader';
