import"./base.45a05a23.js";import{E as L}from"./el-pagination.dca33747.js";import{E as Y,a as q}from"./el-checkbox.39fd97b2.js";import{E as G,a as H}from"./el-select.ebdfc510.js";import"./el-scrollbar.bf283bcb.js";import"./el-popper.67d0705d.js";import{E as O}from"./el-button.028e6afb.js";import{E as Z,a as J}from"./el-col.9fc588fd.js";import{d as K,C as Q,D as W,r as s,M as X,c as ee,G as ae,E as te,aY as le,o as u,l as _,j as m,g as t,w as l,B as y,H as D,I as w,f as C,q as c,t as F,h as x,aZ as oe}from"./index.6e34900c.js";import{g as ue,a as se}from"./manageFile.805a80fa.js";import{_ as ne}from"./plugin-vue_export-helper.21dcd24c.js";import{E as re}from"./index.a33a8b7c.js";import"./index.cee1fac9.js";import"./scroll.3ba02326.js";import"./index.fbe375fc.js";const ie={class:"container"},ce={class:"head"},pe={class:"Main"},de={class:"state_row"},_e={class:"icon_state"},ve={key:0,class:"dotClass",style:{"background-color":"#21b339"}},me={key:1,class:"dotClass",style:{"background-color":"#c7242f"}},fe={key:2,class:"dotClass",style:{"background-color":"#fca235"}},ge={class:"state_row"},be=K({__name:"f_approval",setup(ye){Q();const S=W(),p=s(-1),d=s(-1);s("");const V=X(),f=ee(()=>V.isMobile),h=[{label:"\u5168\u90E8",value:-1},{label:"\u5165\u515A\u7533\u8BF7\u4E66",value:1},{label:"\u601D\u60F3\u6C47\u62A5",value:2},{label:"\u4E2A\u4EBA\u81EA\u4F20",value:3},{label:"\u5165\u515A\u5FD7\u613F\u4E66",value:4},{label:"\u8F6C\u6B63\u7533\u8BF7\u4E66",value:5},{label:"\u4E2A\u4EBA\u5C0F\u7ED3",value:6}],M=[{label:"\u5168\u90E8",value:-1},{label:"\u672A\u5904\u7406",value:0},{label:"\u5DF2\u5904\u7406",value:1}],g=s(1),E=s(14),k=s(0),A=s([]),v=async(i,a,n)=>{n&&(g.value=1);let o=await ue(i,a,g.value,E.value);o.code===0?(A.value=o.data,k.value=o.page.itemTotalCount):re.error(o.msg+":"+o.code)};ae(async()=>{v(-1,-1,!1)});const z=i=>{v(p.value,d.value,!1)},N=i=>{v(p.value,d.value,!1)},R=(i,a)=>{se(a.id).then(n=>{let o=n.data.content,b={userName:a.userName,sno:a.sno,createAt:a.createAt,type:a.type,file_id:a.id,title:a.title,content:o,attachment:a.attachment};S.push({name:"f_check",state:{params:b}})})};te({user:"",region:"",date:""});const T=s(),$=s([]),P=i=>{$.value=i};return(i,a)=>{const n=Z,o=G,b=H,B=J,r=Y,U=O,I=L,j=le;return u(),_("div",ie,[m("div",ce,[t(B,{style:{width:"100%","align-items":"center"}},{default:l(()=>[t(n,{span:3,class:"font"},{default:l(()=>a[6]||(a[6]=[y("\u6587\u4EF6\u7C7B\u578B")])),_:1}),t(n,{span:15},{default:l(()=>[t(b,{modelValue:p.value,"onUpdate:modelValue":a[0]||(a[0]=e=>p.value=e),class:"m-2",placeholder:"Select",style:{"margin-left":"30px"},onChange:a[1]||(a[1]=e=>v(p.value,d.value,!0))},{default:l(()=>[(u(),_(D,null,w(h,e=>t(o,{class:"option",key:e.value,label:e.label,value:e.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1}),t(B,{style:{width:"100%","align-items":"center"}},{default:l(()=>[t(n,{span:3,class:"font"},{default:l(()=>a[7]||(a[7]=[y("\u5904\u7406\u72B6\u6001")])),_:1}),t(n,{span:15},{default:l(()=>[t(b,{modelValue:d.value,"onUpdate:modelValue":a[2]||(a[2]=e=>d.value=e),class:"m-2",placeholder:"Select",style:{"margin-left":"30px"},onChange:a[3]||(a[3]=e=>v(p.value,d.value,!0))},{default:l(()=>[(u(),_(D,null,w(M,e=>t(o,{class:"option",key:e.value,label:e.label,value:e.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),m("div",pe,[t(x(q),{ref_key:"multipleTableRef",ref:T,data:A.value,style:{width:"100%",height:"100%"},"header-cell-style":{background:"#FFF8F9",color:"#2F2F2F"},onSelectionChange:P},{default:l(()=>[f.value?c("",!0):(u(),C(r,{key:0,width:"48"})),t(r,{property:"userName",label:"\u59D3\u540D","class-name":"son1"}),f.value?c("",!0):(u(),C(r,{key:1,property:"sno",label:"\u5B66\u53F7","class-name":"son2"})),t(r,{property:"type",label:"\u6587\u4EF6\u7C7B\u578B","class-name":"son3"},{default:l(e=>[m("div",de,F(e.row.type<=6?h[e.row.type].label:""),1)]),_:1}),f.value?c("",!0):(u(),C(r,{key:2,property:"title",label:"\u6807\u9898","class-name":"son4"})),f.value?c("",!0):(u(),C(r,{key:3,property:"createAt",label:"\u63D0\u4EA4\u65F6\u95F4","class-name":"son5"},{default:l(e=>[y(F(new Date(Date.parse(e.row.createAt)).getFullYear()+"-"+(new Date(Date.parse(e.row.createAt)).getMonth()+1)+"-"+new Date(Date.parse(e.row.createAt)).getDate()),1)]),_:1})),t(r,{property:"status",label:"\u72B6\u6001"},{default:l(e=>[m("div",_e,[e.row.status==1?(u(),_("i",ve)):c("",!0),e.row.status==2?(u(),_("i",me)):c("",!0),e.row.status==0?(u(),_("i",fe)):c("",!0),m("div",ge,F(e.row.status==0?"\u672A\u5BA1\u6838":e.row.status==1?"\u5DF2\u901A\u8FC7":"\u672A\u901A\u8FC7"),1)])]),_:1}),t(r,{label:"\u64CD\u4F5C"},{default:l(e=>[t(U,{class:"button",style:{color:"#c7242f"},link:"",onClick:Ce=>R(e.$index,e.row)},{default:l(()=>a[8]||(a[8]=[y("\u67E5\u770B")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),t(j,{locale:x(oe)},{default:l(()=>[t(I,{small:"",class:"el-pagination","current-page":g.value,"onUpdate:currentPage":a[4]||(a[4]=e=>g.value=e),"page-size":E.value,"onUpdate:pageSize":a[5]||(a[5]=e=>E.value=e),style:{margin:"20px"},background:"",layout:"total, ->,sizes, prev, pager, next, jumper",total:k.value,onSizeChange:z,onCurrentChange:N},null,8,["current-page","page-size","total"])]),_:1},8,["locale"])])}}});var Te=ne(be,[["__scopeId","data-v-295bf05a"]]);export{Te as default};
