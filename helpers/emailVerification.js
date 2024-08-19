const nodemailer = require('nodemailer')

async function verifyAccount(to) {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "0248a054453a5a",
                pass: "f4dae52cf0bdbe",
            },
        });
        //     // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'oubaisaker555@gmail.com', // sender address
            to: to, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Verify Account", // plain text body
            html: "<b>Please verify Your Account</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
    }
    catch (error) {
        next(error);
    }
}

module.exports = verifyAccount;
