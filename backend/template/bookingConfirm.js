export const bookingConfirmationTemplate = ({
    name,
    eventName,
    bookingId,
    date,
    time,
    venue,
    amount,
    download_url,
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

<tr>
<td align="center" style="background:#4F46E5;padding:40px;color:white;">
<h1 style="margin:0;font-size:32px;">🎉 Booking Confirmed</h1>
<p style="margin-top:10px;font-size:16px;">
Your booking has been successfully confirmed.
</p>
</td>
</tr>


<tr>
<td style="padding:35px;">

<h2 style="color:#22c55e;margin-top:0;">
Hello ${name},
</h2>

<p style="font-size:15px;line-height:24px;color:#555;">
Thank you for booking with us.
Your reservation has been confirmed successfully.
</p>

</td>
</tr>


<tr>
<td style="padding:0 35px 30px;">

<table width="100%" cellpadding="10" cellspacing="0" 
style="border:1px solid #e5e7eb;border-radius:8px;">

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

</table>

</td>
</tr>


<tr>
<td align="center" style="padding-bottom:35px;">

<a href="${download_url}"
target="_blank"
style="
background:#4F46E5;
color:white;
padding:15px 35px;
text-decoration:none;
border-radius:6px;
font-weight:bold;
display:inline-block;
">

Download Ticket PDF

</a>

</td>
</tr>


<tr>
<td style="padding:0 35px 35px;text-align:center;color:#777;">

<p>
Keep this email for future reference.
</p>

<h3>
EventHub
</h3>

<p style="font-size:12px;">
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