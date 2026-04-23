import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{w:40,h:28}, md:{w:56,h:38}, lg:{w:72,h:50} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-glitch1{0%,100%{clip-path:inset(40% 0 50% 0);transform:translateX(-4px)}20%{clip-path:inset(10% 0 80% 0);transform:translateX(4px)}40%{clip-path:inset(60% 0 20% 0);transform:translateX(-2px)}60%{clip-path:inset(25% 0 65% 0);transform:translateX(3px)}80%{clip-path:inset(70% 0 10% 0);transform:translateX(-3px)}}@keyframes rla-glitch2{0%,100%{clip-path:inset(50% 0 30% 0);transform:translateX(3px)}25%{clip-path:inset(15% 0 70% 0);transform:translateX(-3px)}50%{clip-path:inset(75% 0 5% 0);transform:translateX(2px)}75%{clip-path:inset(35% 0 55% 0);transform:translateX(-4px)}}`;document.head.appendChild(el);}
export const GlitchLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  inject();if(!visible)return null;
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
GlitchLoader.displayName='GlitchLoader';
