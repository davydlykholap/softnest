export function signInPage({ ready, error, signout = false }) {
  const message = error === 'AccessDenied'
    ? 'This Google account does not have access to SF0. Try an invited account.'
    : error ? 'Sign-in could not be completed. Please try again.' : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>${signout ? 'Sign out' : 'Sign in'} · SF0</title>
<style>
*{box-sizing:border-box}body{margin:0;font:14px/1.6 Inter,"Segoe UI",sans-serif;color:#252932;background:#fafafb;min-height:100dvh;display:flex;flex-direction:column}
header{height:72px;display:flex;align-items:center;justify-content:space-between;padding:0 40px;border-bottom:1px solid #e9ebef;background:white}.brand{font-size:23px;font-weight:600;letter-spacing:-1px}.business{color:#737985;font-size:13px}
main{flex:1;display:grid;place-items:center;padding:48px 24px}.signin{width:100%;max-width:380px}.eyebrow{text-transform:uppercase;font-size:11px;letter-spacing:1.6px;color:#737985;font-weight:600;margin:0 0 16px}h1{font-size:32px;line-height:1.25;letter-spacing:-1px;font-weight:500;margin:0 0 14px}.intro{color:#737985;font-size:15px;margin:0 0 32px}
button{width:100%;background:#2c323c;border:1px solid #2c323c;color:white;border-radius:6px;font-family:inherit;font-size:14px;font-weight:500;line-height:22px;padding:12px 16px;cursor:pointer;min-height:46px}button:hover{background:#424c5c}button:focus-visible,a:focus-visible{outline:2px solid #526f97;outline-offset:4px}button:disabled{cursor:not-allowed;opacity:.6}.note{font-size:12px;color:#858d99;margin-top:20px}.notice{font-size:13px;background:#f0f2f5;border:1px solid #e1e5eb;padding:12px 14px;margin:22px 0;border-radius:6px}.error{color:#944538;background:#fff5f2;border-color:#f1ded8}footer{padding:24px 40px;display:flex;justify-content:space-between;color:#8a929e;font-size:11px}a{color:#586d89} .back{display:block;text-align:center;margin:18px 0}@media(max-width:500px){header{padding:0 24px}footer{padding:24px;gap:16px;flex-wrap:wrap}h1{font-size:28px}}
</style></head><body><header><span class="brand">sf0</span><span class="business">SoftNest Fabric Care</span></header>
<main><section class="signin"><p class="eyebrow">Private workspace</p><h1>${signout ? 'Sign out of SF0?' : 'Welcome to SF0'}</h1>
<p class="intro">${signout ? 'End your session on this device.' : 'Sign in to your website and marketing workspace.'}</p>
${message ? `<p class="notice error" role="alert">${message}</p>` : ''}
<form id="auth-form" data-action="${signout ? 'signout' : 'signin/google'}">
<button type="submit" ${ready ? '' : 'disabled'}>${signout ? 'Sign out' : 'Continue with Google'}</button></form>
${!ready ? '<p class="notice">Google sign-in is not configured yet. Access remains locked until setup is complete.</p>' : ''}
<p id="auth-error" class="notice error" role="alert" hidden></p>
${signout ? '<a class="back" href="/">Return to workspace</a>' : '<p class="note">Access is limited to invited Google accounts. There is no public registration.</p>'}
</section></main><footer><span>SF0 · SoftNest</span><span>Website &amp; marketing workspace</span></footer><script src="/auth-ui.js" defer></script></body></html>`;
}

export const authScript = `document.querySelector('#auth-form').addEventListener('submit',async event=>{
event.preventDefault();const button=event.currentTarget.querySelector('button');button.disabled=true;
try{const response=await fetch('/auth/csrf',{credentials:'same-origin',cache:'no-store'});if(!response.ok)throw Error();
const {csrfToken}=await response.json();if(!csrfToken)throw Error();
const form=document.createElement('form');form.method='POST';form.action='/auth/'+event.target.dataset.action;
for(const [name,value] of Object.entries({csrfToken,callbackUrl:location.origin+'/'})){const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;form.append(input)}document.body.append(form);form.submit();
}catch{button.disabled=false;const message=document.querySelector('#auth-error');message.hidden=false;message.textContent='Unable to start sign-in. Please try again.';}});`;
