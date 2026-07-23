export const bookingConfirmationTemplate = ({
    name,
    eventName,
    bookingId,
    date,
    time,
    venue,
    amount,
    download_url
}) => {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Booking Confirmation</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<!-- Header -->
<tr>
<td align="center" style="background:#4F46E5;padding:40px;color:white;">
<h1 style="margin:0;font-size:32px;">🎉 Booking Confirmed</h1>
<p style="margin-top:10px;font-size:16px;">
Your booking has been successfully confirmed.
</p>
</td>
</tr>

<!-- Greeting -->
<tr>
<td style="padding:35px;">

<h2 style="color:#22c55e;margin-top:0;">
Hello ${name},
</h2>

<p style="font-size:15px;line-height:24px;color:#555;">
Thank you for booking with us.
Your reservation has been confirmed successfully.
Please find your booking details below.
</p>

</td>
</tr>

<!-- Booking Details -->
<tr>
<td style="padding:0 35px 30px;">

<table width="100%" cellpadding="10" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;">

<tr style="background:#f8f8ff;">
<td colspan="2" style="font-weight:bold;color:#4F46E5;">
Booking Details
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
<td>${date}</td>
</tr>

<tr>
<td><strong>Time</strong></td>
<td>${time}</td>
</tr>

<tr>
<td><strong>Venue</strong></td>
<td>${venue}</td>
</tr>


<tr>
<td><strong>Amount Paid</strong></td>
<td>₹${amount}</td>
</tr>

<tr>
<td><strong>Status</strong></td>
<td style="color:#16a34a;font-weight:bold;">
Paid
</td>
</tr>

</table>

</td>
</tr>

<!-- Ticket -->
<tr>
<td style="padding:0 35px 30px;">

<table width="100%" cellpadding="20" cellspacing="0" style="background:#f9fafb;border:2px dashed #d1d5db;border-radius:10px;text-align:center;">

<tr>
<td>

<h3 style="margin:0;color:#4F46E5;">
Entry Code
</h3>

<p style="color:#555;">
Please show this booking code during check-in.
</p>

</td>
</tr>

</table>

</td>
</tr>

<!-- Button -->
<tr>
<td align="center" style="padding-bottom:35px;">

<a href=${download_url}
style="
background:#4F46E5;
color:#ffffff;
padding:15px 35px;
text-decoration:none;
border-radius:6px;
font-weight:bold;
display:inline-block;
">
View Booking
</a>

</td>
</tr>

<!-- Important Note -->
<tr>
<td style="padding:0 35px 35px;">

<table width="100%" cellpadding="15" cellspacing="0"
style="background:#fff8e7;border-left:5px solid #f59e0b;">

<tr>
<td>

<strong>Important Information</strong>

<ul style="padding-left:20px;color:#555;line-height:24px;">

<li>Please arrive 30 minutes before the event.</li>

<li>Carry a valid ID proof.</li>

<li>Keep this email for future reference.</li>

</ul>

</td>
</tr>

</table>

</td>
</tr>

<!-- Footer -->
<tr>

<td align="center"
style="background:#f8f8f8;padding:30px;">

<h3 style="margin:0;color:#333;">
EventHub
</h3>

<p style="color:#777;margin:10px 0;">
Thank you for booking with us.
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