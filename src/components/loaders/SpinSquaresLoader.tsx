import{memo}from'react';import{LoaderProps,resolveColor}from'./types';
const CONFIGS={sm:{s:40},md:{s:56},lg:{s:72}};
export const SpinSquaresLoader=memo(({size='md',variant='primary',color,visible=true,ariaLabel='loading',wrapperStyle,wrapperClass='',animationDuration=2}:LoaderProps)=>{
  ;if(!visible)return null;
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
