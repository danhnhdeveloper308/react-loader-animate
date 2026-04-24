import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:44},md:{s:60},lg:{s:76}};
let inj=false;
function inject(){if(inj||typeof document==='undefined')return;inj=true;const el=document.createElement('style');el.textContent=`@keyframes rla-ddorb{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes rla-ddorb2{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}`;document.head.appendChild(el);}
export const DoubleDotOrbitLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=1.8}:LoaderProps)=>{
  inject();if(!visible)return null;
  const{s}=CONFIGS[size];const c=resolveColor(variant,color);const cx=s/2;const r=cx*0.7;
  return(<div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
    <div style={{position:'relative',width:s,height:s}}>
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:r*2,height:r*2,borderRadius:'50%',border:`1.5px dashed ${c}`,opacity:0.2}}/>
      </div>
      {/* outer orbit — 2 dots */}
      <div style={{position:'absolute',inset:0,animation:`rla-ddorb ${animationDuration}s linear infinite`}}>
        {[0,180].map(deg=>{const rad=deg*Math.PI/180;return(<div key={deg} style={{position:'absolute',width:s*0.12,height:s*0.12,borderRadius:'50%',background:c,top:cx-r*Math.sin(rad)-s*0.06,left:cx+r*Math.cos(rad)-s*0.06}}/>);})}
      </div>
      {/* inner orbit — 3 dots, opposite direction */}
      <div style={{position:'absolute',inset:0,animation:`rla-ddorb2 ${animationDuration*1.4}s linear infinite`}}>
        {[0,120,240].map(deg=>{const rad=deg*Math.PI/180;const ir=r*0.45;return(<div key={deg} style={{position:'absolute',width:s*0.08,height:s*0.08,borderRadius:'50%',background:c,opacity:0.6,top:cx-ir*Math.sin(rad)-s*0.04,left:cx+ir*Math.cos(rad)-s*0.04}}/>);})}
      </div>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:s*0.12,height:s*0.12,borderRadius:'50%',background:c,opacity:0.4}}/>
    </div>
    <span className="sr-only">{ariaLabel}</span>
  </div>);
});
DoubleDotOrbitLoader.displayName='DoubleDotOrbitLoader';
