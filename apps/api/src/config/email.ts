export const getOtpHtml = ({ email, otp }: any) => {
  const appName = process.env.APP_NAME || "Support Sutra";
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${appName} Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #ffffff;
      padding-bottom: 40px;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .content {
      padding: 48px 24px;
      text-align: center;
    }
    .header {
      padding: 32px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .logo {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #000000;
      text-decoration: none;
      text-transform: uppercase;
    }
    .title {
      font-size: 28px;
      font-weight: 400;
      line-height: 1.2;
      margin: 40px 0 24px;
      color: #000000;
      letter-spacing: -0.01em;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      color: #4a4a4a;
      margin-bottom: 32px;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
    }
    .otp-container {
      background-color: #fafafa;
      border: 1px solid #eeeeee;
      padding: 24px;
      margin: 32px 0;
      display: inline-block;
      min-width: 200px;
    }
    .otp-code {
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #000000;
      margin: 0;
    }
    .footer {
      padding: 32px 24px;
      text-align: center;
      font-size: 12px;
      color: #999999;
      border-top: 1px solid #f0f0f0;
    }
    .divider {
      height: 1px;
      background-color: #f0f0f0;
      margin: 40px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header" align="center">
        <span class="logo">${appName}</span>
      </div>
      <div class="content">
        <h1 class="title">Verification Code</h1>
        <p class="text">
          Use the following security code to verify your identity for <strong>${email}</strong>. This code is valid for 5 minutes.
        </p>
        <div class="otp-container">
          <div class="otp-code">${otp}</div>
        </div>
        <p class="text" style="font-size: 14px; color: #888888;">
          If you didn't request this code, you can safely ignore this email.
        </p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} ${appName}. Crafted with intention.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
  return html;
};

export const getVerifyEmailHtml = ({ email, token }: any) => {
  const appName = process.env.APP_NAME || "Support Sutra";
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(
    token,
  )}`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${appName} Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #ffffff;
      padding-bottom: 40px;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .content {
      padding: 48px 24px;
      text-align: center;
    }
    .header {
      padding: 32px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .logo {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #000000;
      text-decoration: none;
      text-transform: uppercase;
    }
    .title {
      font-size: 28px;
      font-weight: 400;
      line-height: 1.2;
      margin: 40px 0 24px;
      color: #000000;
      letter-spacing: -0.01em;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      color: #4a4a4a;
      margin-bottom: 32px;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
    }
    .btn-container {
      margin: 40px 0;
    }
    .btn {
      background-color: #000000;
      color: #ffffff !important;
      padding: 16px 32px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      display: inline-block;
    }
    .footer {
      padding: 32px 24px;
      text-align: center;
      font-size: 12px;
      color: #999999;
      border-top: 1px solid #f0f0f0;
    }
    .link {
      color: #000000;
      text-decoration: underline;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header" align="center">
        <span class="logo">${appName}</span>
      </div>
      <div class="content">
        <h1 class="title">Verify Your Account</h1>
        <p class="text">
          Thank you for joining <strong>${appName}</strong>. Please confirm your email address (<strong>${email}</strong>) by clicking the button below.
        </p>
        <div class="btn-container">
          <a href="${verifyUrl}" class="btn">Verify Account</a>
        </div>
        <p class="text" style="font-size: 13px; color: #888888; margin-top: 32px;">
          If the button doesn't work, copy and paste this link into your browser:
          <br/>
          <a href="${verifyUrl}" class="link">${verifyUrl}</a>
        </p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} ${appName}. Crafted with intention.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
  return html;
};

export const getForgotPasswordHtml = ({ email, token }: any) => {
  const appName = process.env.APP_NAME || "Support Sutra";
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetUrl = `${baseUrl.replace(/\/+$/, "")}/reset-password?token=${encodeURIComponent(
    token,
  )}`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${appName} Password Reset</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #ffffff;
      padding-bottom: 40px;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .content {
      padding: 48px 24px;
      text-align: center;
    }
    .header {
      padding: 32px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .logo {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #000000;
      text-decoration: none;
      text-transform: uppercase;
    }
    .title {
      font-size: 28px;
      font-weight: 400;
      line-height: 1.2;
      margin: 40px 0 24px;
      color: #000000;
      letter-spacing: -0.01em;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      color: #4a4a4a;
      margin-bottom: 32px;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
    }
    .btn-container {
      margin: 40px 0;
    }
    .btn {
      background-color: #000000;
      color: #ffffff !important;
      padding: 16px 32px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      display: inline-block;
    }
    .footer {
      padding: 32px 24px;
      text-align: center;
      font-size: 12px;
      color: #999999;
      border-top: 1px solid #f0f0f0;
    }
    .link {
      color: #000000;
      text-decoration: underline;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header" align="center">
        <span class="logo">${appName}</span>
      </div>
      <div class="content">
        <h1 class="title">Reset Your Password</h1>
        <p class="text">
          We received a request to reset the password for your <strong>${appName}</strong> account (<strong>${email}</strong>).
        </p>
        <div class="btn-container">
          <a href="${resetUrl}" class="btn">Reset Password</a>
        </div>
        <p class="text" style="font-size: 13px; color: #888888; margin-top: 32px;">
          This link will expire in 1 hour. If you did not request a password reset, please ignore this email.
        </p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} ${appName}. Crafted with intention.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
  return html;
};

