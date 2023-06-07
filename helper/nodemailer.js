const nodemailer = require("nodemailer");
async function nodeMailer(user, member) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'raihan.aqil2003@gmail.com', // generated ethereal user
            pass: 'yyjakplctgprttzx', // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: 'Netflix.clone@premium.com', // sender address
        to: user.email, // list of receivers
        subject: `Congratulations, you have successfully purchase netflix ${member.name}!`, // Subject line
        text: "Welcome to netflix", // plain text body
        html: `<b>Thanks for your purchase ${user.username}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = nodeMailer