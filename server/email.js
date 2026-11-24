// Registration confirmation emails, sent through Resend (https://resend.com).
// Configure RESEND_API_KEY and EMAIL_FROM in .env. The sender domain must be verified in Resend.

const RESEND_URL = 'https://api.resend.com/emails';
const TIME_ZONE = 'Africa/Dar_es_Salaam';
const PAYMENT_DAYS = 3;

export const PAYMENT_ACCOUNT_NAME = 'Impact Advisory (T) Ltd';
export const PAYBILLS = [
  { network: 'M-Pesa', number: '5754692' },
  { network: 'Mixx by Yas', number: '43942130' },
];
const AMOUNT_BY_TYPE = { 'Individual': 'Tsh 150,000', 'Corporate Table': 'Tsh 2,000,000' };

const CONTACT_EMAIL = 'ibb@impactadvisory.co.tz';
const CONTACT_PHONE = '+255 748 111 183';
const SITE_URL = 'https://ibbplus.com';

export const reference = (reg) => reg.reference || `IBA-${reg.ref_no ?? reg.id}`;

const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/** Calendar date (y, m, d) of an instant in Tanzania time. */
function tzDate(instant) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, year: 'numeric', month: 'numeric', day: 'numeric' })
      .formatToParts(instant).map((p) => [p.type, p.value]),
  );
  return { y: Number(parts.year), m: Number(parts.month), d: Number(parts.day) };
}

/** The date `days` working days (Mon–Fri) after the registration date, in Tanzania time. */
export function paymentDeadline(registeredAt, days = PAYMENT_DAYS) {
  const { y, m, d } = tzDate(registeredAt);
  const date = new Date(Date.UTC(y, m - 1, d, 12)); // midday UTC avoids any date rollover
  let added = 0;
  while (added < days) {
    date.setUTCDate(date.getUTCDate() + 1);
    const dow = date.getUTCDay();
    if (dow !== 0 && dow !== 6) added += 1;
  }
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    .format(date);
}

