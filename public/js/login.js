!function(e){function t(t){for(var n,i,c=t[0],u=t[1],s=t[2],d=0,p=[];d<c.length;d++)i=c[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);for(l&&l(t);p.length;)p.shift()();return a.push.apply(a,s||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,c=1;c<r.length;c++){var u=r[c];0!==o[u]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={2:0},a=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var l=u;a.push([82,0]),r()}({23:function(e,t,r){"use strict";(function(e){r(36);var n,o=r(14),a=r(7),i=r(28),c=r(19),u=(r(38),r(3)),s=(r(30),r(1)),l=r.n(s);(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;window.React=l.a;var d,p,f=!1,h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!f){if(t){var r=g(t);Object(o.render)(l.a.createElement(u.a,{store:r},l.a.createElement(e,null)),document.querySelector("#app-container"))}else Object(o.render)(l.a.createElement(e,null),document.querySelector("#app-container"));f=!0}};function b(e,t){return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,n=arguments.length>1?arguments[1]:void 0;return n.type in e?e[n.type](r,n):r}}function g(e){var t=[],r={};for(var n in e){var o=e[n],u=o.init,s=o.handlers,l=o.saga;if(!u)throw"missing init for duck: ".concat(n);l&&t.push(l()),r[n]=b(s,u)}var d=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||a.d,p=Object(i.a)(),f=Object(a.e)(Object(a.c)(r),d(Object(a.a)(p)));return p.run(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.all)(t);case 2:case"end":return e.stop()}}),e)}))),f}t.a=h,(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(d.register(f,"booted","D:\\work\\work\\etichette\\resources\\react\\boot.jsx"),d.register(b,"lookupReducer","D:\\work\\work\\etichette\\resources\\react\\boot.jsx"),d.register(g,"initStore","D:\\work\\work\\etichette\\resources\\react\\boot.jsx"),d.register(h,"default","D:\\work\\work\\etichette\\resources\\react\\boot.jsx")),(p="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&p(e)}).call(this,r(5)(e))},30:function(e,t,r){var n=r(11),o=r(31);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};n(o,a);e.exports=o.locals||{}},31:function(e,t,r){(t=r(12)(!1)).push([e.i,"body,h1,h2,h3,h4,h5,p,button,th{margin:0;font-family:'Open Sans', sans-serif;font-weight:100;color:#142C87}h1,h2,h3,h4,h5{margin:0}input,textarea{color:#142C87;font-family:'Open Sans', sans-serif;font-weight:100;padding:7px;resize:none}input::placeholder,textarea::placeholder{color:#B7B7B7}button{padding:7px;background-color:#142C87;color:white;border:0;cursor:pointer}button:hover{background-color:#3d53a6}div{display:flex;color:#142C87}#toolbar{height:80px;width:100%;display:flex;flex-wrap:nowrap;align-items:center;margin:5px 0;flex-shrink:0}#toolbar>.logo{height:60px;margin:0 30px}\n",""]),e.exports=t},82:function(e,t,r){"use strict";r.r(t);var n,o,a=r(27),i=r(23),c=r(9),u=r(1),s=r.n(u);r(83);function l(e,t,r,n,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}o=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})((function(){var e=d(Object(u.useState)(""),2),t=e[0],r=e[1],n=d(Object(u.useState)(""),2),o=n[0],a=n[1],i=d(Object(u.useState)(),2),p=i[0],f=i[1],h=function(){var e,r=(e=regeneratorRuntime.mark((function e(){var r,n,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f(null),t){e.next=3;break}return e.abrupt("return",f("Username mancante"));case 3:if(o){e.next=5;break}return e.abrupt("return",f("Password mancante"));case 5:return e.next=7,Object(c.login)(t,o);case 7:if(r=e.sent,n=r.err,a=r.ok,!n){e.next=12;break}return e.abrupt("return",f(n));case 12:if(!a){e.next=14;break}return e.abrupt("return",location.reload());case 14:f("Errore sconosciuto");case 15:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){l(a,n,o,i,c,"next",e)}function c(e){l(a,n,o,i,c,"throw",e)}i(void 0)}))});return function(){return r.apply(this,arguments)}}();return s.a.createElement("div",{id:"spabox"},s.a.createElement("div",{id:"logo"},s.a.createElement("img",{src:_URL("/img/logo.jpg")})),s.a.createElement("div",{id:"title"},s.a.createElement("h1",null,"Software Creazione ",s.a.createElement("b",null,"Etichette"))),s.a.createElement("div",{id:"loginbox",onKeyDown:function(e){return"Enter"===e.key&&h()}},s.a.createElement("h2",null,"Login"),s.a.createElement("input",{type:"text",placeholder:"Username",value:t,onChange:function(e){var t;return t=e.target.value,r(t)}}),s.a.createElement("input",{type:"password",placeholder:"Password",value:o,onChange:function(e){var t;return t=e.target.value,a(t)}}),s.a.createElement("button",{onClick:h},"Entra >>>")),p&&s.a.createElement("div",{id:"error"},p),s.a.createElement("div",{id:"version"},"ver. ",window.version))}),"useState{[name, setName]('')}\nuseState{[password, setPassword]('')}\nuseState{[error, setError]}"),n=Object(a.hot)(o),Object(i.a)(n)},83:function(e,t,r){var n=r(11),o=r(84);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};n(o,a);e.exports=o.locals||{}},84:function(e,t,r){(t=r(12)(!1)).push([e.i,"#spabox{width:100vw;height:100vh;flex-direction:column;align-items:center}#spabox #logo{flex-basis:20%;align-items:flex-end}#spabox #title{align-items:center;text-transform:uppercase;letter-spacing:5pt;flex-basis:24%}#spabox #loginbox{background-color:#EEEEEE;padding:20px;width:400px;height:250px;flex-direction:column;justify-content:space-around}#spabox #loginbox h2{text-transform:uppercase}#spabox #loginbox input{border:0;font-size:11pt}#spabox #loginbox button{margin-top:20px;width:33%;align-self:flex-end;font-size:14pt}#spabox #error{color:red}#version{position:fixed;bottom:0;right:0;color:#AAAAAA}\n",""]),e.exports=t},9:function(e,t,r){"use strict";r.r(t),function(e){r.d(t,"login",(function(){return p})),r.d(t,"dupe",(function(){return f})),r.d(t,"delLabel",(function(){return h})),r.d(t,"delProduct",(function(){return b})),r.d(t,"active",(function(){return g})),r.d(t,"save",(function(){return v})),r.d(t,"updCod",(function(){return w})),r.d(t,"wp_save",(function(){return m})),r.d(t,"getLabelImage",(function(){return x})),r.d(t,"upLabelImage",(function(){return y}));var n;r(3);function o(e,t,r,n,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function c(e){o(i,n,a,c,u,"next",e)}function u(e){o(i,n,a,c,u,"throw",e)}c(void 0)}))}}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var i,c,u=function(){var e=a(regeneratorRuntime.mark((function e(t,r){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_URL(t),{method:r?"POST":"GET",headers:{Accept:"application/json","Content-Type":"application/json"},body:r?JSON.stringify(r):void 0});case 2:return n=e.sent,e.next=5,n.json();case 5:return o=e.sent,e.abrupt("return",o);case 7:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),s=function(){var e=a(regeneratorRuntime.mark((function e(t){var r,n,o,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n in r="action=label_ajax_request",t)r+="&".concat(n,"=").concat(t[n]);return e.next=4,fetch("https://picchionisurgelati.it//wp-admin/admin-ajax.php",{method:t?"POST":"GET",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:r});case 4:return o=e.sent,a=o.json(),e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(e,t){return u("ajax/".concat(e),t)},d=function(e,t){return u("ajax/".concat(e),t)},p=function(e,t){return u("login",{name:e,password:t})},f=function(e){return l("dupe/".concat(e))},h=function(e){return l("delLabel/".concat(e))},b=function(e){return l("delProduct/".concat(e))},g=function(e){return l("active/".concat(e))},v=function(e){return d("save",e)},w=function(e,t){return l("updCod",{oldCod:e,newCod:t})},m=function(e){return s(e)},x=function(){var e=a(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_URL("uploads/label/".concat(t)));case 2:return r=e.sent,e.next=5,r.blob();case 5:return n=e.sent,e.abrupt("return",URL.createObjectURL(n));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(e,t,r){return j("ajax/upimg/".concat(e),t,r)};function j(e,t,r){return new Promise((function(n,o){var a=new XMLHttpRequest;a.open("post",e),a.upload.addEventListener("progress",(function(e){var t;return t=100*e.loaded/e.total,r(t)})),a.addEventListener("load",(function(e){if(200!==a.status)return o("HTTP Error: ".concat(a.status));n(a.response)})),a.send(t)}))}(i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(i.register(u,"api","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(s,"wordpress_api","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(l,"ajax","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(d,"ajax_save","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(p,"login","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(f,"dupe","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(h,"delLabel","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(b,"delProduct","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(g,"active","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(v,"save","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(w,"updCod","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(m,"wp_save","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(x,"getLabelImage","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(y,"upLabelImage","D:\\work\\work\\etichette\\resources\\react\\api.js"),i.register(j,"uploadFile","D:\\work\\work\\etichette\\resources\\react\\api.js")),(c="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&c(e)}.call(this,r(5)(e))}});