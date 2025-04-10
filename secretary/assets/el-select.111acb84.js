import{a3 as al,b as ut,b1 as ol,d as Q,a as _,c as r,o as m,l as V,j as I,p as k,n as d,h as B,f as L,w as $,g as z,s as tt,k as D,q as T,z as Z,T as il,x as dt,K as ye,aB as Y,bi as ct,be as j,F as q,am as $e,E as ie,bk as Me,aw as rl,J as P,i as oe,v as Re,t as F,r as E,G as Be,e as ul,br as dl,aH as A,ao as he,X as lt,ac as cl,U as pl,a9 as fl,a_ as vl,at as ae,bs as Ve,ab as ml,aM as bl,ae as ge,ah as hl,bm as gl,bt as yl,N as pt,Q as G,bo as Sl,H as nt,I as st,B as at,b5 as se,bu as Cl,A as Ie,bv as Ol,aN as ft}from"./index.9aa6671f.js";import{u as wl,c as Vl,b as Il}from"./el-popper.d46c6f11.js";import{t as El,i as Ee,g as Tl,E as kl,C as $l}from"./el-scrollbar.79423c53.js";import{j as vt,E as Te,_ as re,g as mt,n as U,h as Ml,B as Rl,V as Bl,b as Dl,U as J,D as bt,i as ot,e as Ll,F as Nl}from"./base.1e933585.js";import{u as zl,a as Fl}from"./index.025ab758.js";import{s as Wl}from"./scroll.9fd9eb4f.js";import{b as Pl}from"./el-checkbox.48cd4d17.js";var it=1/0,Kl=17976931348623157e292;function Al(e){if(!e)return e===0?e:0;if(e=El(e),e===it||e===-it){var a=e<0?-1:1;return a*Kl}return e===e?e:0}function Hl(e){var a=Al(e),o=a%1;return a===a?o?a-o:a:0}function Gl(e,a,o,v){for(var s=e.length,h=o+(v?1:-1);v?h--:++h<s;)if(a(e[h],h,e))return h;return-1}function K(){if(!arguments.length)return[];var e=arguments[0];return al(e)?e:[e]}var Ul=Math.max,jl=Math.min;function ql(e,a,o){var v=e==null?0:e.length;if(!v)return-1;var s=v-1;return o!==void 0&&(s=Hl(o),s=o<0?Ul(v+s,0):jl(s,v-1)),Gl(e,Pl(a),s,!0)}const Ql=(e="")=>e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"),ke=ut({type:{type:String,values:["primary","success","info","warning","danger"],default:"primary"},closable:Boolean,disableTransitions:Boolean,hit:Boolean,color:String,size:{type:String,values:ol},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),Xl={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent},Jl=Q({name:"ElTag"}),Yl=Q({...Jl,props:ke,emits:Xl,setup(e,{emit:a}){const o=e,v=vt(),s=_("tag"),h=r(()=>{const{type:i,hit:g,effect:C,closable:O,round:p}=o;return[s.b(),s.is("closable",O),s.m(i||"primary"),s.m(v.value),s.m(C),s.is("hit",g),s.is("round",p)]}),l=i=>{a("close",i)},b=i=>{a("click",i)},c=i=>{i.component.subTree.component.bum=null};return(i,g)=>i.disableTransitions?(m(),V("span",{key:0,class:d(B(h)),style:Z({backgroundColor:i.color}),onClick:b},[I("span",{class:d(B(s).e("content"))},[k(i.$slots,"default")],2),i.closable?(m(),L(B(Te),{key:0,class:d(B(s).e("close")),onClick:D(l,["stop"])},{default:$(()=>[z(B(tt))]),_:1},8,["class","onClick"])):T("v-if",!0)],6)):(m(),L(il,{key:1,name:`${B(s).namespace.value}-zoom-in-center`,appear:"",onVnodeMounted:c},{default:$(()=>[I("span",{class:d(B(h)),style:Z({backgroundColor:i.color}),onClick:b},[I("span",{class:d(B(s).e("content"))},[k(i.$slots,"default")],2),i.closable?(m(),L(B(Te),{key:0,class:d(B(s).e("close")),onClick:D(l,["stop"])},{default:$(()=>[z(B(tt))]),_:1},8,["class","onClick"])):T("v-if",!0)],6)]),_:3},8,["name"]))}});var Zl=re(Yl,[["__file","tag.vue"]]);const _l=dt(Zl),ht=Symbol("ElSelectGroup"),Se=Symbol("ElSelect");function xl(e,a){const o=ye(Se),v=ye(ht,{disabled:!1}),s=r(()=>g(K(o.props.modelValue),e.value)),h=r(()=>{var p;if(o.props.multiple){const y=K((p=o.props.modelValue)!=null?p:[]);return!s.value&&y.length>=o.props.multipleLimit&&o.props.multipleLimit>0}else return!1}),l=r(()=>e.label||(Y(e.value)?"":e.value)),b=r(()=>e.value||e.label||""),c=r(()=>e.disabled||a.groupDisabled||h.value),i=$e(),g=(p=[],y)=>{if(Y(e.value)){const f=o.props.valueKey;return p&&p.some(M=>ct(j(M,f))===j(y,f))}else return p&&p.includes(y)},C=()=>{!e.disabled&&!v.disabled&&(o.states.hoveringIndex=o.optionsArray.indexOf(i.proxy))},O=p=>{const y=new RegExp(Ql(p),"i");a.visible=y.test(l.value)||e.created};return q(()=>l.value,()=>{!e.created&&!o.props.remote&&o.setSelected()}),q(()=>e.value,(p,y)=>{const{remote:f,valueKey:M}=o.props;if(p!==y&&(o.onOptionDestroy(y,i.proxy),o.onOptionCreate(i.proxy)),!e.created&&!f){if(M&&Y(p)&&Y(y)&&p[M]===y[M])return;o.setSelected()}}),q(()=>v.disabled,()=>{a.groupDisabled=v.disabled},{immediate:!0}),{select:o,currentLabel:l,currentValue:b,itemSelected:s,isDisabled:c,hoverItem:C,updateOption:O}}const en=Q({name:"ElOption",componentName:"ElOption",props:{value:{required:!0,type:[String,Number,Boolean,Object]},label:[String,Number],created:Boolean,disabled:Boolean},setup(e){const a=_("select"),o=mt(),v=r(()=>[a.be("dropdown","item"),a.is("disabled",B(b)),a.is("selected",B(l)),a.is("hovering",B(O))]),s=ie({index:-1,groupDisabled:!1,visible:!0,hover:!1}),{currentLabel:h,itemSelected:l,isDisabled:b,select:c,hoverItem:i,updateOption:g}=xl(e,s),{visible:C,hover:O}=Me(s),p=$e().proxy;c.onOptionCreate(p),rl(()=>{const f=p.value,{selected:M}=c.states,ue=(c.props.multiple?M:[M]).some(de=>de.value===p.value);P(()=>{c.states.cachedOptions.get(f)===p&&!ue&&c.states.cachedOptions.delete(f)}),c.onOptionDestroy(f,p)});function y(){b.value||c.handleOptionSelect(p)}return{ns:a,id:o,containerKls:v,currentLabel:h,itemSelected:l,isDisabled:b,select:c,hoverItem:i,updateOption:g,visible:C,hover:O,selectOptionClick:y,states:s}}});function tn(e,a,o,v,s,h){return oe((m(),V("li",{id:e.id,class:d(e.containerKls),role:"option","aria-disabled":e.isDisabled||void 0,"aria-selected":e.itemSelected,onMouseenter:e.hoverItem,onClick:D(e.selectOptionClick,["stop"])},[k(e.$slots,"default",{},()=>[I("span",null,F(e.currentLabel),1)])],42,["id","aria-disabled","aria-selected","onMouseenter","onClick"])),[[Re,e.visible]])}var De=re(en,[["render",tn],["__file","option.vue"]]);const ln=Q({name:"ElSelectDropdown",componentName:"ElSelectDropdown",setup(){const e=ye(Se),a=_("select"),o=r(()=>e.props.popperClass),v=r(()=>e.props.multiple),s=r(()=>e.props.fitInputWidth),h=E("");function l(){var b;h.value=`${(b=e.selectRef)==null?void 0:b.offsetWidth}px`}return Be(()=>{l(),U(e.selectRef,l)}),{ns:a,minWidth:h,popperClass:o,isMultiple:v,isFitInputWidth:s}}});function nn(e,a,o,v,s,h){return m(),V("div",{class:d([e.ns.b("dropdown"),e.ns.is("multiple",e.isMultiple),e.popperClass]),style:Z({[e.isFitInputWidth?"width":"minWidth"]:e.minWidth})},[e.$slots.header?(m(),V("div",{key:0,class:d(e.ns.be("dropdown","header"))},[k(e.$slots,"header")],2)):T("v-if",!0),k(e.$slots,"default"),e.$slots.footer?(m(),V("div",{key:1,class:d(e.ns.be("dropdown","footer"))},[k(e.$slots,"footer")],2)):T("v-if",!0)],6)}var sn=re(ln,[["render",nn],["__file","select-dropdown.vue"]]);const an=11,on=(e,a)=>{const{t:o}=ul(),v=mt(),s=_("select"),h=_("input"),l=ie({inputValue:"",options:new Map,cachedOptions:new Map,disabledOptions:new Map,optionValues:[],selected:[],selectionWidth:0,calculatorWidth:0,collapseItemWidth:0,selectedLabel:"",hoveringIndex:-1,previousQuery:null,inputHovering:!1,menuVisibleOnFocus:!1,isBeforeHide:!1}),b=E(null),c=E(null),i=E(null),g=E(null),C=E(null),O=E(null),p=E(null),y=E(null),f=E(null),M=E(null),x=E(null),ue=E(null),{isComposing:de,handleCompositionStart:yt,handleCompositionUpdate:St,handleCompositionEnd:Ct}=zl({afterComposition:t=>Qe(t)}),{wrapperRef:Le,isFocused:Ne,handleBlur:Ot}=Fl(C,{beforeFocus(){return le.value},afterFocus(){e.automaticDropdown&&!w.value&&(w.value=!0,l.menuVisibleOnFocus=!0)},beforeBlur(t){var n,u;return((n=i.value)==null?void 0:n.isFocusInsideContent(t))||((u=g.value)==null?void 0:u.isFocusInsideContent(t))},afterBlur(){w.value=!1,l.menuVisibleOnFocus=!1}}),w=E(!1),ee=E(),{form:ze,formItem:te}=Ml(),{inputId:wt}=Rl(e,{formItemContext:te}),{valueOnClear:Vt,isEmptyValue:It}=dl(e),le=r(()=>e.disabled||(ze==null?void 0:ze.disabled)),Ce=r(()=>A(e.modelValue)?e.modelValue.length>0:!It(e.modelValue)),Et=r(()=>e.clearable&&!le.value&&l.inputHovering&&Ce.value),Fe=r(()=>e.remote&&e.filterable&&!e.remoteShowSuffix?"":e.suffixIcon),Tt=r(()=>s.is("reverse",Fe.value&&w.value)),We=r(()=>(te==null?void 0:te.validateState)||""),kt=r(()=>Bl[We.value]),$t=r(()=>e.remote?300:0),Pe=r(()=>e.loading?e.loadingText||o("el.select.loading"):e.remote&&!l.inputValue&&l.options.size===0?!1:e.filterable&&l.inputValue&&l.options.size>0&&ce.value===0?e.noMatchText||o("el.select.noMatch"):l.options.size===0?e.noDataText||o("el.select.noData"):null),ce=r(()=>R.value.filter(t=>t.visible).length),R=r(()=>{const t=Array.from(l.options.values()),n=[];return l.optionValues.forEach(u=>{const S=t.findIndex(W=>W.value===u);S>-1&&n.push(t[S])}),n.length>=t.length?n:t}),Mt=r(()=>Array.from(l.cachedOptions.values())),Rt=r(()=>{const t=R.value.filter(n=>!n.created).some(n=>n.currentLabel===l.inputValue);return e.filterable&&e.allowCreate&&l.inputValue!==""&&!t}),Ke=()=>{e.filterable&&ae(e.filterMethod)||e.filterable&&e.remote&&ae(e.remoteMethod)||R.value.forEach(t=>{var n;(n=t.updateOption)==null||n.call(t,l.inputValue)})},Ae=vt(),Bt=r(()=>["small"].includes(Ae.value)?"small":"default"),Dt=r({get(){return w.value&&Pe.value!==!1},set(t){w.value=t}}),Lt=r(()=>{if(e.multiple&&!he(e.modelValue))return K(e.modelValue).length===0&&!l.inputValue;const t=A(e.modelValue)?e.modelValue[0]:e.modelValue;return e.filterable||he(t)?!l.inputValue:!0}),Nt=r(()=>{var t;const n=(t=e.placeholder)!=null?t:o("el.select.placeholder");return e.multiple||!Ce.value?n:l.selectedLabel}),zt=r(()=>lt?null:"mouseenter");q(()=>e.modelValue,(t,n)=>{e.multiple&&e.filterable&&!e.reserveKeyword&&(l.inputValue="",pe("")),fe(),!Ee(t,n)&&e.validateEvent&&(te==null||te.validate("change").catch(u=>cl(u)))},{flush:"post",deep:!0}),q(()=>w.value,t=>{t?pe(l.inputValue):(l.inputValue="",l.previousQuery=null,l.isBeforeHide=!0),a("visible-change",t)}),q(()=>l.options.entries(),()=>{var t;if(!pl)return;const n=((t=b.value)==null?void 0:t.querySelectorAll("input"))||[];(!e.filterable&&!e.defaultFirstOption&&!he(e.modelValue)||!Array.from(n).includes(document.activeElement))&&fe(),e.defaultFirstOption&&(e.filterable||e.remote)&&ce.value&&He()},{flush:"post"}),q(()=>l.hoveringIndex,t=>{fl(t)&&t>-1?ee.value=R.value[t]||{}:ee.value={},R.value.forEach(n=>{n.hover=ee.value===n})}),vl(()=>{l.isBeforeHide||Ke()});const pe=t=>{l.previousQuery===t||de.value||(l.previousQuery=t,e.filterable&&ae(e.filterMethod)?e.filterMethod(t):e.filterable&&e.remote&&ae(e.remoteMethod)&&e.remoteMethod(t),e.defaultFirstOption&&(e.filterable||e.remote)&&ce.value?P(He):P(Ft))},He=()=>{const t=R.value.filter(S=>S.visible&&!S.disabled&&!S.states.groupDisabled),n=t.find(S=>S.created),u=t[0];l.hoveringIndex=Ze(R.value,n||u)},fe=()=>{if(e.multiple)l.selectedLabel="";else{const n=A(e.modelValue)?e.modelValue[0]:e.modelValue,u=Ge(n);l.selectedLabel=u.currentLabel,l.selected=[u];return}const t=[];he(e.modelValue)||K(e.modelValue).forEach(n=>{t.push(Ge(n))}),l.selected=t},Ge=t=>{let n;const u=Ve(t).toLowerCase()==="object",S=Ve(t).toLowerCase()==="null",W=Ve(t).toLowerCase()==="undefined";for(let H=l.cachedOptions.size-1;H>=0;H--){const N=Mt.value[H];if(u?j(N.value,e.valueKey)===j(t,e.valueKey):N.value===t){n={value:t,currentLabel:N.currentLabel,get isDisabled(){return N.isDisabled}};break}}if(n)return n;const X=u?t.label:!S&&!W?t:"";return{value:t,currentLabel:X}},Ft=()=>{l.hoveringIndex=R.value.findIndex(t=>l.selected.some(n=>we(n)===we(t)))},Wt=()=>{l.selectionWidth=c.value.getBoundingClientRect().width},Ue=()=>{l.calculatorWidth=O.value.getBoundingClientRect().width},Pt=()=>{l.collapseItemWidth=x.value.getBoundingClientRect().width},Oe=()=>{var t,n;(n=(t=i.value)==null?void 0:t.updatePopper)==null||n.call(t)},je=()=>{var t,n;(n=(t=g.value)==null?void 0:t.updatePopper)==null||n.call(t)},qe=()=>{l.inputValue.length>0&&!w.value&&(w.value=!0),pe(l.inputValue)},Qe=t=>{if(l.inputValue=t.target.value,e.remote)Xe();else return qe()},Xe=Tl(()=>{qe()},$t.value),ne=t=>{Ee(e.modelValue,t)||a(bt,t)},Kt=t=>ql(t,n=>!l.disabledOptions.has(n)),At=t=>{if(!!e.multiple&&t.code!==Dl.delete&&t.target.value.length<=0){const n=K(e.modelValue).slice(),u=Kt(n);if(u<0)return;const S=n[u];n.splice(u,1),a(J,n),ne(n),a("remove-tag",S)}},Ht=(t,n)=>{const u=l.selected.indexOf(n);if(u>-1&&!le.value){const S=K(e.modelValue).slice();S.splice(u,1),a(J,S),ne(S),a("remove-tag",n.value)}t.stopPropagation(),me()},Je=t=>{t.stopPropagation();const n=e.multiple?[]:Vt.value;if(e.multiple)for(const u of l.selected)u.isDisabled&&n.push(u.value);a(J,n),ne(n),l.hoveringIndex=-1,w.value=!1,a("clear"),me()},Ye=t=>{var n;if(e.multiple){const u=K((n=e.modelValue)!=null?n:[]).slice(),S=Ze(u,t.value);S>-1?u.splice(S,1):(e.multipleLimit<=0||u.length<e.multipleLimit)&&u.push(t.value),a(J,u),ne(u),t.created&&pe(""),e.filterable&&!e.reserveKeyword&&(l.inputValue="")}else a(J,t.value),ne(t.value),w.value=!1;me(),!w.value&&P(()=>{ve(t)})},Ze=(t=[],n)=>{if(!Y(n))return t.indexOf(n);const u=e.valueKey;let S=-1;return t.some((W,X)=>ct(j(W,u))===j(n,u)?(S=X,!0):!1),S},ve=t=>{var n,u,S,W,X;const be=A(t)?t[0]:t;let H=null;if(be!=null&&be.value){const N=R.value.filter(et=>et.value===be.value);N.length>0&&(H=N[0].$el)}if(i.value&&H){const N=(W=(S=(u=(n=i.value)==null?void 0:n.popperRef)==null?void 0:u.contentRef)==null?void 0:S.querySelector)==null?void 0:W.call(S,`.${s.be("dropdown","wrap")}`);N&&Wl(N,H)}(X=ue.value)==null||X.handleScroll()},Gt=t=>{l.options.set(t.value,t),l.cachedOptions.set(t.value,t),t.disabled&&l.disabledOptions.set(t.value,t)},Ut=(t,n)=>{l.options.get(t)===n&&l.options.delete(t)},jt=r(()=>{var t,n;return(n=(t=i.value)==null?void 0:t.popperRef)==null?void 0:n.contentRef}),qt=()=>{l.isBeforeHide=!1,P(()=>ve(l.selected))},me=()=>{var t;(t=C.value)==null||t.focus()},Qt=()=>{var t;if(w.value){w.value=!1,P(()=>{var n;return(n=C.value)==null?void 0:n.blur()});return}(t=C.value)==null||t.blur()},Xt=t=>{Je(t)},Jt=t=>{if(w.value=!1,Ne.value){const n=new FocusEvent("focus",t);P(()=>Ot(n))}},Yt=()=>{l.inputValue.length>0?l.inputValue="":w.value=!1},_e=()=>{le.value||(lt&&(l.inputHovering=!0),l.menuVisibleOnFocus?l.menuVisibleOnFocus=!1:w.value=!w.value)},Zt=()=>{w.value?R.value[l.hoveringIndex]&&Ye(R.value[l.hoveringIndex]):_e()},we=t=>Y(t.value)?j(t.value,e.valueKey):t.value,_t=r(()=>R.value.filter(t=>t.visible).every(t=>t.disabled)),xt=r(()=>e.multiple?e.collapseTags?l.selected.slice(0,e.maxCollapseTags):l.selected:[]),el=r(()=>e.multiple?e.collapseTags?l.selected.slice(e.maxCollapseTags):[]:[]),xe=t=>{if(!w.value){w.value=!0;return}if(!(l.options.size===0||l.filteredOptionsCount===0||de.value)&&!_t.value){t==="next"?(l.hoveringIndex++,l.hoveringIndex===l.options.size&&(l.hoveringIndex=0)):t==="prev"&&(l.hoveringIndex--,l.hoveringIndex<0&&(l.hoveringIndex=l.options.size-1));const n=R.value[l.hoveringIndex];(n.disabled===!0||n.states.groupDisabled===!0||!n.visible)&&xe(t),P(()=>ve(ee.value))}},tl=()=>{if(!c.value)return 0;const t=window.getComputedStyle(c.value);return Number.parseFloat(t.gap||"6px")},ll=r(()=>{const t=tl();return{maxWidth:`${x.value&&e.maxCollapseTags===1?l.selectionWidth-l.collapseItemWidth-t:l.selectionWidth}px`}}),nl=r(()=>({maxWidth:`${l.selectionWidth}px`})),sl=r(()=>({width:`${Math.max(l.calculatorWidth,an)}px`}));return U(c,Wt),U(O,Ue),U(f,Oe),U(Le,Oe),U(M,je),U(x,Pt),Be(()=>{fe()}),{inputId:wt,contentId:v,nsSelect:s,nsInput:h,states:l,isFocused:Ne,expanded:w,optionsArray:R,hoverOption:ee,selectSize:Ae,filteredOptionsCount:ce,resetCalculatorWidth:Ue,updateTooltip:Oe,updateTagTooltip:je,debouncedOnInputChange:Xe,onInput:Qe,deletePrevTag:At,deleteTag:Ht,deleteSelected:Je,handleOptionSelect:Ye,scrollToOption:ve,hasModelValue:Ce,shouldShowPlaceholder:Lt,currentPlaceholder:Nt,mouseEnterEventName:zt,showClose:Et,iconComponent:Fe,iconReverse:Tt,validateState:We,validateIcon:kt,showNewOption:Rt,updateOptions:Ke,collapseTagSize:Bt,setSelected:fe,selectDisabled:le,emptyText:Pe,handleCompositionStart:yt,handleCompositionUpdate:St,handleCompositionEnd:Ct,onOptionCreate:Gt,onOptionDestroy:Ut,handleMenuEnter:qt,focus:me,blur:Qt,handleClearClick:Xt,handleClickOutside:Jt,handleEsc:Yt,toggleMenu:_e,selectOption:Zt,getValueKey:we,navigateOptions:xe,dropdownMenuVisible:Dt,showTagList:xt,collapseTagList:el,tagStyle:ll,collapseTagStyle:nl,inputStyle:sl,popperRef:jt,inputRef:C,tooltipRef:i,tagTooltipRef:g,calculatorRef:O,prefixRef:p,suffixRef:y,selectRef:b,wrapperRef:Le,selectionRef:c,scrollbarRef:ue,menuRef:f,tagMenuRef:M,collapseItemRef:x}};var rn=Q({name:"ElOptions",setup(e,{slots:a}){const o=ye(Se);let v=[];return()=>{var s,h;const l=(s=a.default)==null?void 0:s.call(a),b=[];function c(i){!A(i)||i.forEach(g=>{var C,O,p,y;const f=(C=(g==null?void 0:g.type)||{})==null?void 0:C.name;f==="ElOptionGroup"?c(!ml(g.children)&&!A(g.children)&&ae((O=g.children)==null?void 0:O.default)?(p=g.children)==null?void 0:p.default():g.children):f==="ElOption"?b.push((y=g.props)==null?void 0:y.value):A(g.children)&&c(g.children)})}return l.length&&c((h=l[0])==null?void 0:h.children),Ee(b,v)||(v=b,o&&(o.states.optionValues=b)),l}}});const un=ut({name:String,id:String,modelValue:{type:[Array,String,Number,Boolean,Object],default:void 0},autocomplete:{type:String,default:"off"},automaticDropdown:Boolean,size:bl,effect:{type:ge(String),default:"light"},disabled:Boolean,clearable:Boolean,filterable:Boolean,allowCreate:Boolean,loading:Boolean,popperClass:{type:String,default:""},popperOptions:{type:ge(Object),default:()=>({})},remote:Boolean,loadingText:String,noMatchText:String,noDataText:String,remoteMethod:Function,filterMethod:Function,multiple:Boolean,multipleLimit:{type:Number,default:0},placeholder:{type:String},defaultFirstOption:Boolean,reserveKeyword:{type:Boolean,default:!0},valueKey:{type:String,default:"value"},collapseTags:Boolean,collapseTagsTooltip:Boolean,maxCollapseTags:{type:Number,default:1},teleported:wl.teleported,persistent:{type:Boolean,default:!0},clearIcon:{type:ot,default:hl},fitInputWidth:Boolean,suffixIcon:{type:ot,default:gl},tagType:{...ke.type,default:"info"},tagEffect:{...ke.effect,default:"light"},validateEvent:{type:Boolean,default:!0},remoteShowSuffix:Boolean,placement:{type:ge(String),values:Vl,default:"bottom-start"},fallbackPlacements:{type:ge(Array),default:["bottom-start","top-start","right","left"]},appendTo:String,...yl,...Ll(["ariaLabel"])}),rt="ElSelect",dn=Q({name:rt,componentName:rt,components:{ElSelectMenu:sn,ElOption:De,ElOptions:rn,ElTag:_l,ElScrollbar:kl,ElTooltip:Il,ElIcon:Te},directives:{ClickOutside:$l},props:un,emits:[J,bt,"remove-tag","clear","visible-change","focus","blur"],setup(e,{emit:a}){const o=r(()=>{const{modelValue:l,multiple:b}=e,c=b?[]:void 0;return A(l)?b?l:c:b?c:l}),v=ie({...Me(e),modelValue:o}),s=on(v,a);pt(Se,ie({props:v,states:s.states,optionsArray:s.optionsArray,handleOptionSelect:s.handleOptionSelect,onOptionCreate:s.onOptionCreate,onOptionDestroy:s.onOptionDestroy,selectRef:s.selectRef,setSelected:s.setSelected}));const h=r(()=>e.multiple?s.states.selected.map(l=>l.currentLabel):s.states.selectedLabel);return{...s,modelValue:o,selectedLabel:h}}});function cn(e,a,o,v,s,h){const l=G("el-tag"),b=G("el-tooltip"),c=G("el-icon"),i=G("el-option"),g=G("el-options"),C=G("el-scrollbar"),O=G("el-select-menu"),p=Sl("click-outside");return oe((m(),V("div",{ref:"selectRef",class:d([e.nsSelect.b(),e.nsSelect.m(e.selectSize)]),[Ol(e.mouseEnterEventName)]:y=>e.states.inputHovering=!0,onMouseleave:y=>e.states.inputHovering=!1},[z(b,{ref:"tooltipRef",visible:e.dropdownMenuVisible,placement:e.placement,teleported:e.teleported,"popper-class":[e.nsSelect.e("popper"),e.popperClass],"popper-options":e.popperOptions,"fallback-placements":e.fallbackPlacements,effect:e.effect,pure:"",trigger:"click",transition:`${e.nsSelect.namespace.value}-zoom-in-top`,"stop-popper-mouse-event":!1,"gpu-acceleration":!1,persistent:e.persistent,"append-to":e.appendTo,onBeforeShow:e.handleMenuEnter,onHide:y=>e.states.isBeforeHide=!1},{default:$(()=>{var y;return[I("div",{ref:"wrapperRef",class:d([e.nsSelect.e("wrapper"),e.nsSelect.is("focused",e.isFocused),e.nsSelect.is("hovering",e.states.inputHovering),e.nsSelect.is("filterable",e.filterable),e.nsSelect.is("disabled",e.selectDisabled)]),onClick:D(e.toggleMenu,["prevent"])},[e.$slots.prefix?(m(),V("div",{key:0,ref:"prefixRef",class:d(e.nsSelect.e("prefix"))},[k(e.$slots,"prefix")],2)):T("v-if",!0),I("div",{ref:"selectionRef",class:d([e.nsSelect.e("selection"),e.nsSelect.is("near",e.multiple&&!e.$slots.prefix&&!!e.states.selected.length)])},[e.multiple?k(e.$slots,"tag",{key:0},()=>[(m(!0),V(nt,null,st(e.showTagList,f=>(m(),V("div",{key:e.getValueKey(f),class:d(e.nsSelect.e("selected-item"))},[z(l,{closable:!e.selectDisabled&&!f.isDisabled,size:e.collapseTagSize,type:e.tagType,effect:e.tagEffect,"disable-transitions":"",style:Z(e.tagStyle),onClose:M=>e.deleteTag(M,f)},{default:$(()=>[I("span",{class:d(e.nsSelect.e("tags-text"))},[k(e.$slots,"label",{label:f.currentLabel,value:f.value},()=>[at(F(f.currentLabel),1)])],2)]),_:2},1032,["closable","size","type","effect","style","onClose"])],2))),128)),e.collapseTags&&e.states.selected.length>e.maxCollapseTags?(m(),L(b,{key:0,ref:"tagTooltipRef",disabled:e.dropdownMenuVisible||!e.collapseTagsTooltip,"fallback-placements":["bottom","top","right","left"],effect:e.effect,placement:"bottom",teleported:e.teleported},{default:$(()=>[I("div",{ref:"collapseItemRef",class:d(e.nsSelect.e("selected-item"))},[z(l,{closable:!1,size:e.collapseTagSize,type:e.tagType,effect:e.tagEffect,"disable-transitions":"",style:Z(e.collapseTagStyle)},{default:$(()=>[I("span",{class:d(e.nsSelect.e("tags-text"))}," + "+F(e.states.selected.length-e.maxCollapseTags),3)]),_:1},8,["size","type","effect","style"])],2)]),content:$(()=>[I("div",{ref:"tagMenuRef",class:d(e.nsSelect.e("selection"))},[(m(!0),V(nt,null,st(e.collapseTagList,f=>(m(),V("div",{key:e.getValueKey(f),class:d(e.nsSelect.e("selected-item"))},[z(l,{class:"in-tooltip",closable:!e.selectDisabled&&!f.isDisabled,size:e.collapseTagSize,type:e.tagType,effect:e.tagEffect,"disable-transitions":"",onClose:M=>e.deleteTag(M,f)},{default:$(()=>[I("span",{class:d(e.nsSelect.e("tags-text"))},[k(e.$slots,"label",{label:f.currentLabel,value:f.value},()=>[at(F(f.currentLabel),1)])],2)]),_:2},1032,["closable","size","type","effect","onClose"])],2))),128))],2)]),_:3},8,["disabled","effect","teleported"])):T("v-if",!0)]):T("v-if",!0),e.selectDisabled?T("v-if",!0):(m(),V("div",{key:1,class:d([e.nsSelect.e("selected-item"),e.nsSelect.e("input-wrapper"),e.nsSelect.is("hidden",!e.filterable)])},[oe(I("input",{id:e.inputId,ref:"inputRef","onUpdate:modelValue":f=>e.states.inputValue=f,type:"text",name:e.name,class:d([e.nsSelect.e("input"),e.nsSelect.is(e.selectSize)]),disabled:e.selectDisabled,autocomplete:e.autocomplete,style:Z(e.inputStyle),role:"combobox",readonly:!e.filterable,spellcheck:"false","aria-activedescendant":((y=e.hoverOption)==null?void 0:y.id)||"","aria-controls":e.contentId,"aria-expanded":e.dropdownMenuVisible,"aria-label":e.ariaLabel,"aria-autocomplete":"none","aria-haspopup":"listbox",onKeydown:[se(D(f=>e.navigateOptions("next"),["stop","prevent"]),["down"]),se(D(f=>e.navigateOptions("prev"),["stop","prevent"]),["up"]),se(D(e.handleEsc,["stop","prevent"]),["esc"]),se(D(e.selectOption,["stop","prevent"]),["enter"]),se(D(e.deletePrevTag,["stop"]),["delete"])],onCompositionstart:e.handleCompositionStart,onCompositionupdate:e.handleCompositionUpdate,onCompositionend:e.handleCompositionEnd,onInput:e.onInput,onClick:D(e.toggleMenu,["stop"])},null,46,["id","onUpdate:modelValue","name","disabled","autocomplete","readonly","aria-activedescendant","aria-controls","aria-expanded","aria-label","onKeydown","onCompositionstart","onCompositionupdate","onCompositionend","onInput","onClick"]),[[Cl,e.states.inputValue]]),e.filterable?(m(),V("span",{key:0,ref:"calculatorRef","aria-hidden":"true",class:d(e.nsSelect.e("input-calculator")),textContent:F(e.states.inputValue)},null,10,["textContent"])):T("v-if",!0)],2)),e.shouldShowPlaceholder?(m(),V("div",{key:2,class:d([e.nsSelect.e("selected-item"),e.nsSelect.e("placeholder"),e.nsSelect.is("transparent",!e.hasModelValue||e.expanded&&!e.states.inputValue)])},[e.hasModelValue?k(e.$slots,"label",{key:0,label:e.currentPlaceholder,value:e.modelValue},()=>[I("span",null,F(e.currentPlaceholder),1)]):(m(),V("span",{key:1},F(e.currentPlaceholder),1))],2)):T("v-if",!0)],2),I("div",{ref:"suffixRef",class:d(e.nsSelect.e("suffix"))},[e.iconComponent&&!e.showClose?(m(),L(c,{key:0,class:d([e.nsSelect.e("caret"),e.nsSelect.e("icon"),e.iconReverse])},{default:$(()=>[(m(),L(Ie(e.iconComponent)))]),_:1},8,["class"])):T("v-if",!0),e.showClose&&e.clearIcon?(m(),L(c,{key:1,class:d([e.nsSelect.e("caret"),e.nsSelect.e("icon"),e.nsSelect.e("clear")]),onClick:e.handleClearClick},{default:$(()=>[(m(),L(Ie(e.clearIcon)))]),_:1},8,["class","onClick"])):T("v-if",!0),e.validateState&&e.validateIcon?(m(),L(c,{key:2,class:d([e.nsInput.e("icon"),e.nsInput.e("validateIcon")])},{default:$(()=>[(m(),L(Ie(e.validateIcon)))]),_:1},8,["class"])):T("v-if",!0)],2)],10,["onClick"])]}),content:$(()=>[z(O,{ref:"menuRef"},{default:$(()=>[e.$slots.header?(m(),V("div",{key:0,class:d(e.nsSelect.be("dropdown","header")),onClick:D(()=>{},["stop"])},[k(e.$slots,"header")],10,["onClick"])):T("v-if",!0),oe(z(C,{id:e.contentId,ref:"scrollbarRef",tag:"ul","wrap-class":e.nsSelect.be("dropdown","wrap"),"view-class":e.nsSelect.be("dropdown","list"),class:d([e.nsSelect.is("empty",e.filteredOptionsCount===0)]),role:"listbox","aria-label":e.ariaLabel,"aria-orientation":"vertical"},{default:$(()=>[e.showNewOption?(m(),L(i,{key:0,value:e.states.inputValue,created:!0},null,8,["value"])):T("v-if",!0),z(g,null,{default:$(()=>[k(e.$slots,"default")]),_:3})]),_:3},8,["id","wrap-class","view-class","class","aria-label"]),[[Re,e.states.options.size>0&&!e.loading]]),e.$slots.loading&&e.loading?(m(),V("div",{key:1,class:d(e.nsSelect.be("dropdown","loading"))},[k(e.$slots,"loading")],2)):e.loading||e.filteredOptionsCount===0?(m(),V("div",{key:2,class:d(e.nsSelect.be("dropdown","empty"))},[k(e.$slots,"empty",{},()=>[I("span",null,F(e.emptyText),1)])],2)):T("v-if",!0),e.$slots.footer?(m(),V("div",{key:3,class:d(e.nsSelect.be("dropdown","footer")),onClick:D(()=>{},["stop"])},[k(e.$slots,"footer")],10,["onClick"])):T("v-if",!0)]),_:3},512)]),_:3},8,["visible","placement","teleported","popper-class","popper-options","fallback-placements","effect","transition","persistent","append-to","onBeforeShow","onHide"])],16,["onMouseleave"])),[[p,e.handleClickOutside,e.popperRef]])}var pn=re(dn,[["render",cn],["__file","select.vue"]]);const fn=Q({name:"ElOptionGroup",componentName:"ElOptionGroup",props:{label:String,disabled:Boolean},setup(e){const a=_("select"),o=E(null),v=$e(),s=E([]);pt(ht,ie({...Me(e)}));const h=r(()=>s.value.some(i=>i.visible===!0)),l=i=>{var g,C;return((g=i.type)==null?void 0:g.name)==="ElOption"&&!!((C=i.component)!=null&&C.proxy)},b=i=>{const g=K(i),C=[];return g.forEach(O=>{var p,y;l(O)?C.push(O.component.proxy):(p=O.children)!=null&&p.length?C.push(...b(O.children)):(y=O.component)!=null&&y.subTree&&C.push(...b(O.component.subTree))}),C},c=()=>{s.value=b(v.subTree)};return Be(()=>{c()}),Nl(o,c,{attributes:!0,subtree:!0,childList:!0}),{groupRef:o,visible:h,ns:a}}});function vn(e,a,o,v,s,h){return oe((m(),V("ul",{ref:"groupRef",class:d(e.ns.be("group","wrap"))},[I("li",{class:d(e.ns.be("group","title"))},F(e.label),3),I("li",null,[I("ul",{class:d(e.ns.b("group"))},[k(e.$slots,"default")],2)])],2)),[[Re,e.visible]])}var gt=re(fn,[["render",vn],["__file","option-group.vue"]]);const On=dt(pn,{Option:De,OptionGroup:gt}),wn=ft(De);ft(gt);export{wn as E,On as a};
