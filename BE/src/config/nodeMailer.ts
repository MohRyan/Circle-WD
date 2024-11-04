import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        // user: "ryanmoh735@gmail.com",
        user: "ryanmoh735@gmail.com",
        pass: "085321543169", // application password / app password
    },
    tls: {
        rejectUnauthorized: false
    }
});