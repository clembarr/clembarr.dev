import{j as n}from"./vendor-animation-NadEQFtp.js";import{L as T,T as S,h as L,a as I,b as M,s as r,C as z,S as A,c as P,d as F,m as p,e as h,p as D,r as b}from"./index-BzSsr7_5.js";import{r as o,L as X}from"./vendor-react-DxOmqXaI.js";import"./vendor-utils-D24pSdc9.js";const Y=({project:s,additionalStyles:g,onanimationend:d})=>{const{currentLang:l}=o.useContext(T),{currentTheme:f}=o.useContext(S),c=o.useRef(null),x=f==="dark";return n.jsxs("div",{ref:c,id:`card-${s.title[l]}-container`,className:`
        group
        ${r.sizeFull}
        xl:max-h-[75%] lg:max-h-[65%] md:max-h-[65%] sm:max-h-[70%] ss:max-h-[65%] xs:max-h-[60%] max-h-[60%]
        2xl:max-w-95 xl:max-w-87.5 lg:max-w-75 md:max-w-80 sm:max-w-[60%] ss:max-w-[75%] max-w-[80%]
        aspect-square
        absolute
        rounded-xl
        overflow-hidden
        cursor-pointer
        ${r.easeOutTransition}
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
      `,style:g,onMouseLeave:()=>M(c.current),onMouseMove:u=>I(u,c.current),onMouseEnter:()=>L(c.current),onAnimationEnd:u=>d?d(u):()=>{},children:[n.jsx("div",{id:`top-card-${s.title[l]}-line`,className:`
          absolute
          top-0 left-0 right-0
          h-0.75
          transition-all duration-300
          bg-linear-to-r from-(--color-tertiary)/0 via-(--color-tertiary) to-(--color-tertiary)/0 opacity-0 group-hover:opacity-100 shadow-(--glow-md)
        `}),n.jsx(X,{to:"/projects",className:`
          block 
          ${r.sizeFull}
        `,children:n.jsx(z,{title:s.title[l]||s.title[0],content:s.description[l],tags:s.tags[l]?s.tags[l].concat(s.tags[0]):s.tags[0],moreTopClasses:"pt-4",titleProps:`
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
          `},`card-${s.title}`)})]})},U=()=>{const{currentTheme:s}=o.useContext(S),{currentLang:g}=o.useContext(T),[d,l]=o.useState([]),f=o.useRef(!1),c=o.useRef(0),x=o.useRef(null),u=o.useRef(0),w=o.useRef(0),y=o.useRef(0),C=(t,e)=>t===e-1?0:t%2===0?t+b(4,9):`-${t+b(2,6)}`,R=()=>{const t=[];return D.slice(0,10).map((e,a,i)=>{t.push(n.jsx(Y,{project:e,additionalStyles:{rotate:`${C(a,i.length)}deg`,animation:"card-apparition 0.5s cubic-bezier(.54,.54,.57,.56) forwards",transformStyle:"preserve-3d"}},`project-${a}-card`))}),t};o.useEffect(()=>{const t=x.current;if(!t)return;const e=a=>{const i=a.touches[0].clientX,v=a.touches[0].clientY,m=Math.abs(u.current-i),k=Math.abs(w.current-v);m>k&&m>10&&a.cancelable&&a.preventDefault()};return t.addEventListener("touchmove",e,{passive:!1}),()=>t.removeEventListener("touchmove",e)},[]),o.useEffect(()=>{const t=R();let e=0;const a=setInterval(()=>{e<t.length?l(t.slice(0,e+1)):clearInterval(a),e++},A);return()=>{clearInterval(a),setTimeout(()=>f.current=!0,P*t.length)}},[g,s]);const $=(t,e)=>{let a;return t.map((i,v)=>{switch(a=0,v){case t.length-1:return a=c.current,c.current=e==="next"?c.current:0,o.cloneElement(i,{additionalStyles:{animation:e==="next"?"card-top-to-bottom 2s ease-in forwards":"card-top-to-second ease-in 0.2s forwards",rotate:`${a!==0?a:C(b(0,1),t.length)}deg`},onaonanimationend:e==="next"?m=>{m.currentTarget.style.rotate="0deg"}:void 0});case t.length-2:return c.current=e==="next"?parseInt(i.props.additionalStyles.rotate.split("deg")[0]):c.current,o.cloneElement(i,{additionalStyles:{animation:e==="next"?"card-reach-top ease-in 0.3s forwards":"",rotate:`${i.props.additionalStyles.rotate}`},onanimationend:e==="next"?m=>{m.currentTarget.style.rotate="0deg"}:void 0});case 0:return o.cloneElement(i,{additionalStyles:{animation:e==="next"?"":"card-bottom-to-top 1s ease-in forwards",rotate:e==="next"?`${i.props.additionalStyles.rotate}`:"0deg"}});default:return o.cloneElement(i)}})},j=()=>{if(d.length<=1)return;const[t,...e]=$(d,"prev");l([...e,t])},E=()=>{if(d.length<=1)return;const t=$(d,"next"),e=t.pop();e&&l([e,...t])},N=t=>{u.current=t.targetTouches[0].clientX,w.current=t.targetTouches[0].clientY},_=t=>{y.current=t.changedTouches[0].clientX;const e=u.current-y.current;e>50?j():e<-50&&E()};return n.jsxs("section",{id:"projects-slider",className:`
        relative
        w-full h-[60vh] md:h-screen
        md:max-h-[70vh] min-h-70
        ${r.flexRow}
        ${r.contentCenter}
        lg:space-x-[10%]
      `,children:[n.jsxs("div",{id:"cards-stack-container",ref:x,className:`
          ${r.sizeFull}
          ${r.flexRow}
          ${r.contentCenter}
          relative
        `,style:{perspective:F},onTouchStart:N,onTouchEnd:_,children:[d.map(t=>t),n.jsxs("div",{id:"mobile-swipe-indicator",className:`
            md:hidden
            absolute
            ${r.flexCol}
            ${r.contentCenter}
            sm:bottom-6 ss:bottom-14 xs:bottom-8 bottom-5
            w-full
            opacity-30
            pointer-events-none
            animate-fade-in
          `,children:[n.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest",children:"Swipe !"}),n.jsx("img",{id:"swipe-icon",src:p.double_chevrons_icon.content[s],alt:p.double_chevrons_icon.alt,className:"w-6",style:{animation:"swipe-hint 2s infinite ease-in-out"}})]}),n.jsx("button",{id:"prev-button",className:`
            hidden md:block
            absolute
            2xl:left-6 xl:-left-6 lg:-left-8 md:left-10
            md:top-1/2
            z-10
            hover:scale-105
            transition-all
            duration-200
            ease-in-out
          `,onClick:j,children:n.jsx("img",{id:"icon-previous",src:p.double_chevrons_icon.content[s],alt:"previous button",className:`
              object-cover
              -rotate-90
              lg:w-7.5 md:w-10
            `})}),n.jsx("button",{id:"next-button",className:`
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
          `,onClick:E,children:n.jsx("img",{id:"icon-next",src:p.double_chevrons_icon.content[s],alt:"next button",className:`
              object-cover
              rotate-90
              lg:w-7.5 md:w-10
            `})})]}),n.jsx("div",{id:"image-container",className:`
          ${r.sizeFull}
          ${r.hiddenToFlexColAtLg}
          ${r.contentCenter}
          relative
          overflow-y-visible
        `,children:n.jsxs("div",{id:"glitch-effect-wrapper",className:`
            absolute
            left-0 2xl:left-[3%]
            ${s==="dark"?"lg:bottom-10 xl:-bottom-10":""}
            2xl:w-[80%] xl:w-[88%]
            overflow-hidden
          `,children:[s==="dark"&&n.jsxs(n.Fragment,{children:[n.jsx("img",{src:h.hephaistos.content[s],alt:h.hephaistos.alt,"aria-hidden":"true",className:`absolute inset-0 ${r.sizeFull} object-contain pointer-events-none`,style:{animation:"glitch-slice-1 9s infinite"}}),n.jsx("img",{src:h.hephaistos.content[s],alt:h.hephaistos.alt,"aria-hidden":"true",className:`absolute inset-0 ${r.sizeFull} object-contain pointer-events-none`,style:{animation:"glitch-slice-2 9s infinite 0.25s"}})]}),n.jsx("img",{id:"hephaistos-statue",src:h.hephaistos.content[s],alt:h.hephaistos.alt,className:"relative w-full object-contain",style:s==="dark"?{animation:"glitch-flicker 9s infinite"}:void 0})]})})]})};export{U as default};
