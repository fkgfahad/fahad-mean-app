const nodemailer = require('nodemailer');

const Token = require('./jwt');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'fahad.the.dev@gmail.com',
    pass: 'ytbzookS821'
  }
});

const formateMail = (name, token) => {
  return `
    <header
      style="background-color: darkblue;
        padding: 10px;
        text-align: center;
        color: #fff;"
    >
      <h1
        style="
          margin: 0;
          font-weight: normal;
          font-family: sans-serif;"
      >
        Fahad Hossain
      </h1>
      <h3
        style="
        margin: 0;
        font-weight: normal;
        font-family: sans-serif;"
      >
        Angular & MEAN Stack Developer
      </h4>
    </header>
    <section
      style="
      padding: 10px;
      font-size: 15px;"
    >
      <h3 style="margin: 0;">
        Hello ${name},
      </h3>
      <br /><br />
      <p style="margin: 0;">
        I am very happy to have you here. Please click confirm to continue.
        <br />
        <br />
        Thanks
        <br />
        Fahad Hossain
      </p>
    </section>
    <footer
      style="
        display: flex;
        height: 60vh;
        align-items: center;
        justify-content: center;
        flex: auto;
      "
    >
      <a
        style="
          background-color: darkgreen;
          text-decoration: none;
          padding: 20px 50px;
          font-size: 25px;
          border-radius: 20px;
          color: #fc0;
          font-weight: bold;
        "
        href="${token}"
      >
        Verify
      </a>
    </footer>
  `;
};

module.exports = class Mailer {
  static sendForReg(recipient, name, callback) {
    Token.forMailVerification(recipient, (token) => {
      const mailOptions = {
        from: 'Fahad Hossain | Developer <fahad.the.dev@gmail.com>',
        to: recipient,
        subject: 'Email Verification',
        html: formateMail(name, token)
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          return callback('error');
        } else {
          return callback(null, 'ok');
        }
      });
    });
  }
};
