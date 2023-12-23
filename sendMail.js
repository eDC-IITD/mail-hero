import express from "express"
const router = express.Router()

// Import nodemailer
import nodemailer from 'nodemailer';
import smtpTransport from "nodemailer-smtp-transport";

//Post
router.post('/', async (req, res) => {

    try {

        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: req.body.senderEmail,
                pass: req.body.appPassword
            }
        }));

        var mailOptions = {
            from: req.body.senderEmail,
            to: req.body.receiverEmail,
            subject: req.body.subject,
            html: req.body.bodyHTML
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                res.status(400).json({
                    status: 400,
                    message: error.response
                })
            } else {
                res.status(200).json({
                    status: 200,
                    message: `Email sent successfully to ${req.body.receiverEmail}`
                })
            }
        });

    }
    catch (err) {
        console.log(err);
    }

})


export default router