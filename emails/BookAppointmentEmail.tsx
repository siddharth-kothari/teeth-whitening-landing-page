import { headerLogo } from "@/assets";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import Image from "next/image";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
  apt_data: any;
}

const baseUrl = process.env.NEXT_PUBLIC_PROD_URL
  ? `${process.env.NEXT_PUBLIC_PROD_URL}`
  : "http://localhost:3000";

const logo_img = baseUrl + "logo.png";

const fs = require("fs");
import path from "path";

// Adjust this to point to your public folder path correctly
const imagePath = path.join(process.cwd(), "public", "logo.png");

const imageBase64 = fs.readFileSync(imagePath, "base64");

export const BookAppointmentEmail = ({
  userFirstname,
  apt_data,
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`data:image/png;base64,${imageBase64}`}
          width="100"
          height="100"
          alt="Dental Care Solutions"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thank you for scheduling an appointment with Dental Care Solutions. We
          are pleased to confirm your appointment and look forward to seeing you
          at {apt_data.selectedTimeSlot} on {apt_data.date}.
        </Text>

        <Text style={paragraph}>
          <strong>Location:</strong> 101, Elpis IVF and Maternity Hospital,
          Parihar Chowk, ITI Rd, beside Malabar Gold and Diamonds, Aundh, Pune,
          Maharashtra 411007
        </Text>

        <Text style={paragraph}>
          If you need to reschedule or have any questions before your visit,
          please do not hesitate to contact us at{" "}
          <Link href="tel:+917972659371">+91 79726 59371</Link>
        </Text>

        <Text style={paragraph}>
          Best Regards,
          <br />
          Dental Care Solutions
        </Text>
      </Container>
    </Body>
  </Html>
);

BookAppointmentEmail.PreviewProps = {
  userFirstname: "Alan",
} as KoalaWelcomeEmailProps;

export default BookAppointmentEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#000",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
