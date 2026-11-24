// Self-service page for invited guests: they open the private guest link, enter their details
// and RSVP, then land on their personal invitation page. Styled to match the invitation.

import { escapeHtml, CONTACT_EMAIL, CONTACT_PHONE } from './email.js';
import { EVENT } from './invitation.js';

const SITE_URL = (process.env.SITE_URL || 'https://ibbplus.com').replace(/\/$/, '');

const shell = (title, body, { preview = false } = {}) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#090807">
<title>${escapeHtml(title)}</title>
${preview ? `<meta property="og:type" content="website">
<meta property="og:title" content="You are invited: ${EVENT.name}, ${EVENT.theme}">
<meta property="og:description" content="${EVENT.date}, ${EVENT.time}, ${EVENT.venue}. Confirm your attendance and receive your personal invitation.">
<meta property="og:image" content="${SITE_URL}/og-award.jpg">
<meta property="og:site_name" content="IBB+ | Impact Business Breakfast Tanzania">
<meta name="twitter:card" content="summary_large_image">` : ''}
<style>
*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#080807;color:#f5efe4;font-family:Georgia,'Times New Roman',serif}
body{background:radial-gradient(ellipse at 50% 5%,#30201a 0,#100d0b 38%,#070706 78%)}
.shell{min-height:100svh;display:grid;place-items:center;padding:28px 16px;position:relative}
.shell:before{content:"";position:fixed;inset:12px;border:1px solid rgba(200,166,106,.55);pointer-events:none}
.stage{width:min(100%,540px);text-align:center}
.brand{width:96px;height:84px;object-fit:contain;display:block;margin:0 auto 16px}
.eyebrow{font:10px/1.6 Arial,sans-serif;letter-spacing:.42em;text-transform:uppercase;color:#f0d9a5}
h1{font-size:clamp(30px,7vw,46px);font-weight:400;letter-spacing:.12em;line-height:1.1;margin:10px 0 6px;text-transform:uppercase}
.sub{font:11px Arial,sans-serif;letter-spacing:.28em;color:#c8bda9;text-transform:uppercase;margin-bottom:26px}
.card{background:linear-gradient(145deg,#f5efe3,#e8dcc6);color:#211a14;padding:clamp(22px,6vw,38px);position:relative;text-align:left;box-shadow:0 25px 80px #0009}
.card:before{content:"";position:absolute;inset:10px;border:1px solid #b18a50;pointer-events:none}
.lead{font:13px/1.8 Arial,sans-serif;color:#5c5144;margin:0 0 18px;text-align:center}
.details{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;border-top:1px solid #c7b18d;border-bottom:1px solid #c7b18d;padding:14px 0;margin:0 0 22px;text-align:center}
.details b{display:block;font:9px Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#8c6837;margin-bottom:6px}.details span{font-size:13px}
label{display:block;font:bold 10px Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#5c4529;margin:0 0 6px}
label i{font-style:normal;font-weight:400;letter-spacing:.05em;text-transform:none;color:#8a7c69}
.f{margin-bottom:16px;position:relative}
input[type=text],input[type=email],input[type=tel]{width:100%;padding:12px 12px;border:1px solid #b9a07a;background:#fffaf1;color:#17120e;font:15px Arial,sans-serif;border-radius:0}
input:focus{outline:2px solid #8b6838;outline-offset:1px}
.err{font:12px Arial,sans-serif;color:#a1261b;margin-top:5px}.bad input{border-color:#a1261b}
fieldset{border:0;padding:0;margin:6px 0 18px}legend{font:bold 10px Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#5c4529;margin-bottom:8px;padding:0}
.choice{display:flex;gap:10px;flex-wrap:wrap}.choice label{flex:1 1 180px;margin:0;display:flex;align-items:center;gap:10px;padding:13px 14px;border:1px solid #b9a07a;background:#fffaf1;cursor:pointer;font:14px Arial,sans-serif;letter-spacing:0;text-transform:none;color:#17120e}
.choice input{accent-color:#17120e;width:18px;height:18px;margin:0}.choice label:has(input:checked){border-color:#17120e;box-shadow:inset 0 0 0 1px #17120e}
button{width:100%;cursor:pointer;padding:15px 18px;border:1px solid #17120e;background:#17120e;color:#f0d9a5;font:bold 11px Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase}
button:hover{background:#2b211a}.note{font:12px/1.7 Arial,sans-serif;color:#6c604f;text-align:center;margin:14px 0 0}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.alert{font:13px/1.6 Arial,sans-serif;background:#f6e0d9;border:1px solid #c98b7e;color:#7a1f14;padding:10px 12px;margin-bottom:16px}
.foot{font:10px Arial,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#857967;margin-top:22px}
.foot a{color:#c8bda9}
@media(max-width:420px){.details span{font-size:11px}}
</style></head><body><main class="shell"><section class="stage">
<img class="brand" src="/iba-logo.png" alt="Impact Business Awards">
<div class="eyebrow">You are invited to</div><h1>${EVENT.theme}</h1><div class="sub">${EVENT.name}</div>
${body}
<div class="foot">${EVENT.motto}</div>
</section></main></body></html>`;

/** The guest details + RSVP form. `values` and `errors` are used when re-showing it after a mistake. */
export function guestFormPage({ action, values = {}, errors = {}, message = '' }) {
  const v = (k) => escapeHtml(values[k] || '');
  const field = (name, label, type, { optional = false, autocomplete = '' } = {}) => `
    <div class="f${errors[name] ? ' bad' : ''}"><label for="${name}">${label}${optional ? ' <i>(optional)</i>' : ''}</label>
    <input id="${name}" name="${name}" type="${type}" value="${v(name)}"${optional ? '' : ' required'}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}>
    ${errors[name] ? `<div class="err">${escapeHtml(errors[name])}</div>` : ''}</div>`;
  const checked = (x) => (values.response === x ? ' checked' : '');
  const body = `<form class="card" method="post" action="${escapeHtml(action)}" novalidate>
  <p class="lead">${EVENT.description}</p>
  <div class="details"><div><b>Date</b><span>${EVENT.date}</span></div><div><b>Time</b><span>${EVENT.time}</span></div><div><b>Venue</b><span>${EVENT.venue}</span></div></div>
  ${message ? `<div class="alert" role="alert">${escapeHtml(message)}</div>` : ''}
  ${field('fullName', 'Full name', 'text', { autocomplete: 'name' })}
  ${field('email', 'Email', 'email', { autocomplete: 'email' })}
  ${field('phone', 'Phone', 'tel', { autocomplete: 'tel' })}
  ${field('organisation', 'Organisation', 'text', { optional: true, autocomplete: 'organization' })}
  ${field('jobTitle', 'Job title', 'text', { optional: true, autocomplete: 'organization-title' })}
  <div class="hp" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
  <fieldset${errors.response ? ' class="bad"' : ''}><legend>Kindly RSVP</legend>
    <div class="choice">
      <label><input type="radio" name="response" value="attending" required${checked('attending')}>Yes, I will attend</label>
      <label><input type="radio" name="response" value="declined"${checked('declined')}>Sorry, I can’t attend</label>
    </div>
    ${errors.response ? `<div class="err">${escapeHtml(errors.response)}</div>` : ''}
  </fieldset>
  <button type="submit">Send my RSVP</button>
  <p class="note">Your personal invitation and entry pass will open next and be emailed to you.</p>
</form>`;
  return shell(`RSVP | ${EVENT.name}`, body, { preview: true });
}

/** Shown when the guest link is wrong or switched off. */
export const guestLinkInactivePage = () => shell(`${EVENT.name}`, `<div class="card"><p class="lead" style="margin:0">This guest link is not active. Please contact us at <a href="mailto:${CONTACT_EMAIL}" style="color:#8b6838">${CONTACT_EMAIL}</a> or ${CONTACT_PHONE}.</p></div>`);

/** Shown when the email is already on the guest list. The invitation is re-sent to that address only. */
export const guestAlreadyListedPage = (email) => shell(`${EVENT.name}`, `<div class="card"><p class="lead" style="margin:0">You are already on our guest list. We have emailed your personal invitation again to <strong>${escapeHtml(email)}</strong>. Open it to view your entry pass or change your RSVP.</p><p class="note">Need help? <a href="mailto:${CONTACT_EMAIL}" style="color:#8b6838">${CONTACT_EMAIL}</a> or ${CONTACT_PHONE}</p></div>`);
