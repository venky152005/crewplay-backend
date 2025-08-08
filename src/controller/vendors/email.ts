import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, html: string): Promise<any> => {
    try {
        if (!to || !subject || !html) {
            return Promise.reject({ message: "To, subject, and html are required" });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);
        return Promise.resolve({ message: "Email sent successfully" });
    } catch (error) {
        return Promise.reject({ message: "Server error", error });
    }
};