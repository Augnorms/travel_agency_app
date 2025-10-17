import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml } from "@/utils/helpers";
import { contactTemplate } from "../email-template/contact-template";

export async function POST(request: NextRequest) {
    const { firstname, lastname, email, phone, message } = await request.json();

    if (!firstname || !lastname || !email || !phone || !message) {
        return NextResponse.json({
            status: 400,
            message: "All fields are required",
        })
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Shama Sister City Commission" <augustinenormanyo98@gmail.com>`,
        to: "augustinenormanyo98@gmail.com",
        subject: "New Message from Contact Form",
        html: contactTemplate({ firstname, lastname, email, phone, message }),
    });

    return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
    );

}

