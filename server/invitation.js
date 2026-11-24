// Invitation for paid registrants: a personal web page (the supplied design, with a real QR code)
// and an email-safe version of it that links to that page.

import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import QRCode from 'qrcode';
import { sendEmail, escapeHtml, reference, displayName, CONTACT_EMAIL, CONTACT_PHONE } from './email.js';

export const EVENT = {
  name: 'Impact Business Awards 2026',
  theme: 'The Legacy Code',
  date: '11 December 2026',
  time: '7:30 AM',
  venue: 'Hyatt Regency',
  statement: 'A legacy is not simply what we leave behind. It is what we build into the future.',
  description: 'Join us for an intimate breakfast gathering of leaders and changemakers exploring the people we shape, the institutions we strengthen and the future we build together.',
  motto: 'What we build must outlive us.',
};

const SITE_URL = (process.env.SITE_URL || 'https://ibbplus.com').replace(/\/$/, '');
const PAGE_TEMPLATE = readFileSync(new URL('./templates/invitation.html', import.meta.url), 'utf8');

export const newInviteToken = () => randomBytes(18).toString('base64url');
export const isInviteToken = (t) => typeof t === 'string' && /^[A-Za-z0-9_-]{20,40}$/.test(t);
export const inviteUrl = (token) => `${SITE_URL}/invite/${token}`;
const qrImageUrl = (token) => `${SITE_URL}/invite/${token}/qr.png`;

const admits = (reg) => (reg.registration_type === 'Corporate Table' ? 'a corporate table' : 'one guest');

/** QR code for the guest's entry pass. It encodes their personal invitation link. */
export const qrSvg = (token) => QRCode.toString(inviteUrl(token), {
  type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#17120e', light: '#ffffff' },
});
export const qrPng = (token) => QRCode.toBuffer(inviteUrl(token), {
  type: 'png', width: 360, margin: 2, errorCorrectionLevel: 'M', color: { dark: '#17120e', light: '#ffffff' },
});

const RSVP_STATE = {
  attending: 'Thank you. <strong>You have confirmed that you will attend.</strong> We look forward to welcoming you.',
  declined: 'Thank you for letting us know. <strong>You have said you cannot attend.</strong> If your plans change, you can update your reply here.',
  none: `Please let us know whether you will join us on ${EVENT.date}.`,
};
/** The RSVP section of the invitation page. A plain form, enhanced by the page script. */
function rsvpBlock(reg) {
  const status = reg.rsvp_status === 'attending' || reg.rsvp_status === 'declined' ? reg.rsvp_status : null;
  const btn = (value, label, primary) => `<button class="rsvp-btn${!status && primary ? ' primary' : ''}" type="submit" name="response" value="${value}" aria-pressed="${status === value}">${label}</button>`;
  return `<section class="rsvp" id="rsvp" aria-labelledby="rsvp-title"><b class="rsvp-title" id="rsvp-title">Kindly RSVP</b>`
    + `<p class="rsvp-state" id="rsvp-state" aria-live="polite">${RSVP_STATE[status || 'none']}</p>`
    + `<form class="rsvp-actions" id="rsvp-form" method="post" action="/invite/${encodeURIComponent(reg.invite_token)}/rsvp">`
    + btn('attending', 'Yes, I will attend', true) + btn('declined', 'Sorry, I can\u2019t attend', false)
    + `</form></section>`;
}

export async function buildInvitationPage(reg) {
  const values = {
    GUEST_NAME: escapeHtml(displayName(reg.full_name)),
    REFERENCE: escapeHtml(reference(reg)),
    ADMITS: escapeHtml(admits(reg)),
    QR_SVG: await qrSvg(reg.invite_token),
    RSVP: rsvpBlock(reg),
  };
  return PAGE_TEMPLATE.replace(/\{\{([A-Z_]+)\}\}/g, (m, key) => values[key] ?? m);
}

