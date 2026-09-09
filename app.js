"use strict";
const SocialNet={
 token(){return sessionStorage.getItem("sn_token")||localStorage.getItem("sn_token")},
 user(){try{return JSON.parse(sessionStorage.getItem("sn_user")||localStorage.getItem("sn_user"))}catch{return null}},
 headers(extra={}){const t=this.token();return {...extra,...(t?{Authorization:"Bearer "+t}:{})}},
 apiBase(){return String(window.SECRETNET_API_BASE||"").replace(/\/$/,"")},
 url(url){return this.apiBase()+url},
 async api(url,options={}){const o={...options,headers:this.headers(options.headers||{})};const r=await fetch(this.url(url),o);const d=await r.json().catch(()=>({}));if(r.status===401){sessionStorage.clear();localStorage.removeItem("sn_token");localStorage.removeItem("sn_user");location.replace("/login.html");throw new Error(d.error||"Vous devez vous connecter.")}if(!r.ok)throw new Error(d.error||"Une erreur est survenue.");return d},
 async me(){return this.api("/api/me")},
 requireLogin(){if(!this.token()){location.replace("/login.html");return false}return true},
 async logout(){try{if(this.token())await this.api("/api/logout",{method:"POST"})}catch(e){}finally{sessionStorage.clear();localStorage.removeItem("sn_token");localStorage.removeItem("sn_user");location.replace("/login.html")}},
 escape(t){return String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))},
 escapeAttr(t){return this.escape(t).replace(/`/g,"&#096;")},
 date(d){return new Date(d).toLocaleString("fr-TN",{dateStyle:"medium",timeStyle:"short"})},
 async internetAvailable(){if(!navigator.onLine)return false;try{const r=await fetch(this.url("/api/health"),{cache:"no-store"});return r.ok}catch{return false}},
 async registerNativePhone(){try{if(!window.SecretNetSMS?.getPhoneNumber)return;const phone=await window.SecretNetSMS.getPhoneNumber();if(!phone||!this.token()||!(await this.internetAvailable()))return;const d=await this.api("/api/device/phone",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone_number:phone})});if(d.user){sessionStorage.setItem("sn_user",JSON.stringify(d.user));localStorage.setItem("sn_user",JSON.stringify(d.user))}}catch(e){console.debug("SecretNet native phone registration:",e.message)}},
 avatarHTML(url,name=""){const safe=this.escapeAttr(url||"");return url?`<img class="avatar avatar-img" src="${safe}" alt="${this.escapeAttr(name)}" loading="lazy" onerror="this.onerror=null;this.src='';this.classList.add('avatar-fallback');this.outerHTML='<span class="avatar">👤</span>'">`:`<span class="avatar">👤</span>`;}
};
window.SocialNet=SocialNet;
window.addEventListener("online",()=>SocialNet.registerNativePhone());
setTimeout(()=>SocialNet.registerNativePhone(),1200);
