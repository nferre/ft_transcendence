import{e as d}from"./events-socket.42800548.js";import{w}from"./index.a5450dba.js";import{f}from"./friends.b57e3a7f.js";import{u as a}from"./user.718f5da3.js";import{O as u}from"./index.85b3f724.js";import{a as r}from"./apiUrl.d59c2ca3.js";const h=w([]),l=w([]);async function p(e){const t=u(d);return new Promise((s,o)=>{t.emit("is-user-connected",e,n=>{s(n)})})}async function y(e){const t=u(d);return new Promise((s,o)=>{t.emit("is-user-in-game",e,n=>{s(n)})})}async function m(e){return await Promise.all(e.map(async t=>{const s=await p(t.username),o=await y(t.username);return{isConnected:s,isInGame:o,profile:t}}))}const v=async()=>{const e=await fetch(`${r}/auth/logout`,{credentials:"include"});if(!e.ok){const t=await e.json();throw new t}a.set(void 0),d.update(t=>{t==null||t.disconnect()})},g=async()=>{const e=await fetch(`${r}/user`,{credentials:"include"});if(!e.ok)throw await e.json();const t=await e.json();a.set(t)},O=async e=>{const t=await fetch(`${r}/users/profile/${e}`,{credentials:"include"});if(!t.ok){const s=await t.json();throw s.statusCode===401&&a.set(void 0),s}return await t.json()},P=async(e,t,s)=>{const o=await fetch(`${r}/game?startIndex=${t}&pageSize=${s}&username=${e}`,{credentials:"include"});if(!o.ok){const n=await o.json();throw n.statusCode===401&&a.set(void 0),new n}return await o.json()},S=async e=>{const t=await fetch(`${r}/user/username`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({newUsername:e})});if(!t.ok){const o=await t.json();throw o.statusCode===401&&a.set(void 0),o}a.update(o=>{let n=o;return n.profile.username=e,n}),u(d).emit("update-username",e)},F=async e=>{const t=await fetch(`${r}/user/avatar`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({newAvatar:e})});if(!t.ok){const s=await t.json();throw s.statusCode===401&&a.set(void 0),s}a.update(s=>{let o=s;return o.profile.avatar.url=e,o})},U=async e=>{const t=await fetch(`${r}/2fa/turn-on`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({twoFactorAuthenticationCode:e})});if(!t.ok){const s=await t.json();throw s.statusCode===401&&a.set(void 0),s}a.update(s=>({...s,isTwoFactorAuthenticationEnabled:!0}))},A=async()=>{const e=await fetch(`${r}/2fa/turn-off`,{method:"POST",credentials:"include"});if(!e.ok){const t=await e.json();throw t.statusCode===401&&a.set(void 0),t}a.update(t=>({...t,isTwoFactorAuthenticationEnabled:!1}))},q=async()=>{const e=await fetch(`${r}/user/friends`,{credentials:"include"});if(!e.ok){const o=await e.json();throw o.statusCode===401&&a.set(void 0),o}const t=await e.json(),s=await m(t);f.set(s)},J=async()=>{const e=await fetch(`${r}/user/friend-requests`,{credentials:"include"});if(!e.ok){const s=await e.json();throw s.statusCode===401&&a.set(void 0),s}const t=await e.json();l.set(t)},N=async e=>{const t=await fetch(`${r}/friend-requests`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e})});if(!t.ok){const n=await t.json();throw n.statusCode===401&&a.set(void 0),n}const s=await t.json();u(d).emit("send-friend-request",{id:s.id,receiverUsername:e})},H=async e=>{const t=await fetch(`${r}/friend-requests/accept/${e}`,{method:"POST",credentials:"include"});if(!t.ok){const i=await t.json();throw i.statusCode===401&&a.set(void 0),i}const s=await t.json(),o={isConnected:await p(s.username),isInGame:!1,profile:s};f.update(i=>[...i,o]),l.update(i=>i.filter(c=>c.id!==e)),h.update(i=>i.filter(c=>c.type!=="friend-request"&&c.data.id===e)),u(d).emit("accept-friend-request",s.username)},x=async e=>{const t=await fetch(`${r}/friend-requests/decline/${e}`,{method:"POST",credentials:"include"});if(!t.ok){const s=await t.json();throw s.statusCode===401&&a.set(void 0),s}l.update(s=>s.filter(o=>o.id!==e)),h.update(s=>s.filter(o=>o.type!=="friend-request"&&o.data.id===e))},G=async e=>{const t=await fetch(`${r}/user/remove-friend`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e})});if(!t.ok){const o=await t.json();throw o.statusCode===401&&a.set(void 0),o}f.update(o=>o.filter(n=>n.profile.username!==e)),u(d).emit("remove-friend",e)},E=async()=>{const e=await fetch(`${r}/2fa/generate`,{method:"post",credentials:"include"});if(!e.ok){const t=await e.json();throw t.statusCode===401&&a.set(void 0),t}return await e.text()},W=async e=>{const t=await fetch(`http://${r}:3000/2fa/login`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({twoFactorAuthenticationCode:e})});if(!t.ok){const s=await t.json();throw s.statusCode===401&&a.set(void 0),s}},_=async()=>{const e=await fetch(`${r}/user/blocked-users`,{credentials:"include"});if(!e.ok){const s=await e.json();throw s.statusCode===401&&a.set(void 0),s}const t=await e.json();a.update(s=>{let o=s;return o.blocked=t,o})},z=async e=>{const t=await fetch(`${r}/user/block-user`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({usernameToBlock:e})});if(!t.ok){const o=await t.json();throw o.statusCode===401&&a.set(void 0),o}let s=await t.json();a.update(o=>{var i;let n=o;return(i=n.blocked)==null||i.push(s),n})},B=async e=>{const t=await fetch(`${r}/user/unblock-user`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({usernameToUnblock:e})});if(!t.ok){const o=await t.json();throw o.statusCode===401&&a.set(void 0),o}let s=await t.json();a.update(o=>{var i,c;let n=o;return(c=n.blocked)==null||c.splice((i=o.blocked)==null?void 0:i.indexOf(s),1),n})};export{J as a,_ as b,O as c,l as d,y as e,q as f,v as g,H as h,p as i,x as j,z as k,g as l,S as m,h as n,F as o,P as p,E as q,G as r,N as s,A as t,B as u,U as v,W as w};
