import { api } from "@/app/api";

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

  // Resend or any email service
  await api.post("https://api.resend.com/v1/emails", {
    to: email,
    subject: "Verify your email",
    html: `Please verify your email by clicking <a href="${verificationUrl}">here</a>.`,
  });
}
