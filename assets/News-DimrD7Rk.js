import{j as e}from"./vendor-animation-BymvfjDG.js";import{r as m,b as $,L as w}from"./vendor-react-OLGVO7Rg.js";import{N as T,p as C,b as E,a as h,L as M,T as S,s,t as d,P as k,n as u,c as p,d as L,f as P,h as I,e as O,g as R,M as _,U as z,i as A}from"./index-Dho7b-B6.js";import"./vendor-utils-D24pSdc9.js";const F=(a=T)=>[...C.map(o=>({kind:h.PROJECT,source:o})),...E.map(o=>({kind:h.POST,source:o}))].filter(o=>!o.source.excludeFromNews).sort((o,i)=>i.source.date.getTime()-o.source.date.getTime()).slice(0,a),q="2xl:text-sm xl:text-xs md:text-2xs sm:text-xs ss:text-xs text-2xs",V="lg:text-2xs md:text-3xs text-2xs",D="text-3xs",K=()=>{const{currentLang:a}=m.useContext(M),{currentTheme:x}=m.useContext(S),o=$(),i=x==="dark",g=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=!g,f=m.useMemo(()=>F(),[]),y=(t,r)=>{const l=`
            ${s.sizeFull}
            object-cover object-top
            ${i?"opacity-90 group-hover:opacity-100":"opacity-100"}
            transition-opacity duration-300 ease-out
        `;return t.type===_.VIDEO?e.jsx("video",{src:t.url,poster:t.poster,muted:!0,loop:!0,playsInline:!0,autoPlay:!g,className:l}):e.jsx("img",{src:t.url,alt:t.alt||r,loading:"lazy",className:l})},v=(t,r)=>{const l=`
            ${s.flexCol}
            ${s.sizeFull}
            p-0!
            text-left
            cursor-pointer
        `;return t.kind===h.POST?e.jsx(w,{to:`/blog/${t.source.slug}`,className:l,children:r}):e.jsx("button",{type:"button",className:l,onClick:()=>o(u.link,{state:{retexTitle:t.source.title[a]||t.source.title[z]}}),children:r})},N=(t,r)=>{const l=d(t.source.title,a),j=L(t.source.coverImage||p.placeholder_retex_image),b=e.jsxs(e.Fragment,{children:[e.jsx("div",{id:`news-event-${r}-cover`,className:`
                            m-[6%]
                            mb-0
                            2xl:h-32 xl:h-28 lg:h-24 md:h-20 sm:h-36 ss:h-32 h-28
                            overflow-hidden
                            shrink-0
                        `,children:y(j,l)}),e.jsxs("div",{id:`news-event-${r}-body`,className:`
                            ${s.flexCol}
                            grow
                            px-[8%]
                            2xl:py-5 xl:py-4 md:py-3.5 py-4
                            2xl:space-y-3 space-y-2
                        `,children:[e.jsxs("time",{dateTime:t.source.date.toISOString(),className:`
                                font-primary-regular
                                ${D}
                                uppercase tracking-wider
                                text-(--color-quaternary)/60
                                whitespace-nowrap
                            `,children:[" ",P(t.source.date,a)," "]}),e.jsxs("h3",{className:`
                                font-primary-bold
                                ${q}
                                leading-snug
                                text-(--color-quaternary)
                                group-hover:text-(--color-tertiary)
                                transition-colors duration-300 ease-out
                                wrap-break-word
                            `,children:[" ",l," "]}),e.jsxs("p",{className:`
                                font-primary-regular
                                ${V}
                                leading-[150%]
                                text-(--color-quaternary)/80
                                line-clamp-3
                                wrap-break-word
                            `,children:[" ",d(t.source.description,a)," "]})]})]});return e.jsx("li",{className:`
                    md:flex-1 w-full
                    min-w-0
                `,children:e.jsxs("div",{id:`news-event-${r}-card`,className:`
                        group
                        ${s.flexCol}
                        ${s.sizeFull}
                        rounded-md
                        overflow-hidden
                        relative
                        ${s.easeOutTransition}
                        bg-(--color-surface)
                        border border-(--color-border)
                        shadow-(--shadow-card)
                        hover:shadow-(--shadow-card-hover)
                        ${i?"hover:border-(--color-tertiary)/30":"hover:border-(--color-border-strong)"}
                    `,style:c?{transformStyle:"preserve-3d"}:void 0,onMouseEnter:c?n=>R(n.currentTarget):void 0,onMouseMove:c?n=>O(n,n.currentTarget):void 0,onMouseLeave:c?n=>I(n.currentTarget):void 0,children:[e.jsx("span",{className:`
                            absolute
                            top-0 left-0 right-0
                            h-0.75
                            z-10
                            bg-linear-to-r from-(--color-tertiary)/0 via-(--color-tertiary) to-(--color-tertiary)/0
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 ease-out
                            ${i?"shadow-(--glow-md)":""}
                        `}),v(t,b)]})},`news-event-${r}`)};return e.jsxs("section",{id:"news",className:`
                relative
                w-full h-fit
                ${s.flexRow}
                ${s.contentCenter}
                lg:space-x-[2%]
            `,children:[e.jsxs("div",{id:"news-cards-container",className:`
                    ${s.flexCol}
                    lg:w-[72%] w-full
                    h-fit
                `,children:[e.jsxs("h2",{className:`
                        font-secondary-semibold
                        2xl:text-md xl:text-sm md:text-xs text-2xs
                        text-(--color-quaternary)/60
                    `,children:[" ",d(A,a)," "]}),e.jsx("ul",{id:"news-cards-list",className:`
                        ${s.flexColToRowAtMd}
                        items-stretch
                        w-full h-fit
                        2xl:gap-4 xl:gap-3.5 md:gap-3 gap-5
                        2xl:mt-12 xl:mt-10 md:mt-8 mt-7
                    `,style:c?{perspective:k}:void 0,children:f.map((t,r)=>N(t,r))}),e.jsxs(w,{to:u.link,className:`
                        ${s.animatedLink}
                        2xl:text-md xl:text-sm md:text-sm text-xs
                        self-start
                        2xl:mt-6 xl:mt-5 md:mt-4 mt-4
                    `,children:[e.jsx("span",{"aria-hidden":"true",children:" → "}),e.jsxs("span",{children:[" ",d(u.content,a)," "]})]})]}),e.jsx("div",{id:"image-container",className:`
                    lg:w-[26%] h-full
                    ${s.hiddenToFlexColAtLg}
                    ${s.contentCenter}
                    relative
                    overflow-y-visible
                `,children:e.jsx("div",{id:"figure-wrapper",className:`
                        absolute
                        left-1/2 -translate-x-1/2
                        2xl:w-[96%] xl:w-[100%] w-[100%]
                    `,children:e.jsx("img",{id:"hephaistos-statue",src:p.hephaistos.content[x],alt:p.hephaistos.alt,className:"relative w-full object-contain"})})})]})};export{K as default};
