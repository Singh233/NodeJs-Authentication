const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: process.env.CODEIAL_GMAIL_USERNAME,
                pass: process.env.CODEIAL_GMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: 'NodeJs Auth',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;