export function buildConfirmationEmail(reg) {
  const firstName = reg.full_name.split(/\s+/)[0];
  const ref = reference(reg);
  const amount = reg.amount || AMOUNT_BY_TYPE[reg.registration_type] || '';
  const method = reg.payment_method || 'Mobile Money (Pay Bill)';
  const deadline = paymentDeadline(new Date(reg.created_at || Date.now()));
  const subject = `Your Impact Business Awards 2026 registration (${ref})`;

  const summary = [
    ['Reference', ref],
    ['Name', reg.full_name],
    ['Organisation', reg.organisation],
    ['Registration type', reg.registration_type === 'Corporate Table' ? 'Corporate table' : reg.registration_type],
    ['Amount due', amount],
    ['Payment method', method],
    ['Pay by', deadline],
  ];

  const navy = '#012557';
  const gold = '#c9a227';
  const ink = '#141a26';
  const muted = '#5b6472';
  const line = '#e4dfd3';

  const summaryRows = summary.map(([k, v], i) => `
              <tr>
                <td style="padding:12px 16px;font-size:14px;color:${muted};border-top:${i ? `1px solid ${line}` : '0'};width:42%;">${escapeHtml(k)}</td>
                <td style="padding:12px 16px;font-size:14px;color:${ink};font-weight:600;border-top:${i ? `1px solid ${line}` : '0'};">${escapeHtml(v)}</td>
              </tr>`).join('');

  const paybillRows = PAYBILLS.map((p) => `
                    <tr>
                      <td style="padding:10px 0;font-size:14px;color:${ink};border-top:1px solid ${line};">${escapeHtml(p.network)} Pay Bill</td>
                      <td align="right" style="padding:10px 0;font-size:20px;letter-spacing:0.5px;color:${navy};font-weight:700;border-top:1px solid ${line};font-family:Helvetica,Arial,sans-serif;font-variant-numeric:tabular-nums;">${escapeHtml(p.number)}</td>
                    </tr>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f8f6f1;font-family:Helvetica,Arial,sans-serif;color:${ink};">
  <div style="display:none;max-height:0;overflow:hidden;">Thank you for registering. Please complete your payment of ${escapeHtml(amount)} by ${escapeHtml(deadline)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f1;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${line};">
          <tr>
            <td style="background:${navy};padding:28px 32px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">IBB<span style="color:${gold};">+</span></div>
              <div style="margin-top:6px;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#e7cf7a;">Impact Business Awards 2026</div>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 8px;">
              <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.3;font-weight:700;color:${navy};">Thank you for registering, ${escapeHtml(firstName)}</h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Dear ${escapeHtml(reg.full_name)},</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Thank you for registering for the <strong>Impact Business Awards 2026</strong>. We are delighted that you will join business leaders from across Tanzania as we recognise the organisations and people whose work is creating lasting impact in our economy and communities.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;">Your registration has been received. The details you submitted are below.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${line};background:#fcfbf8;">${summaryRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px;">
              <h2 style="margin:0 0 12px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${gold};">Complete your payment</h2>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;">To confirm your place, please pay <strong>${escapeHtml(amount)}</strong> by <strong>${escapeHtml(method)}</strong> within <strong>three (3) working days</strong>, that is by <strong>${escapeHtml(deadline)}</strong>.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efebe2;border-left:4px solid ${gold};">
                <tr>
                  <td style="padding:20px 24px;">
                    <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${muted};">Business name</div>
                    <div style="margin:4px 0 14px;font-size:16px;font-weight:700;color:${ink};">${escapeHtml(PAYMENT_ACCOUNT_NAME)}</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${paybillRows}
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-size:15px;line-height:1.7;">Once you have paid, please reply to this email with your transaction confirmation message and your reference <strong>${escapeHtml(ref)}</strong>. Our team will confirm your registration.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 36px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">If you have any questions, contact us at <a href="mailto:${CONTACT_EMAIL}" style="color:${navy};font-weight:600;">${CONTACT_EMAIL}</a> or call <a href="tel:${CONTACT_PHONE.replace(/\s/g, '')}" style="color:${navy};font-weight:600;text-decoration:none;">${CONTACT_PHONE}</a>.</p>
              <p style="margin:0 0 4px;font-size:15px;line-height:1.7;">We look forward to welcoming you.</p>
              <p style="margin:16px 0 0;font-size:15px;line-height:1.6;">Warm regards,<br><strong>The IBB+ Team</strong><br><span style="color:${muted};">${escapeHtml(PAYMENT_ACCOUNT_NAME)}</span></p>
            </td>
          </tr>
          <tr>
            <td style="background:#011839;padding:20px 32px;font-size:12px;line-height:1.6;color:#aab4c8;">
              IBB+ Impact Business Breakfast &middot; Ideals Beyond Ideas<br>
              Dar es Salaam, Tanzania &middot; <a href="${SITE_URL}" style="color:#e7cf7a;text-decoration:none;">ibbplus.com</a><br>
              You are receiving this email because you registered for the Impact Business Awards 2026 at ibbplus.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Dear ${reg.full_name},`,
    '',
    'Thank you for registering for the Impact Business Awards 2026. We are delighted that you will join business leaders from across Tanzania as we recognise the organisations and people whose work is creating lasting impact in our economy and communities.',
    '',
    'YOUR REGISTRATION',
    ...summary.map(([k, v]) => `${k}: ${v}`),
    '',
    'COMPLETE YOUR PAYMENT',
    `To confirm your place, please pay ${amount} by ${method} within three (3) working days, that is by ${deadline}.`,
    '',
    `Business name: ${PAYMENT_ACCOUNT_NAME}`,
    ...PAYBILLS.map((p) => `${p.network} Pay Bill: ${p.number}`),
    '',
    `Once you have paid, please reply to this email with your transaction confirmation message and your reference ${ref}. Our team will confirm your registration.`,
    '',
    `Questions? ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
    '',
    'We look forward to welcoming you.',
    '',
    'Warm regards,',
    'The IBB+ Team',
    PAYMENT_ACCOUNT_NAME,
    SITE_URL,
  ].join('\n');

  return { subject, html, text };
}

/** Sends the confirmation email. Returns { ok, id?, error? }; never throws. */
export async function sendConfirmationEmail(reg, { idempotencyKey } = {}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return { ok: false, error: 'Email not configured' };
  const { subject, html, text } = buildConfirmationEmail(reg);
  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey || `iba-registration-${reg.id}`,
      },
      body: JSON.stringify({
        from,
        to: [reg.email],
        reply_to: process.env.EMAIL_REPLY_TO || CONTACT_EMAIL,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: `${res.status} ${body.message || res.statusText}` };
    return { ok: true, id: body.id };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
