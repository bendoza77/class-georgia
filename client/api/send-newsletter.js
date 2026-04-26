const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL || 'Class Georgia <onboarding@resend.dev>'
const NOTIFY_TO = process.env.CONTACT_EMAIL || 'info@classgeorgia.com'

function welcomeHtml(email) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:48px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

  <!-- Logo bar -->
  <tr><td style="background:#111;border:1px solid #222;border-bottom:none;padding:32px 40px 28px;text-align:center;">
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.35em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">Class Georgia</p>
    <p style="margin:0;font-size:11px;letter-spacing:0.12em;color:#4a4440;font-family:Arial,sans-serif;text-transform:uppercase;">Luxury Travel · Est. Tbilisi</p>
  </td></tr>

  <!-- Gold line -->
  <tr><td style="background:linear-gradient(90deg,#1a1400,#c9973a,#1a1400);height:1px;border-left:1px solid #222;border-right:1px solid #222;"></td></tr>

  <!-- Hero -->
  <tr><td style="background:#111;border-left:1px solid #222;border-right:1px solid #222;padding:48px 40px 36px;text-align:center;">
    <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.2em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">Welcome to the Circle</p>
    <h1 style="margin:0 0 20px;font-size:32px;font-weight:400;color:#f0ebe2;letter-spacing:0.03em;line-height:1.25;">The Caucasus,<br>Exclusively Yours</h1>
    <p style="margin:0;font-size:14px;color:#7a7068;line-height:1.8;max-width:400px;margin:0 auto;">
      You have joined an exclusive circle of travellers who discover Georgia beyond the surface — its ancient monasteries, wild mountain passes, and hidden wine cellars.
    </p>
  </td></tr>

  <!-- Destinations preview -->
  <tr><td style="background:#111;border-left:1px solid #222;border-right:1px solid #222;padding:0 40px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #1e1e1e;">
      <tr><td style="background:#161616;padding:14px 24px;border-bottom:1px solid #222;">
        <p style="margin:0;font-size:10px;letter-spacing:0.2em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">What Awaits You</p>
      </td></tr>
      ${[
        ['Tbilisi', 'Discover the ancient capital where East meets West.'],
        ['Kazbegi', 'Hike through dramatic mountain landscapes at 5,000m.'],
        ['Kakheti', 'Taste 8,000 years of winemaking tradition.'],
        ['Svaneti', 'Explore UNESCO-listed towers lost in the high Caucasus.'],
      ].map(([place, desc], i, arr) => `
      <tr>
        <td style="padding:16px 24px;${i < arr.length - 1 ? 'border-bottom:1px solid #1a1a1a;' : ''}">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="100" valign="top">
              <p style="margin:0;font-size:13px;color:#c9973a;font-family:Georgia,serif;">${place}</p>
            </td>
            <td valign="top" style="font-size:13px;color:#6a6258;line-height:1.5;">${desc}</td>
          </tr></table>
        </td>
      </tr>`).join('')}
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="background:#111;border-left:1px solid #222;border-right:1px solid #222;padding:0 40px 44px;text-align:center;">
    <a href="https://classgeorgia.com/tours" style="display:inline-block;padding:14px 36px;background:transparent;border:1px solid #c9973a;color:#c9973a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;font-family:Arial,sans-serif;">
      Explore Our Tours
    </a>
  </td></tr>

  <!-- Gold line -->
  <tr><td style="background:linear-gradient(90deg,#1a1400,#c9973a,#1a1400);height:1px;border-left:1px solid #222;border-right:1px solid #222;"></td></tr>

  <!-- Footer -->
  <tr><td style="background:#0d0d0d;border:1px solid #222;border-top:none;padding:24px 40px;text-align:center;">
    <p style="margin:0 0 6px;font-size:11px;color:#3a3830;font-family:Arial,sans-serif;">Class Georgia &nbsp;·&nbsp; 12 Rustaveli Avenue, Tbilisi 0108, Georgia</p>
    <p style="margin:0;font-size:11px;font-family:Arial,sans-serif;">
      <a href="mailto:info@classgeorgia.com" style="color:#4a4840;text-decoration:none;">info@classgeorgia.com</a>
      &nbsp;·&nbsp;
      <a href="tel:+995322000000" style="color:#4a4840;text-decoration:none;">+995 32 200 0000</a>
    </p>
    <p style="margin:12px 0 0;font-size:10px;color:#2a2820;font-family:Arial,sans-serif;">
      You subscribed with ${email}. To unsubscribe, reply with "unsubscribe" in the subject.
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const [welcome, notify] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: [email],
      bcc: [NOTIFY_TO],
      replyTo: NOTIFY_TO,
      subject: 'Welcome to Class Georgia — The Caucasus, Exclusively Yours',
      html: welcomeHtml(email),
    }),
    resend.emails.send({
      from: FROM,
      to: [NOTIFY_TO],
      subject: `Newsletter Signup: ${email}`,
      html: `<p style="font-family:Arial;font-size:14px;color:#333;">New newsletter subscriber: <strong>${email}</strong></p>`,
    }),
  ])

  if (notify.status === 'rejected') {
    console.error('[send-newsletter] admin notify failed:', notify.reason)
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' })
  }

  if (welcome.status === 'rejected') {
    console.error('[send-newsletter] welcome email failed:', welcome.reason)
  }

  return res.status(200).json({ success: true })
}
