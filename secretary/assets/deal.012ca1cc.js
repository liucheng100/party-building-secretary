import"./base.45a05a23.js";import{E as su}from"./el-overlay.ccd4cf29.js";import{E as ou}from"./el-date-picker.bbdfccd7.js";/* empty css                 */import"./el-scrollbar.bf283bcb.js";import"./el-popper.67d0705d.js";import{E as nu}from"./el-button.028e6afb.js";import{E as ru}from"./el-pagination.dca33747.js";import{E as iu,a as q}from"./el-checkbox.39fd97b2.js";import{E as du,a as pu}from"./el-select.ebdfc510.js";import{E as vu,a as mu}from"./el-col.9fc588fd.js";import{d as fu,M as Fu,c as Eu,C as Au,D as gu,r as o,G as bu,aY as Cu,o as d,l as g,f as w,w as a,g as e,j as v,H as S,I as U,B as E,t as G,q as L,h as c,aT as cu,aZ as Bu}from"./index.6e34900c.js";import{m as O}from"./index.fbe375fc.js";import{_ as Du}from"./plugin-vue_export-helper.21dcd24c.js";import{E as V}from"./index.a33a8b7c.js";import"./use-dialog.d3c5468c.js";import"./scroll.3ba02326.js";import"./index.cee1fac9.js";function _u(B){return O.get({url:"/api/process/filter",params:{processId:B}})}function yu(B){return O.post({url:"/api/process/updateBatch",data:B})}const wu={class:"container"},Vu={key:1,class:"mobile-head"},ku={class:"Main"},xu={class:"modal"},Mu={key:0,style:{display:"flex"}},hu={class:"modal-tail"},Yu=fu({__name:"deal",setup(B){const Z=Fu(),H=Eu(()=>Z.isMobile);Au(),gu();const n=o(0),p=o(0);o("");const D=o(!1),k=o(!0),x=o(""),N=[{label:"\u672A\u63D0\u4EA4\u5165\u515A\u7533\u8BF7\u4E66",value:0},{label:"\u5165\u515A\u7533\u8BF7\u4EBA",value:1},{label:"\u5165\u515A\u79EF\u6781\u5206\u5B50",value:2},{label:"\u53D1\u5C55\u5BF9\u8C61",value:3},{label:"\u4E2D\u5171\u9884\u5907\u515A\u5458",value:4}],A=[[{label:"\u5165\u515A\u7533\u8BF7\u4EBA",value:0,stage:1}],[{label:"\u7FA4\u56E2\u7EC4\u7EC7\u63A8\u4F18",value:0,stage:3},{label:"\u652F\u59D4\u4F1A\u5BA1\u8BAE\u5E76\u4E0A\u62A5\u652F\u90E8\u515A\u59D4\u7EC4\u7EC7",value:1,stage:5},{label:"\u5165\u515A\u79EF\u6781\u5206\u5B50",value:2,stage:6}],[{label:"\u786E\u5B9A\u57F9\u517B\u8054\u7CFB\u4EBA",value:0,stage:9},{label:"\u652F\u90E8\u8003\u5BDF",value:1,stage:10},{label:"\u542C\u53D6\u515A\u5458\u610F\u89C1",value:2,stage:11},{label:"\u5F81\u6C42\u7FA4\u4F17\u610F\u89C1",value:3,stage:12},{label:"\u5F81\u6C42\u515A\u5C0F\u7EC4\u3001\u8054\u7CFB\u4EBA\u610F\u89C1",value:4,stage:13},{label:"\u652F\u90E8\u4F1A\u8BA8\u8BBA\u5E76\u4E0A\u62A5\u4E0A\u7EA7\u515A\u59D4\u5907\u6848",value:5,stage:14},{label:"\u53D1\u5C55\u5BF9\u8C61",value:6,stage:15}],[{label:"\u786E\u5B9A2\u540D\u6B63\u5F0F\u515A\u5458\u4E3A\u4ECB\u7ECD\u4EBA",value:0,stage:16},{label:"\u653F\u5BA1",value:1,stage:17},{label:"\u901A\u8FC7\u53D1\u5C55\u5BF9\u8C61\u515A\u6821\u57F9\u8BAD",value:2,stage:19},{label:"\u6750\u6599\u9F50\u5168",value:3,stage:20},{label:"\u652F\u90E8\u7EFC\u5408\u5BA1\u67E5",value:4,stage:21},{label:"\u4E0A\u7EA7\u515A\u59D4\u9884\u5BA1\u5E76\u516C\u793A",value:5,stage:22},{label:"\u515A\u5458\u53D1\u5C55\u5927\u4F1A",value:6,stage:24},{label:"\u515A\u59D4\u8C08\u8BDD\u3001\u5BA1\u6279",value:7,stage:25},{label:"\u62A5\u518D\u4E0A\u4E00\u7EA7\u515A\u59D4\u7EC4\u7EC7\u90E8\u95E8\u5907\u6848",value:8,stage:26},{label:"\u4E2D\u5171\u9884\u5907\u515A\u5458",value:9,stage:27}],[{label:"\u5165\u515A\u5BA3\u8A93",value:0,stage:28},{label:"\u53C2\u52A0\u7EC4\u7EC7\u751F\u6D3B",value:1,stage:31},{label:"\u652F\u90E8\u6309\u5B63\u5EA6\u8FDB\u884C\u8003\u5BDF",value:2,stage:32},{label:"\u5F81\u6C42\u515A\u5458\u3001\u7FA4\u4F17\u610F\u89C1",value:3,stage:34},{label:"\u542C\u53D6\u515A\u5C0F\u7EC4\u3001\u4ECB\u7ECD\u4EBA\u610F\u89C1",value:4,stage:35},{label:"\u8F6C\u6B63\u516C\u793A",value:5,stage:36},{label:"\u8F6C\u6B63\u5927\u4F1A",value:6,stage:37},{label:"\u515A\u59D4\u5BA1\u6279",value:7,stage:38},{label:"\u515A\u5458\u4E66\u8BB0\u8C08\u8BDD",value:8,stage:39},{label:"\u4E2D\u5171\u515A\u5458",value:9,stage:40}]],R=[{label:"\u9012\u4EA4\u5165\u515A\u7533\u8BF7\u4E66",value:0,stage:0},{label:"\u7FA4\u56E2\u7EC4\u7EC7\u63A8\u4F18",value:1,stage:3},{label:"\u5165\u515A\u79EF\u6781\u5206\u5B50",value:4,stage:6},{label:"\u53D1\u5C55\u5BF9\u8C61",value:8,stage:15},{label:"\u653F\u5BA1",value:2,stage:17},{label:"\u515A\u5458\u53D1\u5C55\u5927\u4F1A",value:8,stage:24}],_=o([]),F=o([]),J=o(),M=o([]),m=o(15);let y=o([]),T=o(0),r=o(1);const b=async s=>{s&&(p.value=0);let u=await _u(A[n.value][p.value].stage);u.code===0?(y.value=u.data,T.value=u.data.length,_.value=y.value.slice((r.value-1)*m.value,r.value*m.value)):V.error(u.msg+":"+u.code)},I=async()=>{F.value=M.value,k.value=!0;for(let s of R)if(A[n.value][p.value].stage==s.stage){P();return}F.value.forEach(s=>{s.passAt=""}),h(!1)},K=s=>{F.value=[s],k.value=!1;for(let u of R)if(A[n.value][p.value].stage==u.stage){P();return}F.value.forEach(u=>{u.passAt=""}),h(!1)},h=async s=>{if(s){for(let i of F.value)if(!i.passAt){V.error("\u4E0D\u80FD\u4E3A\u7A7A");return}}let u=[];F.value.forEach(i=>{u.push({userId:i.id,progressId:A[n.value][p.value].stage,status:1,passAt:i.passAt})});let t=await yu(u);t.code==0?(V.success("\u4FEE\u6539\u6210\u529F"),b(!1),eu()):V.error(t.msg+":"+t.code)},Q=()=>{_.value=y.value.slice((r.value-1)*m.value,r.value*m.value)},W=()=>{_.value=y.value.slice((r.value-1)*m.value,r.value*m.value)};bu(()=>{b(!0)});const X=s=>{M.value=s},uu=()=>{M.value.forEach(s=>{s.passAt=x.value})},P=()=>{D.value=!0},eu=()=>{D.value=!1};return(s,u)=>{const t=vu,i=mu,Y=du,z=pu,C=nu,f=iu,lu=ru,au=Cu,$=ou,tu=su;return d(),g("div",wu,[H.value?(d(),g("div",Vu,[e(t,{span:24,class:"headbar",style:{"margin-bottom":"10px"}},{default:a(()=>[e(i,{style:{width:"100%","align-items":"center"}},{default:a(()=>[e(t,{span:6,class:"headfont"},{default:a(()=>u[16]||(u[16]=[v("span",null,"\u5F53\u524D\u9636\u6BB5:",-1)])),_:1}),e(t,{span:18},{default:a(()=>[e(z,{modelValue:n.value,"onUpdate:modelValue":u[3]||(u[3]=l=>n.value=l),class:"m-2",placeholder:"Select",onChange:u[4]||(u[4]=l=>b(!0))},{default:a(()=>[(d(),g(S,null,U(N,l=>e(Y,{class:"option",key:l.value,label:l.label,value:l.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(t,{span:24,class:"headbar"},{default:a(()=>[e(i,{style:{width:"100%","align-items":"center"}},{default:a(()=>[e(t,{span:6},{default:a(()=>u[17]||(u[17]=[v("span",null,"\u671F\u671B\u9636\u6BB5:",-1)])),_:1}),e(t,{span:18},{default:a(()=>[e(z,{modelValue:p.value,"onUpdate:modelValue":u[5]||(u[5]=l=>p.value=l),class:"m-2",placeholder:"Select",onChange:u[6]||(u[6]=l=>b(!1))},{default:a(()=>[(d(!0),g(S,null,U(A[n.value],l=>(d(),w(Y,{class:"option",key:l.value,label:l.label,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(t,{span:24},{default:a(()=>[e(C,{style:{width:"100%","font-size":"16px","margin-top":"10px"},color:"#c7242f",onClick:u[7]||(u[7]=l=>I()),disabled:n.value===0},{default:a(()=>u[18]||(u[18]=[E(" \u901A\u8FC7\u9009\u4E2D\u6210\u5458 ")])),_:1},8,["disabled"])]),_:1})])):(d(),w(i,{key:0,class:"head"},{default:a(()=>[e(t,{span:10,class:"headbar"},{default:a(()=>[e(i,{style:{width:"100%","align-items":"center"}},{default:a(()=>[e(t,{span:6,class:"headfont"},{default:a(()=>u[13]||(u[13]=[v("span",null,null,-1)])),_:1}),e(t,{span:15})]),_:1})]),_:1}),e(t,{span:10,class:"headbar"},{default:a(()=>[e(i,{style:{width:"100%","align-items":"center"}},{default:a(()=>[e(t,{span:7},{default:a(()=>u[14]||(u[14]=[v("span",null,"\u6B32\u901A\u8FC7\u7684\u9636\u6BB5 ",-1)])),_:1}),e(t,{span:10},{default:a(()=>[e(z,{modelValue:p.value,"onUpdate:modelValue":u[0]||(u[0]=l=>p.value=l),class:"m-2",placeholder:"Select",onChange:u[1]||(u[1]=l=>b(!1))},{default:a(()=>[(d(!0),g(S,null,U(A[n.value],l=>(d(),w(Y,{class:"option",key:l.value,label:l.label,value:l.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(t,{span:7},{default:a(()=>[e(C,{style:{width:"100%","font-size":"14px","margin-left":"10px"},color:"#c7242f",onClick:u[2]||(u[2]=l=>I()),disabled:n.value===0},{default:a(()=>u[15]||(u[15]=[E(" \u901A\u8FC7\u9009\u4E2D\u6210\u5458 ")])),_:1},8,["disabled"])]),_:1})]),_:1})]),_:1})]),_:1})),v("div",ku,[e(c(q),{ref_key:"multipleTableRef",ref:J,data:_.value,style:{width:"100%",height:"100%"},"header-cell-style":{background:"#FFF8F9",color:"#2F2F2F"},onSelectionChange:X},{default:a(()=>[e(f,{type:"selection"}),e(f,{label:"\u59D3\u540D"},{default:a(l=>[E(G(l.row.userName),1)]),_:1}),H.value?L("",!0):(d(),w(f,{key:0,property:"sno",label:"\u5B66\u53F7","class-name":"son6"})),e(f,{property:"identity",label:"\u5F53\u524D\u9636\u6BB5"},{default:a(()=>[E(G(N[n.value].label),1)]),_:1}),e(f,{label:"\u64CD\u4F5C"},{default:a(l=>[e(C,{style:{color:"#21b339","font-size":"10px"},link:"",onClick:j=>K(l.row)},{default:a(()=>u[19]||(u[19]=[E("\u901A\u8FC7")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),e(au,{locale:c(Bu),class:"tail"},{default:a(()=>[e(lu,{small:"",class:"el-pagination","current-page":c(r),"onUpdate:currentPage":u[8]||(u[8]=l=>cu(r)?r.value=l:r=l),"page-size":m.value,"onUpdate:pageSize":u[9]||(u[9]=l=>m.value=l),style:{margin:"20px"},background:"",layout:"total, ->,sizes, prev, pager, next, jumper",total:c(T),onSizeChange:Q,onCurrentChange:W},null,8,["current-page","page-size","total"])]),_:1},8,["locale"]),e(tu,{modelValue:D.value,"onUpdate:modelValue":u[12]||(u[12]=l=>D.value=l),title:"\u8BF7\u586B\u5199\u4EE5\u4E0B\u6210\u5458\u53D8\u66F4\u65F6\u95F4\uFF1A",class:"popup"},{default:a(()=>[v("div",xu,[k.value?(d(),g("div",Mu,[u[21]||(u[21]=v("div",{class:"font-4"},"\u6279\u91CF\u586B\u5199\uFF1A",-1)),e($,{modelValue:x.value,"onUpdate:modelValue":u[10]||(u[10]=l=>x.value=l),type:"datetime",size:"small",format:"YYYY-MM-DD-HH:mm","value-format":"YYYY-MM-DDTHH:mm:ss.sss"},null,8,["modelValue"]),e(C,{color:"#c7242f",style:{width:"50px",height:"24px"},onClick:uu},{default:a(()=>u[20]||(u[20]=[E("\u586B\u5199")])),_:1})])):L("",!0),e(c(q),{style:{width:"90%",margin:"20px"},"max-height":"50vh",size:"small","cell-style":{padding:"2px",fontSize:"13px"},data:F.value,"header-cell-style":{background:"#FFF8F9",color:"#2F2F2F"}},{default:a(()=>[e(f,{prop:"userName",label:"\u59D3\u540D","min-width":"30%"}),e(f,{prop:"sno",label:"\u5B66\u53F7","min-width":"45%"}),e(f,{label:"\u72B6\u6001\u53D8\u66F4\u65F6\u95F4",prop:"passAt"},{default:a(l=>[e($,{type:"datetime",size:"small",modelValue:l.row.passAt,"onUpdate:modelValue":j=>l.row.passAt=j,format:"YYYY-MM-DD-HH:mm","value-format":"YYYY-MM-DDTHH:mm:ss.sss"},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["data"]),v("div",hu,[e(C,{color:"#c7242f",onClick:u[11]||(u[11]=l=>h(!0)),style:{"font-size":"14px"}},{default:a(()=>u[22]||(u[22]=[E("\u786E\u8BA4\u66F4\u6539")])),_:1}),u[23]||(u[23]=v("div",{style:{color:"#c7242f","margin-top":"5px"}}," *\u672C\u64CD\u4F5C\u65E0\u6CD5\u56DE\u9000\uFF0C\u8BF7\u786E\u8BA4\u65E0\u8BEF\u540E\u518D\u64CD\u4F5C ",-1))])])]),_:1},8,["modelValue"])])}}});var Qu=Du(Yu,[["__scopeId","data-v-7c409669"]]);export{Qu as default};
