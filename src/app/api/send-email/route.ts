import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";
import { Resend } from "resend";
import { contactTemplate } from "../email-template/contact-template";

export async function POST(request: NextRequest) {
    const { firstname, lastname, email, phone, message } = await request.json();

    if (!firstname || !lastname || !email || !phone || !message) {
        return NextResponse.json({
            status: 400,
            message: "All fields are required",
        })
    }

    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS,
    //     },
    // });

    // await transporter.sendMail({
    //     from: `"Shama Sister City Commission" <augustinenormanyo98@gmail.com>`,
    //     to: "augustinenormanyo98@gmail.com",
    //     subject: "New Message from Contact Form",
    //     html: contactTemplate({ firstname, lastname, email, phone, message }),
    // });

    // Send email to YOU (admin)
    const resend = new Resend(process.env.RESEND_KEY);
    
    const data = await resend.emails.send({
      from: "noreply@shamasistercitycommission.co.uk", // ✅ verified domain sender
      to: "shamasistercitycommission@yahoo.com", // ✅ your Gmail to receive contact messages
      subject: `New Message from ${firstname} ${lastname}`,
      html: contactTemplate({ firstname, lastname, email, phone, message }),
    });

    return NextResponse.json(
        { message: "Message sent successfully"+" " + data },
        { status: 200 }
    );

}

