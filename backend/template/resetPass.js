
export const resetPasswordTemplate = ({ token }) => {
    return `
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Reset Password</title>

</head>

<body style="
margin:0;
padding:0;
background:#f4f6f9;
font-family:Arial,Helvetica,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="background:#f4f6f9;padding:40px 0;"
>

<tr>
<td align="center">

<table
width="600"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border-radius:12px;
overflow:hidden;
box-shadow:0 5px 20px rgba(0,0,0,0.08);
"
>

<!-- Header -->

<tr>

<td
align="center"
style="
background:#4F46E5;
padding:40px;
color:white;
"
>

<h1 style="
margin:0;
font-size:30px;
">
Reset Your Password
</h1>

<p style="
margin-top:10px;
font-size:16px;
">
Create a new password for your account.
</p>

</td>

</tr>


<!-- Content -->

<tr>

<td style="padding:40px;">

<h2 style="
color:#333;
margin-top:0;
">
Forgot your password?
</h2>

<p style="
font-size:15px;
line-height:24px;
color:#555;
">

Enter your new password below.
Make sure both passwords match before submitting.

</p>


<!-- Reset Password Form -->

<form
method="POST"
action="/reset-password/${token}"
>

<!-- New Password -->

<label style="
display:block;
font-weight:bold;
color:#333;
margin-bottom:8px;
">

New Password

</label>

<input
type="password"
name="password"
placeholder="Enter new password"
required
style="
width:100%;
padding:14px;
border:1px solid #d1d5db;
border-radius:6px;
font-size:15px;
box-sizing:border-box;
margin-bottom:20px;
outline:none;
"
/>


<!-- Confirm Password -->

<label style="
display:block;
font-weight:bold;
color:#333;
margin-bottom:8px;
">

Confirm Password

</label>

<input
type="password"
name="confirmPassword"
placeholder="Confirm your new password"
required
style="
width:100%;
padding:14px;
border:1px solid #d1d5db;
border-radius:6px;
font-size:15px;
box-sizing:border-box;
margin-bottom:25px;
outline:none;
"
/>


<!-- Submit Button -->

<button
type="submit"
style="
width:100%;
background:#4F46E5;
color:#ffffff;
padding:15px;
border:none;
border-radius:6px;
font-size:16px;
font-weight:bold;
cursor:pointer;
"
>

Reset Password

</button>

</form>

</td>

</tr>


<!-- Important Information -->

<tr>

<td style="
padding:0 40px 35px;
">

<table
width="100%"
cellpadding="15"
cellspacing="0"
style="
background:#fff8e7;
border-left:5px solid #f59e0b;
"
>

<tr>

<td>

<strong>Important Information</strong>

<ul style="
padding-left:20px;
color:#555;
line-height:24px;
">

<li>
Use a strong password for better security.
</li>

<li>
Do not share your password with anyone.
</li>

<li>
This password reset link may expire for security reasons.
</li>

</ul>

</td>

</tr>

</table>

</td>

</tr>


<!-- Footer -->

<tr>

<td
align="center"
style="
background:#f8f8f8;
padding:30px;
"
>

<h3 style="
margin:0;
color:#333;
">
EventHub
</h3>

<p style="
color:#777;
margin:10px 0;
">

Secure account recovery

</p>

<p style="
font-size:12px;
color:#999;
">

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
