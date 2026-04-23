import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';
const CONFIGS = { sm:{fw:10,fh:14,gap:3,holes:3}, md:{fw:14,fh:20,gap:4,holes:3}, lg:{fw:18,fh:26,gap:5,holes:3} };
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-film{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`;document.head.appendChild(el);}
export const FilmStripLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.2}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{fw,fh,gap}=CONFIGS[size];const c=resolveColor(variant,color);const n=8;const stripW=(fw+gap)*n;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={{...wrapperStyle,overflow:'hidden',width:(fw+gap)*4}}>
    <div style={{display:'flex',gap,width:stripW*2,animation:`rla-film ${animationDuration}s linear infinite`}}>
      {Array.from({length:n*2},(_,i)=>(
        <div key={i} style={{flexShrink:0,width:fw,height:fh,background:c,borderRadius:2,opacity:i%2===0?1:0.4,position:'relative'}}>
          {[0.15,0.5,0.85].map((yp,j)=>(
            <div key={j} style={{position:'absolute',top:`${yp*100-8}%`,left:'15%',width:'70%',height:'16%',background:'rgba(0,0,0,0.35)',borderRadius:1}}/>
          ))}
        </div>
      ))}
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
FilmStripLoader.displayName='FilmStripLoader';
