import{j as o}from"./vendor-animation-NadEQFtp.js";import{L as $,T as S,h as _,a as k,b as M,s as a,C as z,S as A,c as P,d as F,e as D,m as T,f as h,p as X,r as v}from"./index-BIg035bv.js";import{r as n,L as Y}from"./vendor-react-DxOmqXaI.js";import"./vendor-utils-D24pSdc9.js";const q=({project:s,additionalStyles:p,onanimationend:d})=>{const{currentLang:l}=n.useContext($),{currentTheme:g}=n.useContext(S),c=n.useRef(null),x=g==="dark";return o.jsxs("div",{ref:c,id:`card-${s.title[l]}-container`,className:`
        group
        ${a.sizeFull}
        xl:max-h-[75%] lg:max-h-[65%] md:max-h-[65%] sm:max-h-[70%] ss:max-h-[65%] xs:max-h-[60%] max-h-[60%]
        2xl:max-w-95 xl:max-w-87.5 lg:max-w-75 md:max-w-80 sm:max-w-[60%] ss:max-w-[75%] max-w-[80%]
        aspect-square
        absolute
        rounded-xl
        overflow-hidden
        cursor-pointer
        ${a.easeOutTransition}
        ${x?`
            bg-(--color-surface)
            border border-(--color-border)
            shadow-(--shadow-card)
            hover:border-(--color-tertiary)/30
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          `:`
            bg-(--color-surface)
            border-(--color-border)
            shadow-(--shadow-card)
            hover:shadow-(--shadow-card-hover)
          `}
        hover:-translate-y-1
      `,style:p,onMouseLeave:()=>M(c.current),onMouseMove:u=>k(u,c.current),onMouseEnter:()=>_(c.current),onAnimationEnd:u=>d?d(u):()=>{},children:[o.jsx("div",{id:`top-card-${s.title[l]}-line`,className:`
          absolute
          top-0 left-0 right-0
          h-0.75
          transition-all duration-300
          bg-linear-to-r from-(--color-tertiary)/0 via-(--color-tertiary) to-(--color-tertiary)/0 opacity-0 group-hover:opacity-100 shadow-(--glow-md)
        `}),o.jsx(Y,{to:"/projects",className:`
          block 
          ${a.sizeFull}
        `,children:o.jsx(z,{title:s.title[l]||s.title[0],content:s.description[l],tags:s.tags[l]?s.tags[l].concat(s.tags[0]):s.tags[0],moreTopClasses:"pt-4",titleProps:`
            lg:text-xl md:text-lg sm:text-lg ss:text-md text-sm
            md:px-[8%] px-[10%]
            md:mb-[4%] xs:mb-0 mb-[1%]
            mt-6
            text-(--color-quaternary)
            group-hover:text-(--color-tertiary)
            transition-colors duration-300
          `,contentProps:`
            2xl:text-lg lg:text-lg md:text-md sm:text-sm ss:text-xs text-2xs
            md:px-[8%] px-[10%]
            md:mt-0 mt-2
            mb-[4%]
            wrap-break-word
            text-(--color-quaternary)/80
          `,tagsProps:`
            2xl:text-sm lg:text-md md:text-sm sm:text-sm ss:text-sm text-2xs
            md:px-[8%] px-[10%]
          `},`card-${s.title}`)})]})},G=()=>{const{currentTheme:s}=n.useContext(S),{currentLang:p}=n.useContext($),[d,l]=n.useState([]),g=n.useRef(!1),c=n.useRef(0),x=n.useRef(null),u=n.useRef(0),b=n.useRef(0),w=n.useRef(0),C=(t,e)=>t===e-1?0:t%2===0?t+v(4,9):`-${t+v(2,6)}`,R=()=>{const t=[];return X.slice(0,10).map((e,r,i)=>{t.push(o.jsx(q,{project:e,additionalStyles:{rotate:`${C(r,i.length)}deg`,animation:"card-apparition 0.5s cubic-bezier(.54,.54,.57,.56) forwards",transformStyle:"preserve-3d"}},`project-${r}-card`))}),t};n.useEffect(()=>{const t=x.current;if(!t)return;const e=r=>{const i=r.touches[0].clientX,f=r.touches[0].clientY,m=Math.abs(u.current-i),L=Math.abs(b.current-f);m>L&&m>10&&r.cancelable&&r.preventDefault()};return t.addEventListener("touchmove",e,{passive:!1}),()=>t.removeEventListener("touchmove",e)},[]),n.useEffect(()=>{const t=R();let e=0;const r=setInterval(()=>{e<t.length?l(t.slice(0,e+1)):clearInterval(r),e++},A);return()=>{clearInterval(r),setTimeout(()=>g.current=!0,P*t.length)}},[p,s]);const y=(t,e)=>{let r;return t.map((i,f)=>{switch(r=0,f){case t.length-1:return r=c.current,c.current=e==="next"?c.current:0,n.cloneElement(i,{additionalStyles:{animation:e==="next"?"card-top-to-bottom 2s ease-in forwards":"card-top-to-second ease-in 0.2s forwards",rotate:`${r!==0?r:C(v(0,1),t.length)}deg`},onaonanimationend:e==="next"?m=>{m.currentTarget.style.rotate="0deg"}:void 0});case t.length-2:return c.current=e==="next"?parseInt(i.props.additionalStyles.rotate.split("deg")[0]):c.current,n.cloneElement(i,{additionalStyles:{animation:e==="next"?"card-reach-top ease-in 0.3s forwards":"",rotate:`${i.props.additionalStyles.rotate}`},onanimationend:e==="next"?m=>{m.currentTarget.style.rotate="0deg"}:void 0});case 0:return n.cloneElement(i,{additionalStyles:{animation:e==="next"?"":"card-bottom-to-top 1s ease-in forwards",rotate:e==="next"?`${i.props.additionalStyles.rotate}`:"0deg"}});default:return n.cloneElement(i)}})},E=()=>{if(d.length<=1)return;const[t,...e]=y(d,"prev");l([...e,t])},j=()=>{if(d.length<=1)return;const t=y(d,"next"),e=t.pop();e&&l([e,...t])},N=t=>{u.current=t.targetTouches[0].clientX,b.current=t.targetTouches[0].clientY},I=t=>{w.current=t.changedTouches[0].clientX;const e=u.current-w.current;e>50?E():e<-50&&j()};return o.jsxs("section",{id:"projects-slider",className:`
        relative
        w-full h-[65vh] ss:h-[75vh] sm:h-[65vh] md:h-screen
        md:max-h-[70vh] min-h-70
        ${a.flexRow}
        ${a.contentCenter}
        lg:space-x-[10%]
      `,children:[o.jsxs("div",{id:"cards-stack-container",ref:x,className:`
          ${a.sizeFull}
          ${a.flexRow}
          ${a.contentCenter}
          relative
        `,style:{perspective:F},onTouchStart:N,onTouchEnd:I,children:[d.map(t=>t),o.jsx(D,{bottomClass:"sm:bottom-0 ss:bottom-0 xs:bottom-8 bottom-5",animationName:"swipe-hint-projects-slider"}),o.jsx("button",{id:"prev-button",className:`
            hidden md:block
            absolute
            2xl:left-6 xl:-left-6 lg:-left-8 md:left-10
            md:top-1/2
            z-10
            hover:scale-105
            transition-all
            duration-200
            ease-in-out
          `,onClick:E,children:o.jsx("img",{id:"icon-previous",src:T.double_chevrons_icon.content[s],alt:"previous button",className:`
              object-cover
              -rotate-90
              lg:w-7.5 md:w-10
            `})}),o.jsx("button",{id:"next-button",className:`
            hidden md:block
            absolute
            2xl:right-6 xl:-right-6 lg:-right-8 md:right-10
            md:top-1/2
            z-10
            rounded-full
            hover:scale-105
            transition-all
            duration-200
            ease-in-out
          `,onClick:j,children:o.jsx("img",{id:"icon-next",src:T.double_chevrons_icon.content[s],alt:"next button",className:`
              object-cover
              rotate-90
              lg:w-7.5 md:w-10
            `})})]}),o.jsx("div",{id:"image-container",className:`
          ${a.sizeFull}
          ${a.hiddenToFlexColAtLg}
          ${a.contentCenter}
          relative
          overflow-y-visible
        `,children:o.jsxs("div",{id:"glitch-effect-wrapper",className:`
            absolute
            left-0 2xl:left-[3%]
            ${s==="dark"?"lg:bottom-10 xl:-bottom-10":""}
            2xl:w-[80%] xl:w-[88%]
            overflow-hidden
          `,children:[s==="dark"&&o.jsxs(o.Fragment,{children:[o.jsx("img",{src:h.hephaistos.content[s],alt:h.hephaistos.alt,"aria-hidden":"true",className:`absolute inset-0 ${a.sizeFull} object-contain pointer-events-none`,style:{animation:"glitch-slice-1 9s infinite"}}),o.jsx("img",{src:h.hephaistos.content[s],alt:h.hephaistos.alt,"aria-hidden":"true",className:`absolute inset-0 ${a.sizeFull} object-contain pointer-events-none`,style:{animation:"glitch-slice-2 9s infinite 0.25s"}})]}),o.jsx("img",{id:"hephaistos-statue",src:h.hephaistos.content[s],alt:h.hephaistos.alt,className:"relative w-full object-contain",style:s==="dark"?{animation:"glitch-flicker 9s infinite"}:void 0})]})})]})};export{G as default};
