import{m as r}from"./index.ae692c96.js";function o(){return r.get({url:"/api/studyGroup/myBranch"})}function a(){return r.get({url:"/api/studyGroup/unalloc"})}function n(t){return r.get({url:`/api/studyGroup/${t}/delete`})}function p(t){return r.post({url:"/api/studyGroup/new",data:{leaderSno:t}})}function s(t,u){return r.post({url:`/api/studyGroup/${u}/addMember`,data:{ids:t}})}function d(){return r.get({url:"/api/studyGroup/export",responseType:"blob"})}export{n as a,p as b,d as c,a as d,s as e,o as g};
