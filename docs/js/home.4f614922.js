(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{f75a:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-button",{attrs:{type:"primary"},on:{click:t.sendSomething}},[t._v("主要按钮")]),n("svg-icon",{attrs:{"icon-class":"home"}}),n("el-input",{attrs:{placeholder:""},on:{blur:t.inputBlur,change:t.inputOnchange},model:{value:t.tets,callback:function(e){t.tets=e},expression:"tets"}}),n("el-button",{attrs:{type:"primary"},on:{click:t.sendToGithub}},[t._v("github")]),n("testHooks",{on:{"hook:mounted":t.doSomething}})],1)},c=[],s=n("1da1"),l=(n("96cf"),n("bc3a")),r=n.n(l),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("testHooks")])},i=[],a={data:function(){return{}},mounted:function(){var t=setInterval((function(){console.log("11111mouted")}),1e3);this.$once("hook:beforeDestroy",(function(){console.log("beforeDestroy"),clearInterval(t)}))}},h=a,f=n("2877"),m=Object(f["a"])(h,u,i,!1,null,null,null),p=m.exports,g={data:function(){return{tets:""}},components:{testHooks:p},methods:{doSomething:function(){console.log("mouted")},inputBlur:function(){console.log(1111)},inputOnchange:function(){return Object(s["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(2222),t.next=3,r.a.get("http://localhost:3011/github/rate_limit");case 3:e=t.sent,console.log("res",e);case 5:case"end":return t.stop()}}),t)})))()},sendToGithub:function(){},sendSomething:function(){r()("/api/home/menu0",{params:{id:1,title:"我是请求后台接口，并向后台传递参数"}}).then((function(t){console.log(t),console.log("写入成功！")})).catch((function(t){console.log("msg",t),console.log("写入失败！")}))}}},d=g,b=Object(f["a"])(d,o,c,!1,null,null,null);e["default"]=b.exports}}]);