import { api } from "@/app/api";
import EmailVerification from "@/emails/EmailVerification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

  // Resend or any email service
  // await api.post("https://api.resend.com/v1/emails", {
  //   to: email,
  //   subject: "Verify your email",
  //   html: `Please verify your email by clicking <a href="${verificationUrl}">here</a>.`,
  // });

  await resend.emails.send({
    from: "Dental Care Solutions <Dental-Care-Solutions@dcs-test.siddharthkothari.com>",
    to: email,
    subject: "Verify your email",
    react: <EmailVerification magicLink={verificationUrl} />,
  });
}
