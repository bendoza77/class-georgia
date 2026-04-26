require('dotenv').config()

const express = require('express')
const { Resend } = require('resend')

const app = express()
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL || 'Class Georgia <onboarding@resend.dev>'
const NOTIFY_TO = process.env.CONTACT_EMAIL || 'info@classgeorgia.com'

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function confirmationHtml({ name, tour, date, guests, phone, message }) {
  const rows = [
    ['Tour', tour],
    ['Departure', formatDate(date)],
    ['Guests', `${guests} ${guests === '1' ? 'guest' : 'guests'}`],
    phone ? ['Phone', phone] : null,
    message ? ['Special Requests', message] : null,
  ].filter(Boolean)

  const rowsHtml = rows.map(([label, value], i) => `
    <tr>
      <td style="padding:14px 24px;${i < rows.length - 1 ? 'border-bottom:1px solid #1d1d1d;' : ''}">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td width="130" valign="top" style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#5a5448;font-family:Arial,sans-serif;padding-top:2px;">${label}</td>
          <td valign="top" style="font-size:14px;color:#d0c8bc;line-height:1.5;">${value}</td>
        </tr></table>
      </td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:48px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">
  <tr><td style="background:#111;border:1px solid #222;border-bottom:none;padding:32px 40px 28px;text-align:center;">
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.35em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">Class Georgia</p>
    <p style="margin:0;font-size:11px;letter-spacing:0.12em;color:#4a4440;font-family:Arial,sans-serif;text-transform:uppercase;">Luxury Travel · Est. Tbilisi</p>
  </td></tr>
  <tr><td style="background:linear-gradient(90deg,#1a1400,#c9973a,#1a1400);height:1px;border-left:1px solid #222;border-right:1px solid #222;"></td></tr>
  <tr><td style="background:#111;border-left:1px solid #222;border-right:1px solid #222;padding:40px 40px 32px;text-align:center;">
    <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.2em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">Booking Request Received</p>
    <h1 style="margin:0;font-size:30px;font-weight:400;color:#f0ebe2;letter-spacing:0.03em;line-height:1.2;">Your Journey Awaits</h1>
  </td></tr>
  <tr><td style="background:#111;border-left:1px solid #222;border-right:1px solid #222;padding:0 40px 36px;">
    <p style="margin:0 0 20px;font-size:15px;color:#9a9088;line-height:1.7;">
      Dear <strong style="color:#e8e0d4;font-weight:normal;">${name}</strong>,
    </p>
    <p style="margin:0 0 32px;font-size:14px;color:#7a7068;line-height:1.8;">
      Thank you for choosing Class Georgia. We have received your enquiry and our travel specialists will be in touch within <span style="color:#c9973a;">24 hours</span> to confirm availability and tailor your experience.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #242424;margin-bottom:32px;">
      <tr><td style="background:#161616;padding:14px 24px;border-bottom:1px solid #222;">
        <p style="margin:0;font-size:10px;letter-spacing:0.2em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">Your Booking Summary</p>
      </td></tr>
      ${rowsHtml}
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-left:2px solid #c9973a;padding-left:20px;margin-bottom:32px;">
      <tr><td>
        <p style="margin:0 0 14px;font-size:10px;letter-spacing:0.2em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">What Happens Next</p>
        <p style="margin:0 0 8px;font-size:13px;color:#7a7068;line-height:1.6;">1 — Our specialist reviews your request and checks availability.</p>
        <p style="margin:0 0 8px;font-size:13px;color:#7a7068;line-height:1.6;">2 — We send a personalised itinerary and pricing breakdown.</p>
        <p style="margin:0;font-size:13px;color:#7a7068;line-height:1.6;">3 — A deposit secures your exclusive dates.</p>
      </td></tr>
    </table>
    <p style="margin:0;font-size:13px;color:#6a6258;line-height:1.7;">
      For urgent enquiries, call us at <a href="tel:+995322000000" style="color:#c9973a;text-decoration:none;">+995 32 200 0000</a> or simply reply to this email.
    </p>
  </td></tr>
  <tr><td style="background:linear-gradient(90deg,#1a1400,#c9973a,#1a1400);height:1px;border-left:1px solid #222;border-right:1px solid #222;"></td></tr>
  <tr><td style="background:#0d0d0d;border:1px solid #222;border-top:none;padding:24px 40px;text-align:center;">
    <p style="margin:0 0 6px;font-size:11px;color:#3a3830;font-family:Arial,sans-serif;">Class Georgia · 12 Rustaveli Avenue, Tbilisi 0108, Georgia</p>
    <p style="margin:0;font-size:11px;font-family:Arial,sans-serif;">
      <a href="mailto:info@classgeorgia.com" style="color:#4a4840;text-decoration:none;">info@classgeorgia.com</a>
      &nbsp;·&nbsp;
      <a href="tel:+995322000000" style="color:#4a4840;text-decoration:none;">+995 32 200 0000</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

function notificationHtml({ name, email, tour, date, guests, phone, message }) {
  const fields = [
    ['Client', name],
    ['Email', `<a href="mailto:${email}" style="color:#c9973a;">${email}</a>`],
    ['Phone', phone || '—'],
    ['Tour', tour],
    ['Date', formatDate(date)],
    ['Guests', guests],
    ['Special Requests', message || '—'],
  ]

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 20px;">
<tr><td align="center">
<table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;background:#fff;border-radius:3px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
  <tr><td style="background:#111;padding:24px 32px;">
    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;color:#c9973a;text-transform:uppercase;">New Booking Request</p>
    <h2 style="margin:0;font-size:18px;color:#f0ebe2;font-weight:400;">${tour}</h2>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    ${fields.map(([label, value], i) => `
      ${i > 0 ? '<hr style="border:none;border-top:1px solid #f0f0f0;margin:0 0 16px;">' : ''}
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td width="130" valign="top" style="font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;padding-right:16px;">${label}</td>
          <td style="font-size:14px;color:#1a1a1a;">${value}</td>
        </tr>
      </table>`).join('')}
  </td></tr>
  <tr><td style="background:#fafafa;border-top:1px solid #eee;padding:16px 32px;">
    <p style="margin:0;font-size:12px;color:#999;">Reply directly to this email to contact the client.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

function welcomeHtml(email) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:48px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">
  <tr><td style="background:#111;border:1px solid #222;border-bottom:none;padding:32px 40px 28px;text-align:center;">
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.35em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">Class Georgia</p>
    <p style="margin:0;font-size:11px;letter-spacing:0.12em;color:#4a4440;font-family:Arial,sans-serif;text-transform:uppercase;">Luxury Travel · Est. Tbilisi</p>
  </td></tr>
  <tr><td style="background:linear-gradient(90deg,#1a1400,#c9973a,#1a1400);height:1px;border-left:1px solid #222;border-right:1px solid #222;"></td></tr>
  <tr><td style="background:#111;border-left:1px solid #222;border-right:1px solid #222;padding:48px 40px 36px;text-align:center;">
    <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.2em;color:#c9973a;text-transform:uppercase;font-family:Arial,sans-serif;">Welcome to the Circle</p>
    <h1 style="margin:0 0 20px;font-size:32px;font-weight:400;color:#f0ebe2;letter-spacing:0.03em;line-height:1.25;">The Caucasus,<br>Exclusively Yours</h1>
    <p style="margin:0;font-size:14px;color:#7a7068;line-height:1.8;max-width:400px;margin:0 auto;">
      You have joined an exclusive circle of travellers who discover Georgia beyond the surface — its ancient monasteries, wild mountain passes, and hidden wine cellars.
    </p>
  </td></tr>
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
            <td width="100" valign="top"><p style="margin:0;font-size:13px;color:#c9973a;font-family:Georgia,serif;">${place}</p></td>
            <td valign="top" style="font-size:13px;color:#6a6258;line-height:1.5;">${desc}</td>
          </tr></table>
        </td>
      </tr>`).join('')}
    </table>
  </td></tr>
  <tr><td style="background:#111;border-left:1px solid #222;border-right:1px solid #222;padding:0 40px 44px;text-align:center;">
    <a href="https://classgeorgia.com/tours" style="display:inline-block;padding:14px 36px;background:transparent;border:1px solid #c9973a;color:#c9973a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;font-family:Arial,sans-serif;">
      Explore Our Tours
    </a>
  </td></tr>
  <tr><td style="background:linear-gradient(90deg,#1a1400,#c9973a,#1a1400);height:1px;border-left:1px solid #222;border-right:1px solid #222;"></td></tr>
  <tr><td style="background:#0d0d0d;border:1px solid #222;border-top:none;padding:24px 40px;text-align:center;">
    <p style="margin:0 0 6px;font-size:11px;color:#3a3830;font-family:Arial,sans-serif;">Class Georgia · 12 Rustaveli Avenue, Tbilisi 0108, Georgia</p>
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

// ─── Routes ─────────────────────────────────────────────────────────────────

app.post('/api/send-booking', async (req, res) => {
  const { name, email, tour, date, guests, phone, message } = req.body || {}

  if (!name || !email || !tour || !date) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const [confirmation, notification] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: [email],
      bcc: [NOTIFY_TO],
      replyTo: NOTIFY_TO,
      subject: `Your Class Georgia Booking — ${tour}`,
      html: confirmationHtml({ name, tour, date, guests, phone, message }),
    }),
    resend.emails.send({
      from: FROM,
      to: [NOTIFY_TO],
      replyTo: email,
      subject: `New Booking: ${tour} · ${formatDate(date)} · ${guests} guest${guests === '1' ? '' : 's'}`,
      html: notificationHtml({ name, email, tour, date, guests, phone, message }),
    }),
  ])

  if (notification.status === 'rejected') {
    console.error('[send-booking] admin notify failed:', notification.reason)
    return res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }

  if (confirmation.status === 'rejected') {
    console.error('[send-booking] user confirmation failed:', confirmation.reason)
  }

  return res.status(200).json({ success: true })
})

app.post('/api/send-newsletter', async (req, res) => {
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
})

// ─── Start ───────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