/** Shown for a link that is unknown, or whose registration is not (or no longer) marked paid. */
export const inactiveInvitationPage = () => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>IBA 2026 | Invitation</title></head>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0908;color:#f5efe4;font-family:Georgia,serif;text-align:center;padding:24px">
<div><img src="/iba-logo.png" alt="Impact Business Awards" width="106" height="88" style="display:block;margin:0 auto 20px">
<p style="font:11px Arial,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#f0d9a5">IBA 2026 · The Legacy Code</p>
<h1 style="font-weight:400;font-size:26px;margin:10px 0">This invitation is not active</h1>
<p style="font:14px/1.7 Arial,sans-serif;color:#c8bda9;max-width:380px;margin:0 auto">Please contact us at <a style="color:#f0d9a5" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or ${CONTACT_PHONE}.</p></div>
</body></html>`;

export function buildInvitationEmail(reg) {
  const ref = reference(reg);
  const url = inviteUrl(reg.invite_token);
  const subject = `Your invitation: ${EVENT.name}, ${EVENT.theme} (${ref})`;
  const gold = '#c8a66a';
  const goldDeep = '#8b6838';
  const cream = '#f5efe3';
  const ink = '#17120e';
  const muted = '#5c5144';
  const line = '#c7b18d';
  const firstName = displayName(reg.full_name).split(/\s+/)[0];
  const guest = Boolean(reg.complimentary);
  const detail = (label, value) => `
                      <td width="33%" align="center" valign="top" style="padding:14px 4px;">
                        <div style="font:bold 9px Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;color:${goldDeep};">${label}</div>
                        <div style="margin-top:6px;font:15px Georgia,'Times New Roman',serif;color:${ink};">${escapeHtml(value)}</div>
                      </td>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#0b0908;">
  <div style="display:none;max-height:0;overflow:hidden;">${guest ? 'You are invited.' : 'Your place is confirmed.'} ${EVENT.date}, ${EVENT.time}, ${EVENT.venue}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0908;">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border:1px solid ${gold};">
          <tr>
            <td align="center" style="background:#080807;padding:34px 24px 26px;">
              <img src="${SITE_URL}/iba-logo.png" width="106" height="88" alt="Impact Business Awards" style="display:block;margin:0 auto 16px;border:0;">
              <div style="font:10px Arial,sans-serif;letter-spacing:4px;text-transform:uppercase;color:#f0d9a5;">An invitation to</div>
              <div style="margin:10px 0 6px;font:32px Georgia,'Times New Roman',serif;letter-spacing:4px;text-transform:uppercase;color:#f5efe4;">${EVENT.theme}</div>
              <div style="font:11px Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#c8bda9;">IBA 2026</div>
            </td>
          </tr>
          <tr>
            <td style="background:${cream};padding:34px 30px 30px;color:${ink};font-family:Georgia,'Times New Roman',serif;">
              <p style="margin:0 0 14px;font:16px/1.7 Georgia,'Times New Roman',serif;">Dear ${escapeHtml(firstName)},</p>
              <p style="margin:0 0 14px;font:14px/1.75 Arial,sans-serif;color:${muted};">${guest
                ? `It is our pleasure to welcome you as our guest at the <strong style="color:${ink};">${EVENT.name}</strong>. Your place is reserved under reference <strong style="color:${ink};">${escapeHtml(ref)}</strong>.`
                : `Thank you. We have received your payment of <strong style="color:${ink};">${escapeHtml(reg.amount || '')}</strong> for reference <strong style="color:${ink};">${escapeHtml(ref)}</strong>, and your place at the <strong style="color:${ink};">${EVENT.name}</strong> is confirmed.`}</p>
              <p style="margin:0 0 22px;font:14px/1.75 Arial,sans-serif;color:${muted};">${guest ? 'We would be honoured by your presence.' : 'It is our pleasure to invite you.'} Please open your invitation below and <strong style="color:${ink};">let us know whether you will attend</strong>.</p>
              <div style="height:1px;width:74px;background:#ad854a;margin:0 auto 22px;"></div>
              <p align="center" style="margin:0 auto 18px;max-width:420px;font:italic 20px/1.5 Georgia,'Times New Roman',serif;color:${ink};text-align:center;">&ldquo;${EVENT.statement}&rdquo;</p>
              <p align="center" style="margin:0 auto 22px;max-width:420px;font:13px/1.8 Arial,sans-serif;color:${muted};text-align:center;">${EVENT.description}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${line};border-bottom:1px solid ${line};">
                <tr>${detail('Date', EVENT.date)}${detail('Time', EVENT.time)}${detail('Venue', EVENT.venue)}
                </tr>
              </table>
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin:26px auto 8px;">
                <tr>
                  <td valign="middle" style="padding-right:16px;">
                    <img src="${qrImageUrl(reg.invite_token)}" width="120" height="120" alt="Your entry pass QR code" style="display:block;border:1px solid #b18a50;background:#ffffff;">
                  </td>
                  <td valign="middle" style="max-width:220px;">
                    <div style="font:bold 10px Arial,sans-serif;letter-spacing:2px;color:#75552b;">YOUR ENTRY PASS</div>
                    <div style="margin-top:6px;font:12px/1.6 Arial,sans-serif;color:#665a4c;">Present this code at the entrance. Admits ${escapeHtml(admits(reg))}.<br>Reference ${escapeHtml(ref)}</div>
                  </td>
                </tr>
              </table>
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin:26px auto 4px;">
                <tr>
                  <td align="center" style="background:#17120e;border:1px solid ${gold};">
                    <a href="${url}" style="display:inline-block;padding:14px 26px;font:bold 11px Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#f0d9a5;text-decoration:none;">Open invitation &amp; RSVP</a>
                  </td>
                </tr>
              </table>
              <p align="center" style="margin:22px 0 0;font:12px/1.7 Arial,sans-serif;color:${muted};text-align:center;">Questions? <a href="mailto:${CONTACT_EMAIL}" style="color:${goldDeep};">${CONTACT_EMAIL}</a> or ${CONTACT_PHONE}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="background:#080807;padding:20px 24px;font:10px Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#857967;">
              ${EVENT.motto}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Dear ${firstName},`,
    '',
    guest
      ? `It is our pleasure to welcome you as our guest at the ${EVENT.name}. Your place is reserved under reference ${ref}. We would be honoured by your presence. Please open your invitation and let us know whether you will attend.`
      : `Thank you. We have received your payment of ${reg.amount || ''} for reference ${ref}, and your place at the ${EVENT.name} is confirmed. It is our pleasure to invite you. Please open your invitation and let us know whether you will attend.`,
    '',
    `${EVENT.theme.toUpperCase()} · IBA 2026`,
    `"${EVENT.statement}"`,
    '',
    EVENT.description,
    '',
    `Date: ${EVENT.date}`,
    `Time: ${EVENT.time}`,
    `Venue: ${EVENT.venue}`,
    '',
    `Your invitation, RSVP and entry pass: ${url}`,
    `Present the QR code at the entrance. Admits ${admits(reg)}. Reference ${ref}.`,
    '',
    `Questions? ${CONTACT_EMAIL} or ${CONTACT_PHONE}`,
    '',
    EVENT.motto.toUpperCase(),
  ].join('\n');

  return { subject, html, text };
}

export async function sendInvitationEmail(reg, { idempotencyKey } = {}) {
  const { subject, html, text } = buildInvitationEmail(reg);
  return sendEmail({ to: reg.email, subject, html, text, idempotencyKey: idempotencyKey || `iba-invitation-${reg.id}-${Date.now()}` });
}
