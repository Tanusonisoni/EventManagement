export const bookingCancellationTemplate = ({
  name,
  eventName,
  bookingId,
  eventDate,
  eventTime,
  location,
  refundAmount,
  refundStatus,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Booking Cancelled</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<!-- Header -->
<tr>
<td align="center" style="background:#DC2626;padding:40px;color:#ffffff;">
<h1 style="margin:0;font-size:30px;">❌ Booking Cancelled</h1>
<p style="margin-top:10px;font-size:16px;">
Your event booking has been cancelled successfully.
</p>
</td>
</tr>

<!-- Greeting -->
<tr>
<td style="padding:35px;">

<h2 style="margin-top:0;color:#DC2626;">
Hello ${name},
</h2>

<p style="font-size:15px;line-height:24px;color:#555;">
We're confirming that your booking has been cancelled successfully.
If this cancellation wasn't requested by you, please contact our support team immediately.
</p>

</td>
</tr>

<!-- Booking Details -->
<tr>
<td style="padding:0 35px 30px;">

<table width="100%" cellpadding="10" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;">

<tr style="background:#FEF2F2;">
<td colspan="2" style="font-weight:bold;color:#DC2626;">
Cancelled Booking Details
</td>
</tr>

<tr>
<td><strong>Booking ID</strong></td>
<td>${bookingId}</td>
</tr>

<tr>
<td><strong>Event</strong></td>
<td>${eventName}</td>
</tr>

<tr>
<td><strong>Date</strong></td>
<td>${eventDate}</td>
</tr>

<tr>
<td><strong>Time</strong></td>
<td>${eventTime}</td>
</tr>

<tr>
<td><strong>Venue</strong></td>
<td>${location}</td>
</tr>

</table>

</td>
</tr>

<!-- Refund Section -->
<tr>
<td style="padding:0 35px 30px;">

<table width="100%" cellpadding="18" cellspacing="0" style="background:#F8FAFC;border:1px solid #E5E7EB;border-radius:10px;">

<tr>
<td>

<h3 style="margin-top:0;color:#2563EB;">
💳 Refund Details
</h3>

<p style="margin:8px 0;">
<strong>Refund Amount:</strong> ₹${refundAmount}
</p>

<p style="margin:8px 0;">
<strong>Status:</strong>
<span style="color:#16A34A;font-weight:bold;">
${refundStatus}
</span>
</p>

</td>
</tr>

</table>

</td>
</tr>

<!-- CTA -->
<tr>
<td align="center" style="padding-bottom:35px;">

<a href="https://yourwebsite.com/events"
style="
background:#2563EB;
color:#ffffff;
padding:14px 35px;
text-decoration:none;
border-radius:6px;
font-weight:bold;
display:inline-block;
">
Browse More Events
</a>

</td>
</tr>

<!-- Important Information -->
<tr>
<td style="padding:0 35px 35px;">

<table width="100%" cellpadding="15" cellspacing="0"
style="background:#FFF8E7;border-left:5px solid #F59E0B;">

<tr>
<td>

<strong>Important Information</strong>

<ul style="padding-left:20px;color:#555;line-height:24px;margin:10px 0;">

<li>Your booking is no longer valid for event entry.</li>

<li>Refunds (if applicable) will be processed according to our cancellation policy.</li>

<li>If you have any questions, please contact our support team.</li>

</ul>

</td>
</tr>

</table>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center" style="background:#F9FAFB;padding:30px;">

<h3 style="margin:0;color:#333;">
EventHub
</h3>

<p style="margin:12px 0;color:#666;">
Thank you for choosing us. We hope to see you again at another event.
</p>

<p style="font-size:12px;color:#999;">
© 2026 EventHub. All Rights Reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};