export function getOTPTemplate(userName, otp) {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body{
    margin:0;
    padding:40px 0;
    background:#f4f7fb;
    font-family:Arial,Helvetica,sans-serif;
}

.container{
    max-width:600px;
    margin:auto;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 4px 15px rgba(0,0,0,.08);
}

.header{
    background:#2563eb;
    color:#fff;
    text-align:center;
    padding:30px;
}

.content{
    padding:35px;
    color:#444;
    line-height:1.8;
}

.otp-box{
    background:#eff6ff;
    border:2px dashed #2563eb;
    border-radius:8px;
    width:220px;
    margin:25px auto;
    padding:18px;
    text-align:center;
}

.otp{
    font-size:32px;
    font-weight:bold;
    letter-spacing:8px;
    color:#2563eb;
}

.warning{
    background:#fff7ed;
    border-left:4px solid orange;
    padding:15px;
    margin-top:20px;
}

.footer{
    background:#f9fafb;
    text-align:center;
    padding:20px;
    color:#777;
    font-size:13px;
}
</style>
</head>

<body>

<div class="container">

<div class="header">
<h2>🎉 Event Management System</h2>
<p>Password Reset Verification</p>
</div>

<div class="content">

<h3>Hello ${userName},</h3>

<p>
We received a request to reset your password.
Use the OTP below to continue.
</p>

<div class="otp-box">
<div class="otp">${otp}</div>
</div>

<p>
This OTP will expire in <strong>10 minutes</strong>.
</p>

<div class="warning">
<b>Security Tip:</b><br>
Never share your OTP with anyone. Our support team will never ask for it.
</div>

<p>
If you didn't request this password reset, simply ignore this email.
</p>

<p>
Regards,<br>
<b>Event Management System</b>
</p>

</div>

<div class="footer">
© 2026 Event Management System<br>
support@example.com
</div>

</div>

</body>
</html>
`;
}